'use strict';

const skillModel = require('app/models/skill');

module.exports = {

    async getByStudentId(req, res) {
        const userId = req.user.userId;

        const result = await skillModel.getByStudentId(userId);

        if (result.error) return res.status(400).json({ error: result.error });

        return res.status(200).json({ data: result.skills });
    },

};
