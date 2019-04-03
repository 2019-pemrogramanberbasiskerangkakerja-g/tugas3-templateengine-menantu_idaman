const login = require('../login/login');

module.exports = (app) => {
    app.post('/login', login.login);
    app.get('/logout', login.logout);
};