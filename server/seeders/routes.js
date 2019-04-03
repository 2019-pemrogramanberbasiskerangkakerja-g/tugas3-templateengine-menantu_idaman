const user = require('./user');

module.exports = (app) => {
    app.get('/seed_user', user.seed);    
};