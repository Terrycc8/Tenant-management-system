import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {} // private appService: AppService

  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }

  afterInit(server: Server) {
    console.log(server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    //Do stuffs
    //   @WebSocketServer() server: Server;

    //   afterInit(server: Server) {
    //     console.log('WebSocket gateway initialized');
    //   }

    //   handleConnection(client: Socket) {
    //     console.log(`Client ${client.id} connected to WebSocket gateway`);
    //   }

    //   handleDisconnect(client: Socket) {
    //     console.log(`Client ${client.id} disconnected from WebSocket gateway`);
    //   }

    //   handleMessage(client: Socket, message: string) {
    //     this.server.to(client.id).emit('message', message);
  }
}
