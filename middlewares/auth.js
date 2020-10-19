'use strict';

const jwtHandler = require('../security/jwt');
const parseBearerToken = require('parse-bearer-token').default;

module.exports = async (req, res, next) => {

    try {
        const token = parseBearerToken(req);

        const result = await jwtHandler.verifyToken(token);

        if (!result.isValid) throw new Error(result.error);

        req.user = { userId: result.userId };

        next();
    } catch (error) {
        return res.status(403).send({ error: error.message });
    }

};
