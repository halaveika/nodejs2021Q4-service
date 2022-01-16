import {MigrationInterface, QueryRunner} from "typeorm";

export class Rsschool61642365769954 implements MigrationInterface {
    name = 'Rsschool61642365769954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" ADD "columns" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "columns"`);
    }

}
