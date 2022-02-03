import {IsString, Length} from "class-validator";

export class CreateUserDto {

    @IsString({message: 'should be string'})
    @Length(1, 16, {message: 'Length should be from 1 to 16 symbols'})
    name: string;

    @IsString({message: 'should be string'})
    @Length(1, 16, {message: 'Length should be from 1 to 16 symbols'})
    login: string;

    @IsString({message: 'should be string'})
    @Length(4, 16, {message: 'Length should be from 4 to 16 symbols'})
    password: string;
}