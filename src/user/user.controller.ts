import { Controller, Get,Body, Param, Post, Put, Delete,HttpCode,NotFoundException,BadRequestException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {AuthGuard} from "../auth/auth.guard";
import { CreateUserDto } from './dto/create-user.dto';

@UseGuards(AuthGuard)
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
    async createUser(@Body() userDto: CreateUserDto) {
      const newUser = await this.userService.createUser(userDto);
      if(!newUser) {
        throw new BadRequestException('User not created');
      }
     return newUser;
    }

    @Put('/:id')
    async updateUserById(@Body() userDto: CreateUserDto,@Param('id') id: string) {
      const updatedUser = await this.userService.updateUserById(userDto,id);
      if(!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    }

    @Delete('/:id')
    async deleteUserById(@Param('id') id: string){
      const isDeleted = await this.userService.deleteUserById(id);
      if(!isDeleted) {
        throw new NotFoundException('User not found');
      }
      return isDeleted;
    }


}
