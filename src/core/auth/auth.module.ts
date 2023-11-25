import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { MailModule } from '../mail/mail.module';
import { SessionModule } from '../session/session.module';
import { VerificationModule } from '../verification/verification.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    UserModule,
    MailModule,
    SessionModule,
    VerificationModule,
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
