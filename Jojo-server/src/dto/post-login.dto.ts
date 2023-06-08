import { IsEmail, IsString, Length } from 'class-validator';

export class LoginInputWithPasswordDto {
  @IsEmail()
  @Length(3, 32)
  email: string;
  @IsString()
  @Length(8, 60)
  password: string;
}
