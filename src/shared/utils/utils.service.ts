import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FastifyRequest } from "fastify";

@Injectable()
export class UtilsService {

  async generatePassword(password:string){
    const setRounds = 10;
    const salt = await bcrypt.genSalt(setRounds);
    const passwordHashed = await bcrypt.hash(password, salt);
    return passwordHashed;
}

  getFastifyRequestUrl(request: FastifyRequest): string { 
    return request.raw ? request.raw.url : request.url; 
} 

}
