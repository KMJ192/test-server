import { Module } from '@nestjs/common';
import { FileUploaderGateway } from './file-uploader.gateway';
import { FileUploaderService } from './file-uploader.service';
import { FileUploaderController } from './file-uploader.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/common/utils/multer.options.factory';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
  ],
  providers: [FileUploaderGateway, FileUploaderService],
  controllers: [FileUploaderController],
})
export class FileUploaderModule {}
