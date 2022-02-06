import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Put,
  Delete,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get All User' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    const newUser = await this.userService.createUser(userDto);
    if (!newUser) {
      throw new BadRequestException('User not created');
    }
    return newUser;
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Put('/:id')
  async updateUserById(
    @Body() userDto: CreateUserDto,
    @Param('id') id: string,
  ) {
    const updatedUser = await this.userService.updateUserById(userDto, id);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 204 })
  @Delete('/:id')
  async deleteUserById(@Param('id') id: string) {
    const isDeleted = await this.userService.deleteUserById(id);
    if (!isDeleted) {
      throw new NotFoundException('User not found');
    }
    return isDeleted;
  }
}
