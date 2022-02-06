import { Module } from '@nestjs/common';
import { FilefastifyController } from './file-fastify.controller';
import { FilefastifyService } from './file-fastify.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule],
  controllers: [FilefastifyController],
  providers: [FilefastifyService]
})
export class FileFastifyModule {}
