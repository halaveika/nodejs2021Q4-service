import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class Rsschool1644013876564 implements MigrationInterface {
  name = 'Rsschool1644013876564';

  async generatePassword(password: string) {
    const setRounds = 10;
    const salt = await bcrypt.genSalt(setRounds);
    const passwordHashed = await bcrypt.hash(password, salt);
    return passwordHashed;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`,
    );
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "columnId"`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "description" character varying(255)`,
    );
    await queryRunner.query(`ALTER TABLE "tasks" ADD "userId" uuid`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "columnId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `INSERT INTO "users" (name, login, password) VALUES ('admin','admin','${await this.generatePassword(
        'admin',
      )}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`,
    );
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "columnId"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "columnId" uuid`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "description" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
