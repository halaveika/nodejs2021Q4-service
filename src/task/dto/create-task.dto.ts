import { IsString, IsOptional, IsUUID, IsNumber, Min } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'should be string' })
  title: string;

  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'should be number' },
  )
  @Min(0, { message: 'should be => 0' })
  order: number | null;

  @IsOptional()
  @IsString({ message: 'should be string' })
  description: string | null;

  @IsOptional()
  @IsUUID(4, { message: 'should be UUID format' })
  userId!: string | null;

  @IsOptional()
  @IsUUID(4, { message: 'should be UUID format' })
  boardId: string | null;

  @IsOptional()
  @IsUUID(4, { message: 'should be UUID format' })
  columnId: string | null;
}
