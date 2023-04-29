import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';

@WebSocketGateway(8081, {
  namespace: 'events',
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class FileUploaderGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() nsp: Namespace;

  @SubscribeMessage('echo')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }

  afterInit() {
    // this.nsp.adapter.on('create-room', (room) => {
    //   console.log(`"Room:${room}"이 생성되었습니다.`);
    // });

    // this.nsp.adapter.on('join-room', (room, id) => {
    //   console.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
    // });

    // this.nsp.adapter.on('leave-room', (room, id) => {
    //   console.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
    // });

    // this.nsp.adapter.on('delete-room', (roomName) => {
    //   console.log(`"Room:${roomName}"이 삭제되었습니다.`);
    // });

    console.log('웹소켓 서버 초기화 ✅');
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    // socket.broadcast.emit('connect', {
    //   connect: `${socket.id} 접속`,
    // });
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    // console.log(`${socket.id} 종료`);
  }
}
