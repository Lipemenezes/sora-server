'use strict';

const authMiddleware = require('../middlewares/auth');

const router = require('express').Router();

router.get('/status', authMiddleware, (req, res, next) => {
    res.json({ timestamp: new Date() });
});

module.exports = router;
