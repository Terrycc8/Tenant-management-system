<<<<<<< HEAD
import {
  Controller,
  Get,
  Param,
  NotImplementedException,
  BadRequestException,
  Post,
  Body,
  Header,
  Headers,
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

  @Get()
  async getRooms(
    @Request() req,
    @Headers() header, // : Promise<
  ) {
    //const token = header.authorization.split(' ')[1];
    try {
      let payLoad: JWTPayload = this.jwtService.decode(req);
      console.log(payLoad);
      return await this.chatService.getRooms(payLoad);
    } catch (error) {
      console.log(error);
      return { error: 'server error' };
    }
    // rooms: RoomListItem[];
    // }> {
    // throw new BadRequestException('client bad')
    // throw new NotImplementedException('server bad')

    // return {
    //   rooms: [
    //     { id: 1, username: 'alice', last_message: 'hi 1' },
    //     { id: 2, username: 'bob', last_message: 'hi 2' },
    //   ],
    // };
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
  sendMessage(
    @Param('id') room_id: string,
    @Request() req,
    @Body('id') id: number,
    @Body('message') content: string,
  ) {
    let payLoad: JWTPayload = this.jwtService.decode(req);
    console.log('Send message:', { room_id, content });
    ChatController.io.emit('new-message', {
      id,
      content,
      sender_id: payLoad.id,
      created_at: Date.now(),
    });
    // console.log('after emit');
    // console.log('c', ChatController.io.sockets);
    // return { id: 123 };
    this.chatService.sendMessage(room_id, payLoad, content);
    return {};
  }

  @Get('/messages/:id')
  async getMessages(@Param('id') room_id: string, @Request() req) {
    let payLoad: JWTPayload = this.jwtService.decode(req);
    let message = await this.chatService.messageById(room_id);
    return { message, id: payLoad.id };
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
=======
import {
  Controller,
  Get,
  Param,
  NotImplementedException,
  BadRequestException,
  Post,
  Body,
  Header,
  Headers,
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

  @Get()
  async getRooms(
    @Request() req,
    @Headers() header, // : Promise<
  ) {
    //const token = header.authorization.split(' ')[1];
    try {
      let payLoad: JWTPayload = this.jwtService.decode(req);
      console.log(payLoad);
      return await this.chatService.getRooms(payLoad);
    } catch (error) {
      console.log(error);
      return { error: 'server error' };
    }
    // rooms: RoomListItem[];
    // }> {
    // throw new BadRequestException('client bad')
    // throw new NotImplementedException('server bad')

    // return {
    //   rooms: [
    //     { id: 1, username: 'alice', last_message: 'hi 1' },
    //     { id: 2, username: 'bob', last_message: 'hi 2' },
    //   ],
    // };
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
  sendMessage(
    @Param('id') room_id: string,
    @Request() req,
    @Body('message') message: string,
  ) {
    let payLoad: JWTPayload = this.jwtService.decode(req);
    console.log('Send message:', { room_id, message });
    ChatController.io.emit('new-message', { id: room_id, message });
    console.log('after emit');
    // console.log('c', ChatController.io.sockets);
    // return { id: 123 };
    this.chatService.sendMessage(room_id, payLoad, message);
    return {};
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
>>>>>>> 019f75ca13d4cc2d98bbc225eb3d48b788f2d7a4
