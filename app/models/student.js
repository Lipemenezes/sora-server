'use strict';

const db = require('../../config/db');

const ERRORS = {
    NOT_EXISTING_USER: 'User does not exist',
    STUDENT_SKILL_MATCH_NOT_FOUND: 'Could not find the match for student and skill',
};

module.exports = {

    async getGeneralInfo(id) {
        const dbOperation = `
            SELECT
                u.first_name, u.last_name, u.role, sh.house_id, h.name
            FROM
                users u
            JOIN
                student_house sh on sh.user_id = u.id
            JOIN
                houses h on sh.house_id = h.id
            WHERE u.id = $1
        `;

        const values = [id];

        try {
            const { rows } = await db.execute(dbOperation, values);

            if (rows.length === 0) throw new Error(ERRORS.NOT_EXISTING_USER);

            return { student: rows[0] };
        } catch (error) {
            return { error: error.message };
        }
    },

    async getSkillData(studentId, skillId) {
        const dbOperation = `
            SELECT
                ssl.user_id, ssl.skill_id, ssl.skill_level, s.name
            FROM
                student_skill_level ssl
            JOIN
                skills s on ssl.skill_id = s.id
            WHERE
                ssl.user_id = $1
                AND ssl.skill_id = $2
        `;

        const values = [studentId, skillId];

        try {
            const { rows } = await db.execute(dbOperation, values);

            if (rows.length === 0) throw new Error(ERRORS.STUDENT_SKILL_MATCH_NOT_FOUND);

            return { skillData: rows[0] };
        } catch (error) {
            return { error: error.message };
        }
    },

};
