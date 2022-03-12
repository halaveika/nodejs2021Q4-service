import { TaskEntity } from 'src/task/task.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { BoardEntity } from '../board/board.entity';

@Entity('columns')
export class ColumnEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'integer', nullable: true })
  order!: number | null;

  @Column({ type: 'uuid', nullable: true, select:false })
  boardId: string | null;

  @ManyToOne(() => BoardEntity, (board) => board.columns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board!: BoardEntity;

  @OneToMany(() => TaskEntity, (task) => task.boardId, {
    cascade: true,
  })
  tasks!: TaskEntity[];

  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }
}
