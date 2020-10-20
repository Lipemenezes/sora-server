'use strict';

const env = require('./config/env');

module.exports = (() => {
    env();
    global.request = require('supertest');
    global.dbBuilder = require('./tests/dbBuilder');
    global.jwt = require('./app/security/jwt')
})();
