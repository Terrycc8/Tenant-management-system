import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  injectNestClient,
} from "nest-client";
import { RoomListItem } from "./chat.dto";
// import * as socketIO from "socket.io";

@Controller("/chat")
export class ChatService {
  // constructor() {
  //   injectNestClient(this);
  // }
  // // @Get('/rooms/:id')
  // // async getRoomDetail(@Param('id') id: string): Promise<{
  // //   room: RoomDetail;
  // // }> {
  // //   return {
  // //     room: {
  // //       id: 2,
  // //       username: 'bob',
  // //       messages: ['a', 'b', 'c'],
  // //     },
  // //   };
  // // }
  // // @Post('createChatroom')
  // // async signUp(
  // //   @Body(new ValidationPipe()) signUpInput: SignUpInputWithPasswordDto,
  // // ) {
  // //   let payload = await this.userService.signUp(signUpInput);
  // //   let token = this.jwtService.encode(payload);
  // //   return { token };
  // // }
  // @Get("/rooms")
  // async getRooms(): Promise<{
  //   rooms: RoomListItem[];
  // }> {
  //   throw new Error("stub");
  // }
  // @Get("/rooms/:id")
  // getHello(): string {
  //   throw new Error("stub");
  // }
  // @Post("/rooms/:id/message")
  // sendMessage(@Param("id") room_id: string, @Body("message") message: string) {
  //   throw new Error("stub");
  // }
  // @Get("/message/:id")
  // getMessageList(@Param("id") room_id: string) {
  //   throw new Error("stub");
  // }
}
