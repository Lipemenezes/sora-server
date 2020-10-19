'use strict';

const passwordHandler = require('../security/password');
const jwtHandler = require('../security/jwt');

const userModel = require('../models/user');

const validator = require('../utils/validations');

const validatePayload = payload => {
    if (!payload.email || !payload.password) return { isValid: false, error: 'Invalid payload' };

    if (!validator.isValidEmail(payload.email)) return { isValid: false, error: 'Invalid e-mail' };

    return { isValid: true };
};


module.exports = {

    async create(req, res) {

        const validation = validatePayload(req.body);
        if (!validation.isValid) return res.status(400).json({ error: validation.error });

        const hashedPassword = passwordHandler.hashPassword(req.body.password);

        const result = await userModel.insert({
            ...req.body,
            password: hashedPassword,
            role: 'student',
        });

        if (result.error) return res.status(400).json({ error: result.error });

        const token = jwtHandler.generateToken(result.id);

        return res.status(201).json({ token });
    },

    async login(req, res) {

        const validation = validatePayload(req.body);
        if (!validation.isValid) return res.status(400).json({ error: validation.error });


        const result = await userModel.getByEmail(req.body.email);

        if (!result.user || !passwordHandler.comparePassword(result.user.password, req.body.password)) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }


        const token = jwtHandler.generateToken(result.user.id);

        return res.status(200).json({ token });
    },

};
