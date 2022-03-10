import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnService } from 'src/column/column.service';
import BoardType from 'src/common/types/board-type';
import { Repository } from 'typeorm';
import { BoardEntity } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
    private columnsRepository: ColumnService,
  ) {}
  /**
   * Returns array of Boards
   * @returns Promise of array of Boards
   */
  async getAllBoards(): Promise<BoardEntity[]> {
    const boards = await this.boardRepository.find({
      relations: ['columns']
    });
    console.log(boards)
    return boards
  }

  /**
   * Returns Board by Id
   * @param id - id of Board
   * @returns Promise of Board or undefined
   */
  async getBoardById(id: string): Promise<BoardEntity | undefined> {
    const board = await this.boardRepository.findOne({ relations: ['columns'], where: { id }});
    console.log(board)
    return board
  }

  /**
   * Returns new created Board
   * @param board - Board object for creating Board in store
   * @returns Promise of Board
   */
  async createBoard(BoardDto: CreateBoardDto): Promise<BoardType> {
    const modelBoard = await this.boardRepository.save({ ...BoardDto });

    const columns = await Promise.all(
      BoardDto.columns.map(async ({ title, order }) => {
        const columns = await this.columnsRepository.createColumn({ title, order});
        return { id: columns.id, title: columns.title, order: columns.order };
      }),
    );
    return  { id: modelBoard.id, title: modelBoard.title, columns:columns };
 
  }

  /**
   * Returns updated Board by Id
   * @param board - Board object for updating Board in store by id
   * @param id - id of Board
   * @returns Promise of Board or undefined
   */
  async updateBoardById(
    BoardDto: CreateBoardDto,
    id: string,
  ): Promise<BoardEntity | undefined> {
    const updatedBoard = await this.boardRepository.findOne({ relations: ['columns'], where: { id } });
    if (!updatedBoard) {
      return;
    }
    console.log('-----------------------------------');
    console.log(updatedBoard);
    return this.boardRepository.save({ ...updatedBoard, ...BoardDto });
  }

  /**
   * Returns deleted Board by id & delete all tasks on deleted Board
   * @param id - id of Board
   * @returns Promise boolean
   */
  async deleteBoardById(id: string): Promise<boolean> {
    return !!(await this.boardRepository.delete({ id })).affected;
  }
}
