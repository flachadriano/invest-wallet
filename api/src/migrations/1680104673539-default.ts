/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1680104673539 implements MigrationInterface {
  name = 'default1680104673539';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "assets" ("asset_id" SERIAL NOT NULL, "name" text NOT NULL, "category" text NOT NULL DEFAULT 'Geral', "subcategory" text NOT NULL DEFAULT 'Não informado', "legal_name" text, "cnpj" text, "user_id" integer, CONSTRAINT "PK_ba1dca7766f77b6c475091f860c" PRIMARY KEY ("asset_id"))`);
    await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_95e68ec694262926f1af7176a1e" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_95e68ec694262926f1af7176a1e"`);
    await queryRunner.query(`DROP TABLE "assets"`);
  }
}
