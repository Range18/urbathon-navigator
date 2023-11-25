import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { type Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoggedUserRdo } from '../users/rdo/logged-user.rdo';
import { backendServer } from '../../common/configs/config';
import { Cookie } from '../../common/decorators/cookie.decorator';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthGuard } from '../../common/decorators/guards/authGuard.decorator';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async registration(
    @Res({ passthrough: true }) response: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<LoggedUserRdo> {
    const userRdo = await this.authService.register(createUserDto);

    response.cookie('refreshToken', userRdo.refreshToken, {
      expires: userRdo.sessionExpireAt,
      secure: backendServer.secure,
      httpOnly: true,
    });

    return userRdo;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoggedUserRdo> {
    const userRdo = await this.authService.login(loginUserDto);

    response.cookie('refreshToken', userRdo.refreshToken, {
      expires: userRdo.sessionExpireAt,
      secure: backendServer.secure,
      httpOnly: true,
    });

    return userRdo;
  }

  @AuthGuard()
  @Delete('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Cookie('refreshToken') refreshToken: string,
  ): Promise<void> {
    await this.authService.logout(refreshToken);

    response.clearCookie('refreshToken');
  }
}
