import {
  Controller,
  Post,
  UploadedFile,
  Get,
  Param,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ParseFile } from './parse-file.pipe';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: 'Post File' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(ParseFile) file: Express.Multer.File,
  ): Promise<boolean> {
    return this.fileService.uploadFile(file);
  }

  @ApiOperation({ summary: 'Get File' })
  @ApiResponse({ status: 200 })
  @Get('/:filename')
  getFile(@Param('filename') filename: string) {
    return this.fileService.getFile(filename);
  }
}
