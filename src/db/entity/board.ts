import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Task } from "./task";
import { column } from '../../types/Column.type';

@Entity("boards")
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255})
  title!: string;

  @Column("varchar", { array: true })
  permissions!: string[];

  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }

  @ManyToMany(() => Task, task => {return {id:task.columnId,title:task.title,order: task.order}}, { cascade: true })
  @JoinTable({ name: "columns" })
  columns!: column[];
}
