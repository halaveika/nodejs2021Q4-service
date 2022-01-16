import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToMany,OneToOne,JoinColumn} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user";
import { Board } from "./board";

@Entity("tasks")
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255})
  title!: string;

  @Column({ type: "integer", nullable: true})
  order!: number | null;

  @Column({type: "varchar",length: 255})
  description!: string;

  @OneToOne(type => User, user => user.id) @JoinColumn() 
  userId!: string;

  @OneToOne(type => Board, board => board.id) @JoinColumn() 
  boardId!: string;

  @Column({ type: "uuid", nullable: true})
  columnId!: string  | null;


  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }
}
