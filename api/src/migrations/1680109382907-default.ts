/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1680109382907 implements MigrationInterface {
  name = 'default1680109382907';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "wallets" ("wallet_id" SERIAL NOT NULL, "name" text NOT NULL, "user_id" integer, CONSTRAINT "PK_c1cf06e248522005c350032ee3b" PRIMARY KEY ("wallet_id"))`);
    await queryRunner.query(`ALTER TABLE "wallets" ADD CONSTRAINT "FK_92558c08091598f7a4439586cda" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wallets" DROP CONSTRAINT "FK_92558c08091598f7a4439586cda"`);
    await queryRunner.query(`DROP TABLE "wallets"`);
  }
}
