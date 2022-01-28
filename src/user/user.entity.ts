import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BaseEntity } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Exclude } from 'class-transformer';

@Entity("users")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255})
  name!: string;

  @Column({ type: "varchar", length: 255})
  login!: string;

  @Exclude()
  @Column({ type: "varchar", length: 255, select: false })
  password?: string;

  @BeforeInsert()
  async addId(): Promise<void> {
    this.id = uuidv4();
  }
}