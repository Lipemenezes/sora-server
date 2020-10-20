'use strict';

const db = require('../../config/db');

const MIN_SKILL_LEVEL = 3;

module.exports = {

    async getStudents(skillId, mySkillLevel, myHouseId) {

        // trazer u.id, u.firstName, u.lastName, u.house, sh.name
        // join users u

        const dbOperation = `
            SELECT
                sh.user_id, u.first_name, u.last_name, u.role
            FROM
                student_skill_level ssl
            LEFT JOIN
                student_house sh on ssl.user_id = sh.user_id
            JOIN
                users u on u.id = ssl.user_id
            WHERE
                ssl.skill_id = $1
                AND ssl.skill_level >= $2
                AND ssl.skill_level > $3
            ORDER BY (
                CASE WHEN sh.house_id = $4 THEN 2 ELSE 1 END,
                ssl.skill_level
            ) DESC
        `;

        const values = [
            skillId,
            MIN_SKILL_LEVEL,
            mySkillLevel,
            myHouseId,
        ];

        try {
            const { rows } = await db.execute(dbOperation, values);

            return { students: rows };
        } catch (error) {
            return { error: error.message };
        }
    },

    async getFacultyMembers(skillId) {
        const dbOperation = `
            SELECT
                fms.user_id, u.first_name, u.last_name, u.role
            FROM
                faculty_member_skills fms
            JOIN
                users u on fms.user_id = u.id
            WHERE
                fms.skill_id = $1
        `;

        const values = [skillId];

        try {
            const { rows } = await db.execute(dbOperation, values);

            return { facultyMembers: rows };
        } catch (error) {
            return { error: error.message };
        }
    },

};
