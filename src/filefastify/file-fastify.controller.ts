import { Res, Controller, UseGuards, Post, Param, Get } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ParseFile } from './parse-file.pipe';
import { AuthGuard } from '../auth/auth.guard';
import { FilefastifyService } from './file-fastify.service';
import { ReqFast } from './reqFast.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('File')
@Controller('file')
export class FilefastifyController {
  constructor(private fileService: FilefastifyService) {}

  @ApiOperation({ summary: 'Post File' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard)
  @Post()
  async uploadFile(
    @ReqFast(ParseFile) req: FastifyRequest,
    @Res() res: FastifyReply,
  ) {
    return await this.fileService.uploadFile(req, res);
  }

  @ApiOperation({ summary: 'Get File' })
  @ApiResponse({ status: 200 })
  @Get('/:filename')
  getFile(@Param('filename') filename: string) {
    return this.fileService.getFile(filename);
  }
}
