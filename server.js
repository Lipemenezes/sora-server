'use strict';

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const authMiddleware = require('./app/middlewares/auth');

const userController = require('./app/controllers/user');

require('dotenv-safe').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/register', userController.create);

app.post('/login', userController.login);

app.get('/status', authMiddleware, (req, res, next) => {
    res.json({ timestamp: new Date() });
});

const SERVER_PORT = 3000;

app.listen(SERVER_PORT, () =>
    console.info(`Sora server listening on port ${SERVER_PORT}`),
);
