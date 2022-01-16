import {MigrationInterface, QueryRunner} from "typeorm";

export class Rsschool1642346778643 implements MigrationInterface {
    name = 'Rsschool1642346778643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "login" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "order" integer, "description" character varying(255) NOT NULL, "columnId" uuid, "userIdId" uuid, "boardIdId" uuid, CONSTRAINT "REL_4776af095a2d88f235336aab52" UNIQUE ("userIdId"), CONSTRAINT "REL_225d5e92ab6cd6d6f745ce9193" UNIQUE ("boardIdId"), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "permissions" character varying array NOT NULL, CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "columns" ("boardsId" uuid NOT NULL, "tasksId" uuid NOT NULL, CONSTRAINT "PK_1d43c8591f21c719e0e65b48d1a" PRIMARY KEY ("boardsId", "tasksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_87fb5aec73b37fb3ad46141c98" ON "columns" ("boardsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1df47c205572b244cbb36210e1" ON "columns" ("tasksId") `);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_4776af095a2d88f235336aab523" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_225d5e92ab6cd6d6f745ce91939" FOREIGN KEY ("boardIdId") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "columns" ADD CONSTRAINT "FK_87fb5aec73b37fb3ad46141c981" FOREIGN KEY ("boardsId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "columns" ADD CONSTRAINT "FK_1df47c205572b244cbb36210e1d" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "columns" DROP CONSTRAINT "FK_1df47c205572b244cbb36210e1d"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP CONSTRAINT "FK_87fb5aec73b37fb3ad46141c981"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_225d5e92ab6cd6d6f745ce91939"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_4776af095a2d88f235336aab523"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1df47c205572b244cbb36210e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87fb5aec73b37fb3ad46141c98"`);
        await queryRunner.query(`DROP TABLE "columns"`);
        await queryRunner.query(`DROP TABLE "boards"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
