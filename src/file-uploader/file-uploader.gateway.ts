import { UseInterceptors } from '@nestjs/common';
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
import { WriteStream, createWriteStream } from 'fs';
import { Namespace, Socket } from 'socket.io';

@WebSocketGateway(8081, {
  namespace: 'file-upload',
  cors: {
    origin: ['http://localhost:3000'],
  },
  maxHttpBufferSize: 100 * 1024 * 1024,
})
export class FileUploaderGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() nsp: Namespace;
  // filePath = join(process.cwd(), 'uploads', 'test');
  // writeStream: WriteStream | null = createWriteStream(this.filePath, {
  //   encoding: 'binary',
  // });
  writeStream: WriteStream | null = null;

  @SubscribeMessage('echo')
  echo(@MessageBody() data: string): string {
    // console.log(data);
    return data;
  }

  @SubscribeMessage('upload-start')
  uploadStart(@MessageBody() { name, size }: { name: string; size: number }) {
    // console.log('upload-start', name, size);
    const filePath = join(process.cwd(), 'uploads', name);
    this.writeStream = createWriteStream(filePath);
    return 'start';
  }

  @SubscribeMessage('upload-slice')
  uploadSlice(@MessageBody() { slice, offset }) {
    this.writeStream.write(Buffer.from(slice), 'binary');
    return offset;
  }

  @SubscribeMessage('upload-end')
  uploadEnd(@MessageBody() data: string) {
    console.log('upload-end');
    this.writeStream.end();
    this.writeStream.on('finish', () => {
      console.log('finish');
    });
    return data;
  }

  // afterInit() {
  //   this.nsp.adapter.on('create-room', (room) => {
  //     console.log(`"Room:${room}"이 생성되었습니다.`);
  //   });

  //   this.nsp.adapter.on('join-room', (room, id) => {
  //     console.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
  //   });

  //   this.nsp.adapter.on('leave-room', (room, id) => {
  //     console.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
  //   });

  //   this.nsp.adapter.on('delete-room', (roomName) => {
  //     console.log(`"Room:${roomName}"이 삭제되었습니다.`);
  //   });

  //   console.log('웹소켓 서버 초기화 ✅');
  // }

  handleConnection(@ConnectedSocket() socket: Socket) {
    // socket.broadcast.emit('connect', {
    //   connect: `${socket.id} 접속`,
    // });
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    // console.log(`${socket.id} 종료`);
  }
}
