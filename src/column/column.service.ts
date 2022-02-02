import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnEntity } from './column.entity';

@Injectable()
export class ColumnService {
  constructor(@InjectRepository(ColumnEntity) private readonly columnRepository: Repository<ColumnEntity> ) {}

async getColumnById(id:string):Promise<ColumnEntity | undefined>{
  return await this.columnRepository.findOne({id}) as ColumnEntity | undefined;
}

async createColumn(column:ColumnEntity):Promise<ColumnEntity>{
  return this.columnRepository.save({...column});
}

async updateColumnById(column:ColumnEntity,id:string):Promise<ColumnEntity | undefined>{
  const updatedColumn  = this.columnRepository.findOne({id});
  if (!updatedColumn) {
    return;
  }
  return this.columnRepository.save({ updatedColumn, ...column });
}

async deleteColumnById(id:string):Promise<boolean>{
  return !!(await this.columnRepository.delete({id})).affected
} 

}
