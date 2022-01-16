import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { TaskEntity } from "./task";
import { column } from '../../types/Column.type';

@Entity("boards")
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255})
  title!: string;

  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }

  @ManyToMany(() => TaskEntity, task => {return {id:task.columnId,title:task.title,order: task.order}}, { cascade: true })
  @JoinTable({ name: "columns" })
  columns!: column[];
}
