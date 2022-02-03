import {IsString} from "class-validator";

export class LoginDto {

    @IsString({message: 'should be string'})
    login: string;

    @IsString({message: 'should be string'})
    password: string;
}