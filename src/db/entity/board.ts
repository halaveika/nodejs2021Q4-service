import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { column } from '../../types/Column.type';

@Entity("boards")
export class BoardEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255})
  title!: string;

  @Column({
    type: 'jsonb',
    nullable: true,
})
  columns!:  column[]

  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }
}
