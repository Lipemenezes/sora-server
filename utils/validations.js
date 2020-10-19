'use strict';

module.exports = {

    isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    },

};
