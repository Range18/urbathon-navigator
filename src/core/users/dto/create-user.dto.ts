import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { type Role } from '../../../common/types/roles.type';
import {
  PASSWORD_MIN_LOWERCASE,
  PASSWORD_MIN_NUMBERS,
  PASSWORD_MIN_SYMBOLS,
  PASSWORD_MIN_UPPERCASE,
  PASSWORD_MINLENGTH,
} from '../user.constants';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsOptional()
  patronymicName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  city: string;

  // @IsStrongPassword({
  //   minLength: PASSWORD_MINLENGTH,
  //   minSymbols: PASSWORD_MIN_SYMBOLS,
  //   minLowercase: PASSWORD_MIN_LOWERCASE,
  //   minNumbers: PASSWORD_MIN_NUMBERS,
  //   minUppercase: PASSWORD_MIN_UPPERCASE,
  // })
  @IsString()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  role: Role;
}
