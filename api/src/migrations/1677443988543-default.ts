import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1677443988543 implements MigrationInterface {
  name = 'default1677443988543';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "user_name" text NOT NULL, "email" text NOT NULL, "login" text NOT NULL, "password" text NOT NULL, "created_at" date NOT NULL DEFAULT \'now()\', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
  }
}
