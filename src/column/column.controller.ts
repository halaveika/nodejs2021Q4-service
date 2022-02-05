import { Controller, Get,Body, Param, Post, Put, Delete,NotFoundException,HttpCode,BadRequestException,UseGuards} from '@nestjs/common';
import { ColumnService } from './column.service';
import {AuthGuard} from "../auth/auth.guard";
import { CreateColumnDto } from './dto/create-column.dto';

@UseGuards(AuthGuard)
@Controller('boards/:boardId/columns')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Get('/:id')
  async getColumnById(@Param('id') id: string){
    const column = await this.columnService.getColumnById(id);
    if(!column) {
      throw new NotFoundException('Column not found');
    }
    return column;
  }

  @Post()
  async createColumn(@Body() columnDto: CreateColumnDto){
    const newColumn = await this.columnService.createColumn(columnDto);
    if(!newColumn) {
      throw new BadRequestException('Column not created');
    }
    return newColumn;
  }

  @Put('/:id')
  async updateColumnById(@Param('id') id: string, @Body() columnDto:CreateColumnDto){
    const updatedColumn = await this.columnService.updateColumnById(columnDto,id);
    if(!updatedColumn) {
      throw new NotFoundException('Column not found');
    }
    return updatedColumn;
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string){
    const isDeleted = await this.columnService.deleteColumnById(id);
    if(!isDeleted) {
      throw new NotFoundException('Column not found');
    }
    return isDeleted;
  }

}
