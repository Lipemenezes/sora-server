'use strict';

const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');

const whoCanHelpController = require('../controllers/whoCanHelp');

router.get('/whoCanHelp', authMiddleware, whoCanHelpController.discover);

module.exports = router;
