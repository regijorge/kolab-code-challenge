import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1721785425553 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE "user" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "username" character varying NOT NULL,
            "password" character varying NOT NULL,
            "parentUserId" uuid,
            CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
          )
        `);
        await queryRunner.query(`
          ALTER TABLE "user"
          ADD CONSTRAINT "FK_8e1f623798118e629b46a9e6296" FOREIGN KEY ("parentUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_8e1f623798118e629b46a9e6296"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
