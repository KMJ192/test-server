import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [],
  controllers: [AuthController],
})
export class AuthModule {}
