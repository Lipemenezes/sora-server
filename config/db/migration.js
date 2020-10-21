'use strict';

const migrations = require('postgres-migrations');

const pg = require('pg');

const ensureDb = async () => {

    const dbConfig = {
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT),
        database: process.env.PGDATABASE,
    };

    if (process.env.PGSSL) {
        dbConfig.ssl = {
            rejectUnauthorized: false,
        };
    }


    try {

        try {
            console.info(`Ensuring db exists ${dbConfig.database}`);
            await migrations.createDb(process.env.PGDATABASE, {
                ...dbConfig,
                defaultDatabase: 'postgres',
            });
        } catch (e) {
            console.info(e.message);
        }

        const client = new pg.Client({
            ...dbConfig,
            database: process.env.PGDATABASE,
        });

        await client.connect();

        try {
            await migrations.loadMigrationFiles('migrations');
            console.info('Migration files ok');
        } catch (e) {
            console.info(e.message);
        }

        try {
            const resp = await migrations.migrate({ client }, 'migrations');
            resp.forEach(migrationDone => console.info(`Migration done: ${migrationDone.fileName}`));
            console.info('Migrations up to date');
        } catch (e) {
            console.info(e.message);
        }

        await client.end();

    } catch (e) {
        console.error(e.message);
    }


};

module.exports = ensureDb;
