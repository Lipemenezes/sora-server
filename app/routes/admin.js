'use strict';

const authMiddleware = require('app/middlewares/auth');

const router = require('express').Router();

router.get('/status', (req, res, next) => {
    res.json({ timestamp: new Date() });
});

module.exports = router;
