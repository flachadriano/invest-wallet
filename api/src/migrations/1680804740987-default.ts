/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1680804740987 implements MigrationInterface {
  name = 'default1680804740987';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "comment" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "comment" SET NOT NULL`);
  }
}
