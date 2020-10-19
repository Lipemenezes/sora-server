'use strict';

const db = require('../../config/db');

const ERRORS = {
    DUPLICATED_EMAIL: 'User with that EMAIL already exists',
    NOT_EXISTING_USER: 'User does not exist',
};

module.exports = {

    async insert({ firstName, lastName, email, password, role }) {
        const dbOperation = `
            INSERT INTO users
                (first_name, last_name, email, password, role, created_on)
            VALUES ($1, $2, $3, $4, $5, $6)
            returning id
        `;

        const values = [
            firstName,
            lastName,
            email,
            password,
            role,
            new Date(),
        ];

        try {
            const { rows } = await db.execute(dbOperation, values);

            return { id: rows[0].id };
        } catch (error) {
            if (error.routine === '_bt_check_unique') return { error: ERRORS.DUPLICATED_EMAIL };

            return { error: error.message };
        }
    },

    async getByEmail(email) {
        const dbOperation = 'SELECT * FROM users WHERE email = $1';
        const values = [email];

        try {
            const { rows } = await db.execute(dbOperation, values);

            if (rows.length === 0) throw new Error(ERRORS.NOT_EXISTING_USER);

            return { user: rows[0] };
        } catch (error) {
            return { error: error.message };
        }
    },

    async getById(userId) {
        const dbOperation = 'SELECT * FROM users WHERE id = $1';
        const values = [userId];

        try {
            const { rows } = await db.execute(dbOperation, values);

            if (rows.length === 0) throw new Error(ERRORS.NOT_EXISTING_USER);

            return { user: rows[0] };
        } catch (error) {
            return { error: error.message };
        }
    },

};
