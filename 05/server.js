'use strict';

const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
	res.write('it kamasutra')
	res.end();
})
server.listen(port);