'use strict';

const server = require('../../server');

describe('skills', () => {

    const authHeader = {
        Authorization: null,
    };

    beforeAll(async () => {
        await dbBuilder.fromScratch();
    });

    // user 1 | skill,level = 1,1  2,1

    describe('getByStudent', async () => {

        test('returns student skills based on jwt', async () => {
            const token = jwt.generateToken(1);
            authHeader.Authorization = `Bearer ${token}`;

            const res = await request(server)
                .get('/skills/getByStudent')
                .set(authHeader);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({
                data: [
                    {
                        user_id: 1,
                        skill_id: 1,
                        skill_level: 1,
                        name: 'Software Engineering',
                    },
                    {
                        user_id: 1,
                        skill_id: 2,
                        skill_level: 1,
                        name: 'Product Management',
                    },
                ],
            });
        });

    });

});
