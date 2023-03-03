import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1677812267005 implements MigrationInterface {
  name = 'default1677812267005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "refresh_tokens" ADD "token" text NOT NULL');
    await queryRunner.query('ALTER TABLE "refresh_tokens" ADD CONSTRAINT "UQ_4542dd2f38a61354a040ba9fd57" UNIQUE ("token")');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT \'now()\'');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT \'2023-03-03\'');
    await queryRunner.query('ALTER TABLE "refresh_tokens" DROP CONSTRAINT "UQ_4542dd2f38a61354a040ba9fd57"');
    await queryRunner.query('ALTER TABLE "refresh_tokens" DROP COLUMN "token"');
  }
}
