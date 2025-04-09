import { ReflectMetadataProvider } from '@mikro-orm/core';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import * as path from 'path';

const ormConfig = defineConfig({
  entities: [path.resolve(process.cwd(), 'dist/**/*.entity.js')],
  entitiesTs: [path.resolve(process.cwd(), 'src/**/*.entity.ts')],

  metadataProvider: ReflectMetadataProvider,

  clientUrl: process.env.DATABASE_URL,

  extensions: [Migrator],

  validate: true,
  strict: true,
  debug: true,

  driverOptions: {
    connection: {
      keepAlive: true,
    },
  },

  schemaGenerator: {
    disableForeignKeys: false,
  },

  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 10000,
  },

  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './dist/src/db/migrations',
    pathTs: './src/db/migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    snapshot: true,
    snapshotName: '.snapshot',
    emit: 'ts',
    generator: TSMigrationGenerator,
    fileName: (timestamp: string, name?: string) => {
      if (!name) {
        throw new Error('Specify migration name via `--name=...`');
      }
      return `Migration${timestamp}_${name}`;
    },
  },

  seeder: {
    path: './dist/src/db/seeders',
    pathTs: './src/db/seeders',
    glob: '!(*.d).{js,ts}',
    emit: 'js',
    fileName: (className: string) => className,
  },

  ignoreUndefinedInQuery: true,
});

export default ormConfig;
