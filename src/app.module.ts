import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './common/configs/database.config';
import { UserModule } from './core/users/user.module';
import { AuthModule } from './core/auth/auth.module';
import { SessionModule } from './core/session/session.module';
import { VerificationModule } from './core/verification/verification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    SessionModule,
    VerificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
