import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToMany } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Board } from "./board";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255})
  name!: string;

  @Column({ type: "varchar", length: 255})
  login!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }
}
