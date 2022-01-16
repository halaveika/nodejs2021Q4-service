import {MigrationInterface, QueryRunner} from "typeorm";

export class Rsschool81642368928517 implements MigrationInterface {
    name = 'Rsschool81642368928517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "columns"`);
        await queryRunner.query(`ALTER TABLE "boards" ADD "columns" jsonb array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "columns"`);
        await queryRunner.query(`ALTER TABLE "boards" ADD "columns" jsonb`);
    }

}
