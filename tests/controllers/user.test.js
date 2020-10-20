'use strict';

const server = require('../../server');

describe('user', () => {

    beforeAll(async () => {
        await dbBuilder.fromScratch();
    });

    describe('login', () => {

        const LOGIN_ROUTE = '/login';

        test('email is missing from body - should return status 400', async () => {
            const res = await request(server)
                .post(LOGIN_ROUTE)
                .send({
                    password: '123456',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual('Invalid payload');
        });

        test('password is missing from body - should return status 400', async () => {
            const res = await request(server)
                .post(LOGIN_ROUTE)
                .send({
                    email: 'garret@hireMe.com',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual('Invalid payload');
        });

        test('invalid credentials, should return status 400', async () => {
            const res = await request(server)
                .post(LOGIN_ROUTE)
                .send({
                    email: 'tiago@hireMe.com',
                    password: '123456',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual('Invalid credentials');
        });

        test('valid credentials and payload, should return status 200 and token in body', async () => {
            const res = await request(server)
                .post(LOGIN_ROUTE)
                .send({
                    email: 'tiago@soraschools.com',
                    password: '123456',
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body.token).toBeTruthy();
        });

    });

    describe('register', () => {

        const REGISTER_ROUTE = '/register';

        test('email is missing from body - should return status 400', async () => {
            const res = await request(server)
                .post(REGISTER_ROUTE)
                .send({
                    password: 'boss',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual('Invalid payload');
        });

        test('password is missing from body - should return status 400', async () => {
            const res = await request(server)
                .post(REGISTER_ROUTE)
                .send({
                    email: 'boss@bla.com',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual('Invalid payload');
        });

        test('valid payload, should create', async () => {
            const res = await request(server)
                .post(REGISTER_ROUTE)
                .send({
                    email: 'tiago@hireMe.com',
                    password: '123456',
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body.token).toBeTruthy();
        });

    });

});
