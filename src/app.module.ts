import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [FileUploaderModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
