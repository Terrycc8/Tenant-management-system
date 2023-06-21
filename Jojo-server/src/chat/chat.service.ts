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
      .where({ creator_id: payload.id, receiver_id: receiver_id })
      .orWhere({ creator_id: receiver_id, receiver_id: payload.id })
      // .orWhere('receiver_id', payload.id)
      // .orWhere('creator_id', receiver_id)
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

  async sendMessage(
    room_id: string,
    payload: JWTPayload,
    // sender_id: string,
    content: string,
  ) {
    try {
      // console.log('start');
      let newMessage = await this.knex('message').insert({
        room_id,
        sender_id: payload.id,
        content,
        created_at: new Date(),
      });
      // console.log('end', newMessage);
    } catch (error) {
      console.log(error);
    }

    return {};
  }

  async messageById(room_id: string) {
    let message = this.knex('message')
      .where('room_id', room_id)
      .innerJoin('user as sender', 'sender.id', 'message.sender_id')
      .select('message.sender_id', 'message.content', 'sender.id');
    return message;
  }

  async getRooms(payload: JWTPayload) {
    // 'user.first_name as receiverName'
    const { id } = payload;
    const rooms = await this.knex('chatroom')
      .select('id as room_id', '*')
      .where({ creator_id: id })
      .orWhere({ receiver_id: id });

    // rooms = [{room_id:##, creator_id:##, receiver_id:##}]
    console.log(rooms);

    const roomOtherUserMap = new Map();
    let otherUsersArray = [];
    let roomIDArray = [];
    rooms.map((room) => {
      const otherUser =
        room.creator_id === id ? room.receiver_id : room.creator_id;
      roomOtherUserMap.set(room.room_id, otherUser);
      otherUsersArray.push(otherUser);
      roomIDArray.push(room.id);
    });

    const lastMessageResult = await this.knex('message')
      .select('id', 'room_id', 'sender_id', 'content') //roomIDArray
      .whereIn('room_id', roomIDArray);

    const lastMessages = lastMessageResult.reduce(
      (acc, elem) => {
        const { id, room_id } = elem;
        if (id > acc[roomIDArray.indexOf(room_id)].id) {
          acc[roomIDArray.indexOf(room_id)] = elem;
        }
        return acc;
      },
      roomIDArray.map((id) => {
        return { id: 0, room_id: id, sender_id: -1, content: '' };
      }),
    );
    // lastMessages = [{room_id:##, sender_id: string, content:string}]
    console.log(lastMessages);

    const otherUsers = await this.knex('user')
      .select('id', 'first_name')
      .whereIn('id', otherUsersArray);

    // otherUsers = [{id:##, first_name:string}]
    console.log(otherUsers);

    const userNameMap = new Map();
    otherUsers.map((user) => userNameMap.set(user.id, user.first_name));

    const data = lastMessages.map((message) => {
      const { room_id, sender_id, content } = message;
      const senderName = userNameMap.get(sender_id)
        ? userNameMap.get(sender_id)
        : '';
      const otherUser = userNameMap.get(roomOtherUserMap.get(room_id));
      return { room_id, otherUser, senderName, content };
    });

    console.log(data);
    return { data };
  }

  // let query = this.knex('chatroom')
  //   .join('message', { 'chatroom.id': 'message.room_id' })
  //   .groupBy('chatroom.id', 'message.receiver_id')
  //   .whereNot('message.receiver_id', payload.id)
  //   .join('user', 'user.id', 'message.receiver_id')
  //   .select('user.first_name', 'chatroom.id')
  //   .whereIn(
  //     'chatroom.id',
  //     this.knex('chatroom')
  //       .join('message', { 'chatroom.id': 'message.room_id' })
  //       .select('chatroom.id as chatroom_id')
  //       .groupBy('chatroom.id')
  //       .orWhere({
  //         'chatroom.creator_id': payload.id,
  //         'message.receiver_id': payload.id,
  //       }),
  //   );
  // // .andWhere('receiver_id', receiver_id);
  // return await query;
}

// let query = knex
//   .with(
//     'my_room',
//     knex('chatroom') //table_name
//       .join('message', { 'chatroom.id': 'message.room_id' }) // join table "message"
//       .select('chatroom.id')
//       .groupBy('chatroom.id')
//       .orWhere({
//         'chatroom.creator_id': payload.id,
//         'message.sender_id': payload.id,
//       }),
//   )
//   .with(
//     'last_message',
//     knex('message')
//       .groupBy('message.room_id')
//       .max('message.id as id')
//       .select('message.room_id')
//       .whereIn('message.room_id', knex('my_room').select('id')),
//   )
//   .with(
//     'room_name',
//     knex('message')
//       .groupBy('message.room_id', 'message.sender_id')
//       .select('user.first_name as name', 'message.room_id')
//       .join('user', 'user.id', 'message.sender_id')
//       .whereNot('message.sender_id', payload.id)
//       .whereIn('message.room_id', knex('my_room').select('id')),
//   )
//   .from('my_room')
//   .join('last_message', 'last_message.room_id', 'my_room.id')
//   .join('message', 'message.id', 'last_message.id')
//   .join('room_name', 'room_name.room_id', 'my_room.id')
//   .select(
//     'my_room.id as room_id',
//     'room_name.name',
//     'message.content as last_message_content',
//   );
