import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';
import { BoardEntity } from 'src/board/board.entity';

export class CreateColumnDto {
  @IsString()
  @IsUUID(4)
  @IsOptional()
  id?: string;

  @IsString()
  title!: string;

  @IsNumber()
  order!: number;

  @IsOptional()
  @IsUUID(4, { message: 'should be UUID format' })
  boardId: string | null;

  @IsOptional()
  board!: BoardEntity;
}