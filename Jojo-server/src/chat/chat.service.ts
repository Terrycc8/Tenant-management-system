import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { JWTPayload, ChatroomListOutput } from 'src/types';
import { Length } from 'class-validator';

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

  getHello(): string {
    return 'Hello World!';
  }
}
