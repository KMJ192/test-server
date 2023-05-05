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
import { join } from 'path';
import { createWriteStream } from 'fs';
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

  writeStream = createWriteStream(join(__dirname, '..', 'uploads'), {
    encoding: 'binary',
  });

  @SubscribeMessage('echo')
  echo(@MessageBody() data: string): string {
    return data;
  }

  @SubscribeMessage('file')
  connection(@MessageBody() data: string) {
    console.log(data);
  }

  @SubscribeMessage('upload-start')
  uploadStart(@MessageBody() { name, size }: { name: string; size: number }) {
    console.log('upload-start', name, size);
  }

  @SubscribeMessage('upload-slice')
  uploadSlice(@MessageBody() { slice, offset }) {
    // this.writeStream.write(Buffer.from(slice), 'binary');
    console.log(
      `Received slice of size ${slice.byteLength} at offset ${offset}`,
    );
  }

  @SubscribeMessage('upload-end')
  uploadEnd() {
    console.log('end', this.writeStream);
    // this.writeStream.end();
  }

  afterInit() {
    this.nsp.adapter.on('create-room', (room) => {
      console.log(`"Room:${room}"이 생성되었습니다.`);
    });

    this.nsp.adapter.on('join-room', (room, id) => {
      console.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
    });

    this.nsp.adapter.on('leave-room', (room, id) => {
      console.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
    });

    this.nsp.adapter.on('delete-room', (roomName) => {
      console.log(`"Room:${roomName}"이 삭제되었습니다.`);
    });

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
