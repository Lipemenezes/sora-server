'use strict';

const env = require('config/env');
const migration = require('config/db/migration');

env();

if (process.env.NODE_ENV !== 'test') {
    migration();
}

require('config/db/db');

const app = require('config/express')();

app.listen(process.env.PORT, () =>
    console.info(`Sora server listening on port ${process.env.PORT}`),
);

module.exports = app;
