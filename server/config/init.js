const Pool = require('pg-pool')

module.exports.pool = new Pool({
	user: 'pbkk',
	host: 'localhost',
	database: 'pbkk',
	password: 'nuzulcarrykita',
	port: 5432,
})

module.exports.poolRemote = new Pool({
		user: 'pbkk',
		host: '0.tcp.ngrok.io',
		database: 'pbkk',
		password: 'nuzulcarrykita',
		port: 19345,
	})