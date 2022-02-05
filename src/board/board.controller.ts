import { Controller, Get,Body, Param, Post, Put, Delete,NotFoundException,HttpCode, BadRequestException,UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import {AuthGuard} from "../auth/auth.guard";
import { CreateBoardDto } from './dto/create-board.dto';

@UseGuards(AuthGuard)
@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  getAllBoards(){
    return this.boardService.getAllBoards();
  }

  @Get('/:boardId')
  async getBoardById(@Param('boardId') boardId: string){
    const board = await this.boardService.getBoardById(boardId);
    if(!board) {
      throw new NotFoundException('Board not found');
    }
    return board;
  }

  @Post()
  async createBoard(@Body() boardDto:CreateBoardDto){
    const newBoard = await this.boardService.createBoard(boardDto);
    if(!newBoard) {
      throw new BadRequestException('Board not created');
    }
    return newBoard;
  }

  @Put('/:boardId')
  async updateBoardById(@Body() boardDto:CreateBoardDto, @Param('boardId') boardId: string){
    const updatedBoard = await this.boardService.updateBoardById(boardDto,boardId);
    if(!updatedBoard) {
      throw new NotFoundException('Board not found');
    }
    return updatedBoard;
  }

  @Delete('/:boardId')
  async deleteBoardById(@Param('boardId') boardId: string){
    const isDeleted = await this.boardService.deleteBoardById(boardId);
    if(!isDeleted) {
      throw new NotFoundException('Board not found');
    }
    return isDeleted;
  }

}
