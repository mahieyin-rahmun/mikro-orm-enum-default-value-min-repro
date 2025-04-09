import { Migration } from '@mikro-orm/migrations';

export class Migration20250409112624_add_test_entity_with_state_enum extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "tests" ("id" serial, "name" varchar(255) not null, "state" text check ("state" in ('active', 'inactive')) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "tests_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "tests" cascade;`);
  }

}
