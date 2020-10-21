'use strict';

const { Pool } = require('pg');

const connectionData = {
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
};

if (process.env.PGSSL) {
    connectionData.ssl = {
        rejectUnauthorized: false,
    };
}

const pool = new Pool(connectionData);

pool.on('connect', () => {
    console.info(`Connected to db ${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`);
});

module.exports = {
    execute: (text, params) => pool.query(text, params),
};
