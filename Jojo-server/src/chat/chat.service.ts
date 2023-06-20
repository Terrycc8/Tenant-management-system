import { BadRequestException, Injectable, Redirect } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { JWTPayload, ChatroomListOutput } from 'src/types';
import { Length } from 'class-validator';
// import { ChatroomInputDto } from '../dto/post-chatroom.dto';
// import { routes } from '../../../Jojo-client/src/routes';

@Injectable()
export class ChatService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async ChatroomById(payload: JWTPayload, chatroom: ChatroomListOutput) {
    let result;
    if (payload.id == chatroom.creator_id) {
      result = await this.knex('chatroom')
        // .join(
        .select('creator_id')
        .where({ creator_id: payload.id });
    }
    return result;
    // for(let i = 0; i< result.length; i++)
    //     { i = result;

    //     this.knex('chatroom}
  }
  // async ChatroomWithMsgById(payload: JWTPayload, chatroom: ChatroomListOutput,) {
  //     let result = await this.knex('message')
  //         .select(
  //           'id',
  //           'title',
  //           'rent',
  //           'rental_start_at',
  //           'rental_end_at',
  //           'created_at',
  //         )
  //         .where({ id: property_id })
  //         .first();
  // }

  // getHello(): string {
  //   return 'Hello World!';
  // }

  async createChatroom(payload: JWTPayload, receiver_id: number) {
    let chatroom = await this.knex('chatroom')
      .select('id')
      .where('creator_id', payload.id)
      .andWhere('receiver_id', receiver_id)
      .first();
    if (chatroom) {
      return chatroom.id;
    } else {
      let newChatroom = await this.knex('chatroom')
        .insert({
          creator_id: payload.id,
          receiver_id,
          created_at: new Date(),
        })
        .returning('id');

      return newChatroom[0].id;
    }
  }

  async sendMessage(room_id: string, sender_id: string, content: string) {
    let newMessage = await this.knex('message').insert({
      room_id,
      sender_id,
      content,
    });
    return newMessage;
  }

  async messageById(room_id: string) {
    let message = this.knex('message')
      .where('room_id', room_id)
      .innerJoin('user as sender', 'sender.id', 'message.sender_id')
      .select('message.sender_id', 'message.content', 'sender.id');
    return message;
  }
}
