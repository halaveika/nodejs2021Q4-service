import {MigrationInterface, QueryRunner} from "typeorm";

export class Rsschool31642355341624 implements MigrationInterface {
    name = 'Rsschool31642355341624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "description" SET NOT NULL`);
    }

}
