import { IsString, Length } from 'class-validator';

export class LoginInputDto {
  @IsString()
  @Length(8, 20)
  username: string;
  @IsString()
  @Length(8, 20)
  password: string;
}
