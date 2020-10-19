'use strict';

const dbBuilder = require('../dbBuilder');

const request = require('supertest');
const server = require('../../server');

describe('user', () => {

    beforeAll(async () => {
        await dbBuilder.fromScratch();
    });

    describe('login', () => {

        test('email is missing from body - should return status 400', async () => {
            const res = await request(server)
                .post('/login')
                .send({
                    password: '123456',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual('Invalid payload');
        });

        test('password is missing from body - should return status 400', async () => {
            const res = await request(server)
                .post('/login')
                .send({
                    email: 'garret@hireMe.com',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual('Invalid payload');
        });

        test('invalid credentials, should return status 400', async () => {
            const res = await request(server)
                .post('/login')
                .send({
                    email: 'tiago@hireMe.com',
                    password: '123456',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual('Invalid credentials');
        });

        test('valid credentials and payload, should return status 200 and token in body', async () => {
            const res = await request(server)
                .post('/login')
                .send({
                    email: 'tiago@soraschools.com',
                    password: '123456',
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body.token).toBeTruthy();
        });

    });

    describe('register', () => {

        test('email is missing from body - should return status 400', async () => {
            const res = await request(server)
                .post('/register')
                .send({
                    password: 'boss',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual('Invalid payload');
        });

        test('password is missing from body - should return status 400', async () => {
            const res = await request(server)
                .post('/register')
                .send({
                    email: 'boss@bla.com',
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual('Invalid payload');
        });

        test('valid payload, should create', async () => {
            const res = await request(server)
                .post('/register')
                .send({
                    email: 'tiago@hireMe.com',
                    password: '123456',
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body.token).toBeTruthy();
        });

    });

});
