import {MigrationInterface, QueryRunner} from "typeorm";

export class Rsschool91642369311415 implements MigrationInterface {
    name = 'Rsschool91642369311415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "columns"`);
        await queryRunner.query(`ALTER TABLE "boards" ADD "columns" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "columns"`);
        await queryRunner.query(`ALTER TABLE "boards" ADD "columns" jsonb array NOT NULL DEFAULT '{}'`);
    }

}
