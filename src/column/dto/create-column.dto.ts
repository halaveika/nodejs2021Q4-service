import { IsArray, IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateColumnDto {
  @IsString({ message: 'should be string' })
  title: string;

  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'should be number' },
  )
  @Min(0, { message: 'should be => 0' })
  order!: number | null;
}
