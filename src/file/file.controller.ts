import { Controller, Post, UploadedFile, Get,Res, Param,UseInterceptors,UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ParseFile } from './parse-file.pipe';
import {AuthGuard} from "../auth/auth.guard";



@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(ParseFile) file: Express.Multer.File): Promise<boolean> {
    return this.fileService.uploadFile(file);
  }

  @Get('/:filename')
  getFile(@Param('filename') filename: string) {
    return this.fileService.getFile(filename);
  }

}
