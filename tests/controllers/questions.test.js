'use strict';

const server = require('../../server');

describe('questions', () => {

    const authHeader = {
        Authorization: null,
    };

    beforeAll(async () => {
        await dbBuilder.fromScratch();
    });

    // user 1 | felipe | skill,level = 1,1  2,1 | house 1 | lipe.menezes@live.com
    // user 2 | garret | skill,level = 1,3  2,2 | house 1 | garrett@soraschools.com
    // user 3 | tiago  | skill,level = 1,4  2,3 | house 2 | tiago@soraschools.com
    // user 4 | garret2| faculty_member_skills = 1,3

    describe('whoToAsk', async () => {
        const URL = '/questions/whoToAsk?';

        test('max level reached for skill, returns faculty member', async () => {
            const token = jwt.generateToken(3);
            authHeader.Authorization = `Bearer ${token}`;

            const res = await request(server)
                .get(URL + 'skillId=1')
                .set(authHeader);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({
                data: [
                    {
                        user_id: 4,
                        first_name: 'Garret',
                        last_name: 'Smiley',
                        role: 'faculty_member',
                    },
                ],
            });
        });

        test('prioritize same house students even if someone has a higher level', async () => {
            const token = jwt.generateToken(1);
            authHeader.Authorization = `Bearer ${token}`;

            const res = await request(server)
                .get(URL + 'skillId=1')
                .set(authHeader);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({
                data: [
                    {
                        user_id: 2,
                        first_name: 'Garret',
                        last_name: 'Smiley',
                        role: 'student',
                    },
                    {
                        user_id: 3,
                        first_name: 'Tiago',
                        last_name: 'Peixoto',
                        role: 'student',
                    },
                ],
            });
        });

        test('only suggest students level 3 or more', async () => {
            const token = jwt.generateToken(1);
            authHeader.Authorization = `Bearer ${token}`;

            const res = await request(server)
                .get(URL + 'skillId=2')
                .set(authHeader);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({
                data: [
                    {
                        user_id: 3,
                        first_name: 'Tiago',
                        last_name: 'Peixoto',
                        role: 'student',
                    },
                ],
            });
        });

        test('if can not find the skill for the astudent, returns 400 and info', async () => {
            const token = jwt.generateToken(1);
            authHeader.Authorization = `Bearer ${token}`;

            const res = await request(server)
                .get(URL + 'skillId=3')
                .set(authHeader);

            expect(res.statusCode).toEqual(400);
            expect(res.body).toEqual({
                error: 'Could not find the match for student and skill',
            });
        });
    });

});
