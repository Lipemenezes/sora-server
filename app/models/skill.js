'use strict';

const db = require('config/db');

module.exports = {

    async getByStudentId(studentId) {
        const dbOperation = `
            SELECT
                ssl.user_id, ssl.skill_id, ssl.skill_level, s.name
            FROM
                student_skill_level ssl
            JOIN
                skills s on ssl.skill_id = s.id
            WHERE
                ssl.user_id = $1
        `;

        const values = [studentId];

        try {
            const { rows } = await db.execute(dbOperation, values);

            return { skills: rows };
        } catch (error) {
            return { error: error.message };
        }
    },

};
