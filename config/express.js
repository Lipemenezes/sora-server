'use strict';

const app = require('express')();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');

const userRoutes = require('app/routes/users');
const adminRoutes = require('app/routes/admin');
const questionRoutes = require('app/routes/questions');
const skillRoutes = require('app/routes/skills');

module.exports = () => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(compression());
    app.use(cors());

    app.use(userRoutes);
    app.use(adminRoutes);
    app.use(questionRoutes);
    app.use(skillRoutes);

    return app;
};
