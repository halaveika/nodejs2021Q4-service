import { Controller, Get,Body, Param, Post, Put, Delete } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @Get()
    getUserById(@Param('id') id: string){
      return this.userService.getUserById(id);
    }

    @Post()
    createUser(@Body() user:UserEntity) {
     return this.userService.createUser(user);
    }

    @Put()
    updateUserById(@Body() user:UserEntity,@Param('id') id: string) {
     return this.userService.updateUserById(user,id);
    }

    @Delete()
    deleteUserById(@Param('id') id: string){
      return this.userService.deleteUserById(id);
    }


}
