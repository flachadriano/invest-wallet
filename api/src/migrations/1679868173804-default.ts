/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1679868173804 implements MigrationInterface {
  name = 'default1679868173804';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "brokers" RENAME COLUMN "acronym" TO "legal_name"`);
    await queryRunner.query(`ALTER TABLE "brokers" ALTER COLUMN "legal_name" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "brokers" ALTER COLUMN "legal_name" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "brokers" RENAME COLUMN "legal_name" TO "acronym"`);
  }
}
