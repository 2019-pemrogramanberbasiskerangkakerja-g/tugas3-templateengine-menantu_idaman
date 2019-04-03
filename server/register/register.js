const users = require('../models').User;
const bcrypt = require('bcryptjs');
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
    async register(req, res) {
        var data = req.body;
        const query = 'INSERT INTO public.users (username, password) VALUES ($1, $2)'
        const params = [data.username, data.password]
        init.poolRemote.query(query, params)
	      .then(assertNotEmpty)
	      .then(_ => errorResponse(res, 'Username already exists'))
	      .catch(_ => successResponse(res))

        // return users
        //     .create({
        //         username: data.username,
        //         email: data.email,
        //         password: password_hash
        //     })
        //     .then(user => {return res.status(200).send('Register Success')})
        //     .catch(error => console.log(error));
    }

};