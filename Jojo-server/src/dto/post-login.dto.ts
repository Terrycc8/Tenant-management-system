import { IsEmail, IsString, Length } from 'class-validator';

export class LoginInputWithPasswordDto {
  @IsEmail()
  @Length(1, 32)
  email: string;
  @IsString()
  @Length(8, 20)
  password: string;
}
