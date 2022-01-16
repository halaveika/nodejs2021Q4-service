import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToMany,OneToOne,JoinColumn} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { UserEntity } from "./user";
import { BoardEntity } from "./board";

@Entity("tasks")
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255})
  title!: string;

  @Column({ type: "integer", nullable: true})
  order!: number | null;

  @Column({type: "varchar",length: 255, nullable: true})
  description!: string | null;

  @OneToOne(type => UserEntity, user => user.id) @JoinColumn() 
  userId!: string | null;

  @OneToOne(type => BoardEntity, board => board.id) @JoinColumn() 
  boardId!: string;

  @Column({ type: "uuid", nullable: true})
  columnId!: string  | null;


  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }
}
