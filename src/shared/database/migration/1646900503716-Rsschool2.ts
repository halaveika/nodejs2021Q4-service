import {MigrationInterface, QueryRunner} from "typeorm";

export class Rsschool21646900503716 implements MigrationInterface {
    name = 'Rsschool21646900503716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "columns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "order" integer, "boardId" uuid, CONSTRAINT "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "columns"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "columns" ADD CONSTRAINT "FK_ac92bfd7ba33174aabef610f361" FOREIGN KEY ("boardId") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_0ecfe75e5bd731e00e634d70e5f" FOREIGN KEY ("columnId") REFERENCES "columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_0ecfe75e5bd731e00e634d70e5f"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP CONSTRAINT "FK_ac92bfd7ba33174aabef610f361"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "description" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "boards" ADD "columns" jsonb`);
        await queryRunner.query(`DROP TABLE "columns"`);
    }

}
