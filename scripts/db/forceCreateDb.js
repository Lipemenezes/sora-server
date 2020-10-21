'use strict';
const env = require('config/env');

if (process.env.NODE_ENV === 'test') {
    env();
    require('config/db/migration')();

    console.info('tried to migrate');
}
