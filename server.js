'use strict';

const env = require('config/env');
const migration = require('config/db/migration');

env();

migration();

require('config/db/db');

const app = require('config/express')();

app.listen(process.env.SERVER_PORT, () =>
    console.info(`Sora server listening on port ${process.env.SERVER_PORT}`),
);

module.exports = app;
