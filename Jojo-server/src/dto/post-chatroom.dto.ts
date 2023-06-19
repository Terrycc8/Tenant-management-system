import { IsString } from 'class-validator';

export class ChatroomInputDto {
  @IsString()
  creator_id: string;
  @IsString()
  receiver_id: string;
}
