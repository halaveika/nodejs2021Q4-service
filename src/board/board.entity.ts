import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ColumnEntity } from '../column/column.entity';

@Entity('boards')
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  columns!: ColumnEntity[];

  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }
}
