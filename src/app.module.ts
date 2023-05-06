import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SocketModule, FileUploaderModule, AuthModule, CommonModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
