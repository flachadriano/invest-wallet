/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1680123757265 implements MigrationInterface {
  name = 'default1680123757265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "selected_wallet_id" integer`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT 'now()'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "created_at" date NOT NULL DEFAULT '2023-03-29'`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "selected_wallet_id"`);
  }
}
