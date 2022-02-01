import { Injectable,UploadedFile,Res,StreamableFile  } from '@nestjs/common';
import { createWriteStream, createReadStream } from 'fs';
import { ParseFile } from './parse-file.pipe';
import * as path from 'path';

@Injectable()
export class FileService {
    async uploadFile(@UploadedFile(ParseFile) file: Express.Multer.File): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const pathFile = path.join(__dirname, `../../public/${file.originalname}`) ;
            const writeStream = createWriteStream(pathFile);
            writeStream.write(file.buffer);
            writeStream.end();
            writeStream.on("finish", () => { resolve(true); }); 
            writeStream.on("error", reject); 
        });
    }

    async getFile(filename:string): Promise<StreamableFile> {
      return new Promise(async (resolve, reject) => {
          const pathFile = path.join(__dirname, `../../public/${filename}`) ;
          const readStream = createReadStream(pathFile);
          resolve(new StreamableFile(readStream)); 
          readStream.on("error", reject); 
      });
  }
}