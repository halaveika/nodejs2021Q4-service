import {MigrationInterface, QueryRunner} from "typeorm";

export class Rsschool51642364837454 implements MigrationInterface {
    name = 'Rsschool51642364837454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_4776af095a2d88f235336aab523"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_225d5e92ab6cd6d6f745ce91939"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "boardIdId"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "boardId" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_8a75fdea98c72c539a0879cb0d1" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_8a75fdea98c72c539a0879cb0d1"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "boardId"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "boardIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_225d5e92ab6cd6d6f745ce91939" FOREIGN KEY ("boardIdId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_4776af095a2d88f235336aab523" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
