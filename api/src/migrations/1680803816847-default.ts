/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1680803816847 implements MigrationInterface {
  name = 'default1680803816847';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "transactions" ("transaction_id" SERIAL NOT NULL, "operation" numeric NOT NULL, "transaction_date" date NOT NULL, "unit_price" numeric NOT NULL, "quantity" numeric NOT NULL, "total" numeric NOT NULL, "comment" text NOT NULL, "wallet_id" integer, "broker_id" integer, "asset_id" integer, CONSTRAINT "PK_9162bf9ab4e31961a8f7932974c" PRIMARY KEY ("transaction_id"))`);
    await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_0b171330be0cb621f8d73b87a9e" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("wallet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_2464d4e904a15d55b2b86d3e0e0" FOREIGN KEY ("broker_id") REFERENCES "brokers"("broker_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_92904cc4ab661f087cbcb60f404" FOREIGN KEY ("asset_id") REFERENCES "assets"("asset_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_92904cc4ab661f087cbcb60f404"`);
    await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_2464d4e904a15d55b2b86d3e0e0"`);
    await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_0b171330be0cb621f8d73b87a9e"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
  }
}
