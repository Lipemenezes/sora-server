'use strict';

const router = require('express').Router();

const userController = require('../controllers/user');

router.post('/register', userController.create);
router.post('/login', userController.login);

module.exports = router;
