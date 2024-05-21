'use strict';

const http = require('http');

const server = http.createServer((req, res) => {
	res.write('it kamasutra')
	res.end();
})
server.listen(3003);