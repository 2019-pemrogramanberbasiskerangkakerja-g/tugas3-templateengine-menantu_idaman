const users = require('../models').User;
const jwtLogin = require('jwt-login');
const bcrypt = require('bcryptjs');
const httpMsgs = require("http-msgs");
const init = require('../config/init');

const errorResponse = (response, message) => {
    response.status(400).json({'result': message})
}

const successResponse = (response, message) => {
    if (message === null)
	message = 'Success'
    response.status(200).json({'result': message})
}

const assertNotEmpty = results => {
    if (results.rows.length == 0)
	throw "empty results"
    else
	return results
}

module.exports = {
    async login(req, res) {
        var data = req.body;
        var username = data.username;
        var password = data.password;

        const query = 'SELECT * FROM public.users WHERE username = $1 AND password = $2'
        const params = [username, password]

        init.pool.query(query, params)
        .catch(console.log)
        .then(assertNotEmpty)
        .then(_ => {
                const logQuery = `INSERT INTO public.logs (text) VALUES ('${username} logged in')`
            init.poolRemote.query(logQuery, [])
            init.pool.query(logQuery, [])
            successResponse(res)
        })
        .catch(_ => errorResponse(res, 'Invalid username and/or password'))

        // users
        //     .findOne({
        //         where: {username: user}
        //     })
        //     .then(async result => {
        //         if (!result) {
        //             return res.status(400).send('User not found'); 
        //         } else if(password == result.password) {
        //             jwtLogin.sign(req, res, user, 'topsecret', 1, false);
        //             // return res.status(200).send('Logged in'); 
        //         }
        //         else {
        //             return res.status(400).send('Auth failed. Wrong password.'); 
        //         }
        //     });
    },

    logout(req, res) {
        jwtLogin.signout(req, res, false);
    },

    valid_login(req, res, next){
        try {
            req.jwt = jwtLogin.validate_login(req, res);
            next();
        } catch (error) {
            httpMsgs.send500(req, res, error);
        }
    },
};