'use strict';

const validator = require('../../app/utils/validations');

describe('validations -', () => {

    describe('e-mail format -', () => {

        const run = fixture => {
            expect(
                validator.isValidEmail(fixture.email),
            ).toBe(fixture.expected);
        };

        test('without @ returns false', () => {
            run({ email: 'test.com', expected: false });
        });

        test('without prefix returns false', () => {
            run({ email: '@test.com', expected: false });
        });

        test('without suffix returns false', () => {
            run({ email: 'test@', expected: false });
        });

        test('with invalid suffix returns false', () => {
            run({ email: 'test@.com', expected: false });
        });

        test('with valid prefix, @, and suffix, returns true', () => {
            run({ email: 'test@a.com', expected: true });
        });

    });

});
