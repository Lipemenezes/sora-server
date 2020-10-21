'use strict';

const migrations = require('postgres-migrations');

const ensureDb = async () => {
    if (process.env.NODE_ENV === 'test') return;
    const dbConfig = {
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT),
        database: process.env.PGDATABASE,
    };

    await migrations.createDb(dbConfig.database, dbConfig);
    console.info(`Ensuring db exists ${dbConfig.database}`);

    await migrations.loadMigrationFiles('migrations');
    console.info('Migration files ok');

    const resp = await migrations.migrate(dbConfig, 'migrations');
    resp.forEach(migrationDone => console.info(`Migration done: ${migrationDone.fileName}`));
    console.info('Migrations up to date');
};

module.exports = ensureDb;
