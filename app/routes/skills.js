'use strict';

const authMiddleware = require('../middlewares/auth');

const router = require('express').Router();

const skillsController = require('../controllers/skills');

router.get('/skills/GetByStudent', authMiddleware, skillsController.getByStudentId);

module.exports = router;
