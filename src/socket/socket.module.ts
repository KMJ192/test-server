import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import SocketIOModule from '@nestjs/platform-socket.io';

@Module({
  imports: [SocketIOModule],
  providers: [SocketGateway],
})
export class SocketModule {}
