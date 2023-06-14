import {
    IsDate,
    IsDateString,
    IsEmail,
    IsEnum,
    IsNumber,
    IsNumberString,
    IsString,
    IsStrongPassword,
    Length,
    minLength,
  } from 'class-validator';
  import { UserType } from 'src/types';


export class UserAccountDto {
    @IsString()
    @Length(1, 10)
    first_name: string;
    @IsString()
    @Length(1, 10)
    last_name: string;
    @IsString()
    user_type: UserType;
  }
   