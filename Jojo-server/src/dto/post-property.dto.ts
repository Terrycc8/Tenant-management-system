import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
  minLength,
} from 'class-validator';
import { UserType } from 'src/types';

export class PropertyInputDto {
  @IsString()
  @Length(1)
  title: string;
  @IsNumber()
  rent: number;
  @IsString()
  area: 'hong_kong' | 'kowloon' | 'new_territories' | 'island';
  @IsString()
  district:
    | 'central_west'
    | 'eastern'
    | 'southern'
    | 'wan_chai'
    | 'kowloon_city'
    | 'kwun_tong'
    | 'sham_shui_po'
    | 'wong_tai_sin'
    | 'yau_tsim_mong'
    | 'island'
    | 'kwai_tsing'
    | 'north'
    | 'sai_kung'
    | 'sha_tin'
    | 'tai_po'
    | 'tsuen_wan'
    | 'tuen_mun'
    | 'yuen_long';
  @IsString()
  @Length(1)
  location: string;

  @IsString()
  @Length(1)
  street: string;
  @Length(1)
  @IsString()
  building: string;
  @IsString()
  @Length(1)
  block: string;
  @IsString()
  @Length(1)
  floor: string;
  @IsString()
  @Length(1)
  room: string;
  @IsDateString()
  rental_start_at: String;
  @IsDateString()
  rental_end_at: String;
}
