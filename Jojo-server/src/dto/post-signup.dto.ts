import {
  IsEmail,
  IsEnum,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { UserType, userTypeEnumMsg } from 'src/types';

export class SignUpInputWithPasswordDto {
  @IsString()
  @Length(1, 10)
  first_name: string;
  @IsString()
  @Length(1, 10)
  last_name: string;
  @IsEmail()
  @Length(3, 32)
  email: string;
  @IsStrongPassword()
  @Length(8, 60)
  password: string;
  @IsEnum(UserType, userTypeEnumMsg)
  user_type: 'landlord' | 'tenant';
}
