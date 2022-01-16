import {MigrationInterface, QueryRunner} from "typeorm";

export class Rsschool21642355087206 implements MigrationInterface {
    name = 'Rsschool21642355087206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "permissions"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards" ADD "permissions" character varying array NOT NULL`);
    }

}
