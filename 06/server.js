'use strict';

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	switch (req.url) {
		case '/students':
			res.write('STUDENTS ');
			break;
		case '/courses':
			res.write('COURSES ')
			break;
		default:
			res.write('ERROR ');
	}
	res.end();
})

server.listen(3004);