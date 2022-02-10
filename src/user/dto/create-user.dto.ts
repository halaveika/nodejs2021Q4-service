import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'should be string' })
  @Length(1, 30, { message: 'Length should be from 1 to 30 symbols' })
  name: string;

  @IsString({ message: 'should be string' })
  @Length(1, 30, { message: 'Length should be from 1 to 30 symbols' })
  login: string;

  @IsString({ message: 'should be string' })
  @Length(4, 30, { message: 'Length should be from 4 to 30 symbols' })
  password: string;
}
