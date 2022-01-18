import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
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

  @ManyToOne(type => UserEntity, {onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @ManyToOne(type => BoardEntity,{ onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board?: BoardEntity;

  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }
}
