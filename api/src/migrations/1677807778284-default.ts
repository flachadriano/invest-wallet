import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677807778284 implements MigrationInterface {
    name = 'default1677807778284';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("refresh_token_id" SERIAL NOT NULL, "expires_in" date NOT NULL, "user_id" integer, CONSTRAINT "PK_9dbdad80950b681a645b4f6373a" PRIMARY KEY ("refresh_token_id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2023-02-26'`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    }

}
