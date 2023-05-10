/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1682435159369 implements MigrationInterface {
  name = 'default1682435159369';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "wallet_assets" ("wallet_asset_id" SERIAL NOT NULL, "average_unit_price" numeric NOT NULL, "purchased_quantity" numeric NOT NULL, "quantity" numeric NOT NULL, "gain_loss" numeric NOT NULL, "comment" text, "wallet_id" integer, "broker_id" integer, "asset_id" integer, CONSTRAINT "PK_115ca68f6cb32cfc4737f571e59" PRIMARY KEY ("wallet_asset_id"))`);
    await queryRunner.query(`ALTER TABLE "wallet_assets" ADD CONSTRAINT "FK_31125a0b936c27f03cc25e64e78" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("wallet_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "wallet_assets" ADD CONSTRAINT "FK_d8df03e870e45f7b75ca3046b4f" FOREIGN KEY ("broker_id") REFERENCES "brokers"("broker_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "wallet_assets" ADD CONSTRAINT "FK_684172af448d8d2bc7b4a025265" FOREIGN KEY ("asset_id") REFERENCES "assets"("asset_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wallet_assets" DROP CONSTRAINT "FK_684172af448d8d2bc7b4a025265"`);
    await queryRunner.query(`ALTER TABLE "wallet_assets" DROP CONSTRAINT "FK_d8df03e870e45f7b75ca3046b4f"`);
    await queryRunner.query(`ALTER TABLE "wallet_assets" DROP CONSTRAINT "FK_31125a0b936c27f03cc25e64e78"`);
    await queryRunner.query(`DROP TABLE "wallet_assets"`);
  }
}
