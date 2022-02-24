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
import { BoardService } from './board.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateBoardDto } from './dto/create-board.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardEntity } from './board.entity';

@ApiTags('boards')
// @UseGuards(AuthGuard)
@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @ApiOperation({ summary: 'Get All Boards' })
  @ApiResponse({ status: 200, type: [BoardEntity] })
  @Get()
  getAllBoards() {
    return this.boardService.getAllBoards();
  }

  @ApiOperation({ summary: 'Get Board' })
  @ApiResponse({ status: 200, type: BoardEntity })
  @Get('/:boardId')
  async getBoardById(@Param('boardId') boardId: string) {
    const board = await this.boardService.getBoardById(boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    return board;
  }

  @ApiOperation({ summary: 'Create Board' })
  @ApiResponse({ status: 200, type: BoardEntity })
  @Post()
  async createBoard(@Body() boardDto: CreateBoardDto) {
    const newBoard = await this.boardService.createBoard(boardDto);
    if (!newBoard) {
      throw new BadRequestException('Board not created');
    }
    return newBoard;
  }

  @ApiOperation({ summary: 'Update Board' })
  @ApiResponse({ status: 200, type: BoardEntity })
  @Put('/:boardId')
  async updateBoardById(
    @Body() boardDto: CreateBoardDto,
    @Param('boardId') boardId: string,
  ) {
    const updatedBoard = await this.boardService.updateBoardById(
      boardDto,
      boardId,
    );
    if (!updatedBoard) {
      throw new NotFoundException('Board not found');
    }
    return updatedBoard;
  }

  @ApiOperation({ summary: 'Delete Board' })
  @ApiResponse({ status: 204 })
  @Delete('/:boardId')
  async deleteBoardById(@Param('boardId') boardId: string) {
    const isDeleted = await this.boardService.deleteBoardById(boardId);
    if (!isDeleted) {
      throw new NotFoundException('Board not found');
    }
    return isDeleted;
  }
}
