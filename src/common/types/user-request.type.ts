import { UserEntity } from '../../core/users/user.entity';

export type UserInRequest = Pick<
  UserEntity,
  'uuid' | 'name' | 'surname' | 'email' | 'isVerified' | 'role'
>;
