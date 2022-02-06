import {
  HttpException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { createWriteStream, createReadStream } from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as stream from 'stream';

@Injectable()
export class FilefastifyService {
  async uploadFile(req: FastifyRequest, res: FastifyReply): Promise<void> {
    req.multipart(this.handler, onEnd);

    async function onEnd(err: unknown) {
      if (err) {
        throw new HttpException('Internal server error', 500);
      }
      res.code(200).send({ message: 'Data uploaded successfully' });
    }
  }

  async handler(
    _field: string,
    file: string,
    filename: string,
    _encoding: string,
    _mimetype: string,
  ): Promise<void> {
    const pipeline = util.promisify(stream.pipeline);
    const pathFile = path.join(__dirname, `../../public/${filename}`);
    const writeStream = createWriteStream(pathFile);
    await pipeline(file, writeStream).catch((err) => {
      throw new HttpException('Internal server error - pipeline fiald', 500);
    });
  }

  async getFile(filename: string): Promise<StreamableFile> {
    return new Promise(async (resolve, reject) => {
      const pathFile = path.join(__dirname, `../../public/${filename}`);
      const readStream = createReadStream(pathFile);
      resolve(new StreamableFile(readStream));
      readStream.on('error', reject);
    });
  }
}
