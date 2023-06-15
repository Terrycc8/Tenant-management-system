import { Controller, Get, Param, NotImplementedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { RoomDetail, RoomListItem } from './chat.dto';
import { ChatService } from './chat.service';
import { JWTPayload, uploadDir } from 'src/types';

@Controller('/chat')
export class ChatController {
  constructor(private jwtService: JwtService,
              private chatService: ChatService,) { }

  @Get('/rooms')
  async getRooms(): Promise<{
    rooms: RoomListItem[],
  }> {
    // throw new BadRequestException('client bad')
    // throw new NotImplementedException('server bad')

    return {
      rooms: [
        { id: 1, username: 'alice', last_message: 'hi 1' },
        { id: 2, username: 'bob', last_message: 'hi 2' }
      ]
    }
    // let payLoad: JWTPayload = this.jwtService.decode(req);
    // return this.chatService.ChatroomById(payLoad,chatroom);
  }

  @Get('/rooms/:id')
  async getRoomDetail(@Param('id') id: string): Promise<{
    room: RoomDetail
  }> {
    return {
      room:
      {
        id: 2, username: 'bob', messages: [
          'a', 'b', 'c'
        ]
      }

    }
  }
}
