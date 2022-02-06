
import {Req, Res, Controller, UseGuards,Post,Param,Get,UsePipes} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from "fastify";
import { ParseFile } from './parse-file.pipe';
import {AuthGuard} from "../auth/auth.guard";
import { FilefastifyService } from './file-fastify.service';
import { ReqFast } from './reqFast.decorator';

@Controller('file')
export class FilefastifyController {
  constructor(private fileService: FilefastifyService) {}
  
  @UseGuards(AuthGuard)
  @Post()
  async uploadFile(@ReqFast(ParseFile) req: FastifyRequest, @Res() res:FastifyReply){
    return await this.fileService.uploadFile(req,res)
  }

  @Get('/:filename')
  getFile(@Param('filename') filename: string) {
    return this.fileService.getFile(filename);
  }
}