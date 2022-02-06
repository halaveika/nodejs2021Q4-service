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
import { ColumnService } from './column.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateColumnDto } from './dto/create-column.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnEntity } from './column.entity';

@ApiTags('columns')
@UseGuards(AuthGuard)
@Controller('boards/:boardId/columns')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @ApiOperation({ summary: 'Get Columns' })
  @ApiResponse({ status: 200, type: [ColumnEntity] })
  @Get('/:id')
  async getColumnById(@Param('id') id: string) {
    const column = await this.columnService.getColumnById(id);
    if (!column) {
      throw new NotFoundException('Column not found');
    }
    return column;
  }

  @ApiOperation({ summary: 'Create Column' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  @Post()
  async createColumn(@Body() columnDto: CreateColumnDto) {
    const newColumn = await this.columnService.createColumn(columnDto);
    if (!newColumn) {
      throw new BadRequestException('Column not created');
    }
    return newColumn;
  }

  @ApiOperation({ summary: 'Update Column' })
  @ApiResponse({ status: 200, type: ColumnEntity })
  @Put('/:id')
  async updateColumnById(
    @Param('id') id: string,
    @Body() columnDto: CreateColumnDto,
  ) {
    const updatedColumn = await this.columnService.updateColumnById(
      columnDto,
      id,
    );
    if (!updatedColumn) {
      throw new NotFoundException('Column not found');
    }
    return updatedColumn;
  }

  @ApiOperation({ summary: 'Delete Column' })
  @ApiResponse({ status: 204 })
  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string) {
    const isDeleted = await this.columnService.deleteColumnById(id);
    if (!isDeleted) {
      throw new NotFoundException('Column not found');
    }
    return isDeleted;
  }
}
