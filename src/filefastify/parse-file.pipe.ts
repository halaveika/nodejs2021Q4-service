import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class ParseFile implements PipeTransform {
  transform(req: FastifyRequest, _metadata: ArgumentMetadata): FastifyRequest {
    if (!req.isMultipart()) {
      throw new BadRequestException('Request is not multipart');
    }
    return req;
  }
}
