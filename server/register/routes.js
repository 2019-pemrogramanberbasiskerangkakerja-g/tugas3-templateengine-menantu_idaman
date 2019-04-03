const register = require('../register/register');

module.exports = (app) => {
    app.post('/register', register.register);
};