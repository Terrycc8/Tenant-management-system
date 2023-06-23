import {
  IsEmail,
  IsEnum,
  IsString,
  Length,
  MinLength,
  minLength,
} from 'class-validator';
import { UserType, userTypeEnumMsg } from 'src/types';

export class LoginInputWithPasswordDto {
  @IsEmail()
  @Length(3, 32)
  email: string;
  @IsString()
  @Length(8, 60)
  password: string;
}
export class LoginInputWithFaceBookDto {
  @IsEnum(UserType, userTypeEnumMsg)
  user_type: 'landlord' | 'tenant';
  @IsString()
  @MinLength(1)
  accessToken: string;
}
