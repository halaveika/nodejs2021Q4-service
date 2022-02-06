import { IsArray, IsString, Length } from 'class-validator';
import { ColumnEntity } from '../../column/column.entity';

export class CreateBoardDto {
  @IsString({ message: 'should be string' })
  title: string;

  @IsArray({ message: 'should be array' })
  columns: ColumnEntity[];
}
