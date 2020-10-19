'use strict';

const dbBuilder = require('../dbBuilder');

const mockRequest = body => ({
    body,
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const { login, create } = require('../../app/controllers/user');

describe('user', () => {

    beforeAll(async () => {
        await dbBuilder.fromScratch();
    });

    describe('login', () => {

        test('email is missing from body - should return 400', async () => {
            const req = mockRequest(
                { password: 'boss' },
            );
            const res = mockResponse();
            await login(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Invalid payload',
            });
        });

        test('password is missing from body - should return 400', async () => {
            const req = mockRequest(
                { email: 'garret@hireMe.com' },
            );
            const res = mockResponse();
            await login(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Invalid payload',
            });
        });

        test('invalid credentials, should return 400', async () => {
            const req = mockRequest(
                { email: 'tiago@hireMe.com', password: '123456' },
            );
            const res = mockResponse();
            await login(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Invalid credentials',
            });
        });

        test('should 200 - if correct credentials and payload', async () => {
            const req = mockRequest(
                { email: 'tiago@soraschools.com', password: '123456' },
            );
            const res = mockResponse();
            await login(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

    });

    describe('create', () => {

        test('email is missing from body - should return 400', async () => {
            const req = mockRequest(
                { password: 'boss' },
            );
            const res = mockResponse();
            await create(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Invalid payload',
            });
        });

        test('password is missing from body - should return 400', async () => {
            const req = mockRequest(
                { email: 'garret@hireMe.com' },
            );
            const res = mockResponse();
            await create(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Invalid payload',
            });
        });

        test('valid payload, should create', async () => {
            const req = mockRequest(
                { email: 'tiago@hireMe.com', password: '123456' },
            );
            const res = mockResponse();
            await create(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
        });

    });

});
