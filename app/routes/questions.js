'use strict';

const router = require('express').Router();

const authMiddleware = require('app/middlewares/auth');

const questionController = require('app/controllers/question');

router.get('/questions/whoToAsk', authMiddleware, questionController.whoToAsk);

module.exports = router;
