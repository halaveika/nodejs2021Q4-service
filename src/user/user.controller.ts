import { Controller, Get,Body, Param, Post, Put, Delete,HttpCode,NotFoundException,BadRequestException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @Get('/:id')
    async getUserById(@Param('id') id: string){
      const user = await this.userService.getUserById(id);
      if(!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }

    @Post()
    async createUser(@Body() user:UserEntity) {
      const newUser = await this.userService.createUser(user);
      if(!newUser) {
        throw new BadRequestException('User not created');
      }
     return newUser;
    }

    @Put('/:id')
    async updateUserById(@Body() user:UserEntity,@Param('id') id: string) {
      const updatedUser = await this.userService.updateUserById(user,id);
      if(!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    }

    @Delete('/:id')
    @HttpCode(204)
    async deleteUserById(@Param('id') id: string){
      const isDeleted = await this.userService.deleteUserById(id);
      if(!isDeleted) {
        throw new NotFoundException('User not found');
      }
      return isDeleted;
    }


}
