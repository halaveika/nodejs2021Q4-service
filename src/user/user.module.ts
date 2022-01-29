import { forwardRef,Module } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),
  forwardRef(() => AuthModule)
],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
