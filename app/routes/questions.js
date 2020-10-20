'use strict';

const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');

const questionController = require('../controllers/question');

router.get('/questions/whoToAsk', authMiddleware, questionController.whoToAsk);

module.exports = router;
