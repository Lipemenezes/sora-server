'use strict';

const getEnvPath = () => {
    const envs = {
        'test': '.env.test',
        'dev': '.env.dev',
    };

    return envs[process.env.NODE_ENV] || '.env';
};

module.exports = () => {
    require('dotenv-safe').config({
        path: getEnvPath(),
        allowEmptyValues: true
    });
};
