import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileUploaderController {
  constructor(private readonly fileUploaderService: FileUploaderService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // form data key
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileUploaderService.uploadFile(file);
  }
}
