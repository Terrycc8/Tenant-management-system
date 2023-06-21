import { IsEnum, IsNumber, IsString, MinLength } from 'class-validator';
import { PatchEventActionType, patchEventActionTypeEnumMsg } from 'src/types';

export class PatchEventInput {
  @IsEnum(PatchEventActionType, patchEventActionTypeEnumMsg)
  type: string;
  @MinLength(1)
  comment: string;
}
