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
import {
  EventPriority,
  EventTypes,
  UserType,
  eventPriorityEnumMsg,
  eventTypesEnumMsg,
} from 'src/types';

export class EventInputDto {
  @IsString()
  @Length(1, 32)
  title: string;
  @IsEnum(EventTypes, eventTypesEnumMsg)
  type: string;
  @IsEnum(EventPriority, eventPriorityEnumMsg)
  priority: string;
  @IsString()
  @Length(0, 256)
  description: string;
  @IsNumberString()
  property_id: number;
}
