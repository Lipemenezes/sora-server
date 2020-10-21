'use strict';

const jwt = require('jsonwebtoken');
const userModel = require('app/models/user');

const JWT_EXPIRATION = '7d';

module.exports = {

    generateToken(userId) {
        return jwt.sign({ userId }, process.env.SECRET, { expiresIn: JWT_EXPIRATION });
    },

    verifyToken: async token => {
        try {
            if (!token) throw new Error('Empty token');

            const decodedToken = await jwt.verify(token, process.env.SECRET);

            const result = await userModel.getById(decodedToken.userId);

            if (!result.user) throw new Error('Invalid token');

            return { isValid: true, userId: result.user.id };
        } catch (error) {
            return { isValid: false, error: error.message };
        }
    },

};
