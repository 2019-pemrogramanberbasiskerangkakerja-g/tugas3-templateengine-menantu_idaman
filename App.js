const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Server = require('synceddb-server');
const login = require('./server/login/login');
const httpMsgs = require("http-msgs");
const https = require('https');
const fs = require("fs");
const http = require("http");

const options = {
	key: fs.readFileSync('./privatekey.pem'),
	cert: fs.readFileSync('./certificate.pem')
};

const app = express();
const server = http.createServer(app);
const secure_server = https.createServer(options, app);
const sdbPersistence = require('synceddb-persistence-memory');
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/web'));

require('./server/seeders/routes')(app);
require('./server/login/routes')(app);
require('./server/register/routes')(app);

app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to menantu_idaman Server',
}));

app.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname + '/web/login.html'));
});

app.get('/register', function(req, res) {
	res.sendFile(path.join(__dirname + '/web/register.html'));
});

app.get('/home', login.valid_login, (req, res) => res.status(200).send({
    message: 'you are authenticated',
}));

sdbPersistence.create().then(function(p) {
	new Server({
		port: 8080,
		store: p,
	});
});	

const port = 1212;

app.set('port', port);

server.listen(port);
secure_server.listen(1213);

module.exports = app;