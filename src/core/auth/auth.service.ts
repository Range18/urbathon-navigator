import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoggedUserRdo } from '../users/rdo/logged-user.rdo';
import { UserService } from '../users/user.service';
import { ApiException } from '../../common/exception-handler/api-exception';
import { SessionService } from '../session/session.service';
import { MailService } from '../mail/mail.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import bcrypt from 'bcrypt';
import { AllExceptions } from '../../common/exception-handler/exeption-types/all-exceptions';
import { TokenService } from '../token/token.service';
import { VerificationService } from '../verification/verification.service';
import { backendServer, passwordSaltRounds } from '../../common/configs/config';
import { TokenPayload } from '../session/types/user.payload';
import { CommunityServices_Service } from '../community_services/community_services.service';
import SessionExceptions = AllExceptions.SessionExceptions;
import UserExceptions = AllExceptions.UserExceptions;
import AuthExceptions = AllExceptions.AuthExceptions;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly mailService: MailService,

    private readonly tokenService: TokenService,
    private readonly verificationService: VerificationService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<LoggedUserRdo> {
    const user = await this.userService.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        'UserExceptions',
        UserExceptions.UserAlreadyExists,
      );
    }

    const userEntity = await this.userService.save({
      name: createUserDto.name,
      surname: createUserDto.surname,
      patronymicName: createUserDto.patronymicName,
      city: createUserDto.city,
      phone: createUserDto.phone,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, passwordSaltRounds),
      role: createUserDto.role,
    });

    const session = await this.sessionService.createSession({
      userUUID: userEntity.uuid,
    });

    const link = `${
      backendServer.url
    }/verify/${await this.verificationService.createLink(userEntity)}`;

    this.mailService.sendVerifyEmail(userEntity.email, link);

    return new LoggedUserRdo(
      session.refreshToken,
      session.accessToken,
      session.sessionExpireAt,
      userEntity.uuid,
    );
  }

  async login(loginUserDto: LoginUserDto): Promise<LoggedUserRdo> {
    const user = await this.userService.findOne({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    const comparedPasswords = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!comparedPasswords) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'AuthExceptions',
        AuthExceptions.WrongPassword,
      );
    }
    const session = await this.sessionService.createSession({
      userUUID: user.uuid,
    });

    return new LoggedUserRdo(
      session.refreshToken,
      session.accessToken,
      session.sessionExpireAt,
      user.uuid,
    );
  }

  async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      throw new ApiException(
        HttpStatus.UNAUTHORIZED,
        'SessionExceptions',
        SessionExceptions.SessionNotFound,
      );
    }

    const tokenPayload = await this.tokenService.verifyAsync<TokenPayload>(
      refreshToken,
    );
    await this.sessionService.removeOne({
      where: { sessionId: tokenPayload.sessionId },
    });
  }
}
