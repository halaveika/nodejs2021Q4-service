import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToOne} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { BoardEntity } from "../board/board.entity";

@Entity("tasks")
export class ColumnEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255})
  title!: string;

  @Column({ type: "integer", nullable: true})
  order!: number | null;

  @ManyToOne(type => BoardEntity,{ onDelete: 'CASCADE' })
  board?: BoardEntity;

  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }
}