import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Report } from '../reports/entities/report.entity';
import { CommunityServiceEntity } from '../community_services/entities/community_service.entity';
import { adminConfig } from '../../common/configs/admin.config';
import bcrypt from 'bcrypt';
import { passwordSaltRounds } from '../../common/configs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, Report, CommunityServiceEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly userService: UserService) {}
  async onModuleInit(): Promise<void> {
    const admin = await this.userService.findOne({
      where: { email: adminConfig.email },
    });

    if (!admin) {
      const hashedPassword = await bcrypt.hash(
        adminConfig.password,
        passwordSaltRounds,
      );
      await this.userService.save({
        name: adminConfig.name,
        surname: adminConfig.surname,
        city: adminConfig.city,
        email: adminConfig.email,
        password: hashedPassword,
        role: 'admin',
        isVerified: true,
      });
    }
  }
}
