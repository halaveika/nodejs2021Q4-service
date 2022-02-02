import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService {

  async generatePassword(password:string){
    const setRounds = 10;
    const salt = await bcrypt.genSalt(setRounds);
    const passwordHashed = await bcrypt.hash(password, salt);
    return passwordHashed;
}

}
