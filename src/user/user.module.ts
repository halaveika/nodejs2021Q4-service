import { Module } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  exports: [TypeOrmModule]

})
export class UserModule {}
