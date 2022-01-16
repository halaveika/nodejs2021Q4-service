import {MigrationInterface, QueryRunner} from "typeorm";

export class Rsschool41642360245039 implements MigrationInterface {
    name = 'Rsschool41642360245039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "boardIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_4776af095a2d88f235336aab523" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_225d5e92ab6cd6d6f745ce91939" FOREIGN KEY ("boardIdId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_225d5e92ab6cd6d6f745ce91939"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_4776af095a2d88f235336aab523"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "boardIdId"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "userIdId"`);
    }

}
