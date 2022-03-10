import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './column.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity]), AuthModule],
  exports: [ColumnService],
  providers: [ColumnService],
  controllers: [ColumnController],
})
export class ColumnModule {}
