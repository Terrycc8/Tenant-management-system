import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { UserType } from 'src/types';

export class PatchUserInputDto {
  @IsString()
  @Length(1, 10)
  first_name: string;
  @IsString()
  @Length(1, 10)
  last_name: string;
  @IsOptional()
  @IsStrongPassword()
  @Length(8, 60)
  password?: string;
}
