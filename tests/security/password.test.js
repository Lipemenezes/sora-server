'use strict';

const passwordHandler = require('app/security/password');

describe('security -', () => {

    describe('password handler -', () => {

        test('hash password works', () => {
            const hashedPassword = passwordHandler.hashPassword('test');
            expect(hashedPassword.charAt(0)).toBe('$');
        });

        test('compare password returns true when matching', () => {
            const hashedPassword = passwordHandler.hashPassword('test');
            const compare = passwordHandler.comparePassword(hashedPassword, 'test');

            expect(compare).toBe(true);
        });

        test('compare password returns false when not matching', () => {
            const hashedPassword = passwordHandler.hashPassword('test');
            const compare = passwordHandler.comparePassword(hashedPassword, 'test1');

            expect(compare).toBe(false);
        });

    });

});
