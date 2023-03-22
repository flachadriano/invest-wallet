import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1679346680155 implements MigrationInterface {
  name = 'default1679346680155';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "brokers" ("broker_id" SERIAL NOT NULL, "acronym" text NOT NULL, "name" text NOT NULL, "cnpj" text, "user_id" integer, CONSTRAINT "PK_25af27bfabaf628ce6ab029fbb7" PRIMARY KEY ("broker_id"))');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT \'now()\'');
    await queryRunner.query('ALTER TABLE "brokers" ADD CONSTRAINT "FK_6d416a27fc4a06ebf871aa8bde8" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "brokers" DROP CONSTRAINT "FK_6d416a27fc4a06ebf871aa8bde8"');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT \'2023-03-12\'');
    await queryRunner.query('DROP TABLE "brokers"');
  }
}
