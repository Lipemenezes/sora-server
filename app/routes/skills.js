'use strict';

const authMiddleware = require('app/middlewares/auth');

const router = require('express').Router();

const skillsController = require('app/controllers/skills');

router.get('/skills/GetByStudent', authMiddleware, skillsController.getByStudentId);

module.exports = router;
