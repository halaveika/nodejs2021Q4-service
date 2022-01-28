import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from './board.entity';

@Injectable()
export class BoardService {
  constructor(@InjectRepository(BoardEntity) private readonly boardRepository: Repository<BoardEntity> ) {}
  /**
   * Returns array of Boards
   * @returns Promise of array of Boards
   */
  async getAllBoards():Promise<BoardEntity[]>{
    return this.boardRepository.find({});
  }

  /**
   * Returns Board by Id
   * @param id - id of Board
   * @returns Promise of Board or undefined
   */
  async getBoardById(id:string):Promise<BoardEntity | undefined> {
    return this.boardRepository.findOne({id});
  }

  /**
   * Returns new created Board
   * @param board - Board object for creating Board in store
   * @returns Promise of Board
   */
  async createBoard(board:BoardEntity):Promise<BoardEntity> {
    return this.boardRepository.save({...board});
  }

  /**
   * Returns updated Board by Id
   * @param board - Board object for updating Board in store by id
   * @param id - id of Board
   * @returns Promise of Board or undefined
   */
  async updateBoardById(board:BoardEntity, id:string):Promise<BoardEntity | undefined> {
    const updatedBoard  = await this.boardRepository.findOne({ id });
    if (!updatedBoard) {
      return;
    }
    return this.boardRepository.save({ updatedBoard, ...board });
  }

  /**
   * Returns deleted Board by id & delete all tasks on deleted Board
   * @param id - id of Board
   * @returns Promise boolean
   */
  async deleteBoardById(id:string):Promise<boolean> {
    return !!(await this.boardRepository.delete({ id})).affected;
  }

}
