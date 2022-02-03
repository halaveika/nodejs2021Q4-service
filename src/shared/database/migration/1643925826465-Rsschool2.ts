import {MigrationInterface, QueryRunner} from "typeorm";

export class Rsschool21643925826465 implements MigrationInterface {
    name = 'Rsschool21643925826465'


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "columnId"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "description" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "columnId" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "columnId"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "columnId" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "description" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
