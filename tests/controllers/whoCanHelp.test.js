'use strict';

const dbBuilder = require('../dbBuilder');

const request = require('supertest');
const server = require('../../server');

describe('whoCanHelp', () => {

    const authHeader = {
        Authorization: null,
    };

    beforeAll(async () => {
        await dbBuilder.fromScratch();

        const res = await request(server)
            .post('/login')
            .send({
                email: 'tiago@soraschools.com',
                password: '123456',
            });

        authHeader.Authorization = `Bearer ${res.body.token}`;

        return;
    });

    describe('student cases', () => {

        test(' BOTAR O NOME ', async () => {
            const res = await request(server)
                .get('/whoCanHelp?skillId=1')
                .set(authHeader)
                .send();
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual('Invalid payload');
        });

    });

});
