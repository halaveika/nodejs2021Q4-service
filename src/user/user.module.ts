import { Module } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  exports: [TypeOrmModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
