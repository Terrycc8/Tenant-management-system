import {
  IsEmail,
  IsEnum,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class SignUpInputWithPasswordDto {
  @IsString()
  @Length(1, 10)
  first_name: string;
  @IsString()
  @Length(1, 10)
  last_name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
  @IsString()
  @IsEnum({})
  user_type: string;
}
