import { Controller, Get, Param, injectNestClient } from 'nest-client';
import { RoomDetail, RoomListItem } from './chat.dto';


@Controller('/chat')
export class ChatService {
    constructor() {
        injectNestClient(this)
    }

    @Get('/rooms')
    async getRooms(): Promise<{
        rooms: RoomListItem[],
        }> {
        throw new Error("stub")
    }

    @Get('/rooms/:id')
    async getRoomDetail(@Param('id') id: string): Promise<{
        room: RoomDetail
        }> {
        throw new Error("stub")
    }
}
