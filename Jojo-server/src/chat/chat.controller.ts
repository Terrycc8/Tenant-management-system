import {
  Controller,
  Get,
  Param,
  NotImplementedException,
  BadRequestException,
  Post,
  Body,
} from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { RoomDetail, RoomListItem } from './chat.dto';
import { ChatService } from './chat.service';
import { JWTPayload, uploadDir } from 'src/types';
import * as socketIO from 'socket.io';
import { Request } from '@nestjs/common';
@Controller('/chat')
export class ChatController {
  static io: socketIO.Server;
  constructor(
    private jwtService: JwtService,
    private chatService: ChatService,
  ) {}

  get io() {
    return ChatController.io;
  }

  @Get('/rooms')
  async getRooms(): Promise<{
    rooms: RoomListItem[];
  }> {
    // throw new BadRequestException('client bad')
    // throw new NotImplementedException('server bad')

    return {
      rooms: [
        { id: 1, username: 'alice', last_message: 'hi 1' },
        { id: 2, username: 'bob', last_message: 'hi 2' },
      ],
    };
    // let payLoad: JWTPayload = this.jwtService.decode(req);
    // return this.chatService.ChatroomById(payLoad,chatroom);
  }

  // @Get('/rooms/:id')
  // async getRoomDetail(@Param('id') id: string): Promise<{
  //   room: RoomDetail;
  // }> {
  //   return {
  //     room: {
  //       id: 2,
  //       username: 'bob',
  //       messages: ['a', 'b', 'c'],
  //     },
  //   };
  // }

  // @Get('/rooms/:id')
  // getHello(): string {
  //   return this.chatService.getHello();
  // }

  @Post('/rooms/:id/message')
  sendMessage(@Param('id') room_id: string, @Body('message') message: string) {
    console.log('Send message:', { room_id, message });
    ChatController.io.emit('new-message', { id: 123, message });
    console.log('after emit');
    // console.log('c', ChatController.io.sockets);
    return { id: 123 };
  }

  @Get('/messages/id')
  getMessages(@Param('id') room_id: string) {
    // let payLoad: JWTPayload = this.jwtService.decode(req);
    return this.chatService.messageById(room_id);
  }

  @Post('/rooms/:id/')
  createChatroom(@Request() req, @Param('id') receiver_id: number) {
    let payLoad: JWTPayload = this.jwtService.decode(req);
    return this.chatService.createChatroom(payLoad, receiver_id);
  }
  //   @Body(new ValidationPipe()) signUpInput: SignUpInputWithPasswordDto,
  // ) {
  //   let payload = await this.userService.signUp(signUpInput);
  //   let token = this.jwtService.encode(payload);

  //   return { token };
  // }
}
