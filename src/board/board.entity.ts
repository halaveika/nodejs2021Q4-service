import { TaskEntity } from 'src/task/task.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ColumnEntity } from '../column/column.entity';

@Entity('boards')
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @OneToMany(() => ColumnEntity, (column) => column.board)
  @JoinColumn({ name: 'columns' })
  columns!: ColumnEntity[];

  @OneToMany(() => TaskEntity, (task) => task.board)
  tasks!: TaskEntity[];

  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }
}
