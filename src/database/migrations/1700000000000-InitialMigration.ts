import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1700000000000 implements MigrationInterface {
  name = 'InitialMigration1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Créer la table admin
    await queryRunner.query(`
      CREATE TABLE "admin" (
        "id" SERIAL PRIMARY KEY,
        "email" character varying NOT NULL UNIQUE,
        "password" character varying NOT NULL,
        "firstName" character varying NOT NULL,
        "lastName" character varying NOT NULL,
        "role" character varying NOT NULL DEFAULT 'admin',
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);

    // Créer la table bootcamp
    await queryRunner.query(`
      CREATE TABLE "bootcamp" (
        "id" SERIAL PRIMARY KEY,
        "title" character varying NOT NULL,
        "description" text NOT NULL,
        "startDate" TIMESTAMP NOT NULL,
        "endDate" TIMESTAMP NOT NULL,
        "price" integer NOT NULL,
        "maxStudents" integer NOT NULL,
        "currentStudents" integer NOT NULL DEFAULT 0,
        "status" character varying NOT NULL DEFAULT 'active',
        "imageUrl" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);

    // Créer la table lead
    await queryRunner.query(`
      CREATE TABLE "lead" (
        "id" SERIAL PRIMARY KEY,
        "firstName" character varying NOT NULL,
        "lastName" character varying NOT NULL,
        "email" character varying NOT NULL,
        "phone" character varying NOT NULL,
        "bootcampId" integer,
        "status" character varying NOT NULL DEFAULT 'pending',
        "source" character varying,
        "notes" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "fk_lead_bootcamp" FOREIGN KEY ("bootcampId") REFERENCES "bootcamp"("id") ON DELETE SET NULL
      )
    `);

    // Créer les index
    await queryRunner.query(`CREATE INDEX "IDX_admin_email" ON "admin" ("email")`);
    await queryRunner.query(`CREATE INDEX "IDX_bootcamp_status" ON "bootcamp" ("status")`);
    await queryRunner.query(`CREATE INDEX "IDX_lead_email" ON "lead" ("email")`);
    await queryRunner.query(`CREATE INDEX "IDX_lead_status" ON "lead" ("status")`);
    await queryRunner.query(`CREATE INDEX "IDX_lead_bootcamp" ON "lead" ("bootcampId")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_lead_bootcamp"`);
    await queryRunner.query(`DROP INDEX "IDX_lead_status"`);
    await queryRunner.query(`DROP INDEX "IDX_lead_email"`);
    await queryRunner.query(`DROP INDEX "IDX_bootcamp_status"`);
    await queryRunner.query(`DROP INDEX "IDX_admin_email"`);
    await queryRunner.query(`DROP TABLE "lead"`);
    await queryRunner.query(`DROP TABLE "bootcamp"`);
    await queryRunner.query(`DROP TABLE "admin"`);
  }
} 