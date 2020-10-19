'use strict';

const { Pool } = require('pg');

const pool = new Pool({
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.on('connect', () => {
    console.log('Connected to db');
});

module.exports = {
    execute: (text, params) => pool.query(text, params),
};
