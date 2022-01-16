import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToOne} from "typeorm";
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
  description?: string | null;

  @Column({ type: "uuid", nullable: true})
  userId?: string  | null;

  @Column({ type: "uuid", nullable: true})
  boardId?: string  | null;

  @Column({ type: "uuid", nullable: true})
  columnId?: string  | null;

  @ManyToOne(type => UserEntity, user => user.id,{ onDelete: 'CASCADE' })
  user?: UserEntity;

  @ManyToOne(type => BoardEntity, board => board.id,{ onDelete: 'CASCADE' })
  board?: BoardEntity;

  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }
}
