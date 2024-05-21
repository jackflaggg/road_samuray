'use strict';

const http = require('http');
const port = 3003;
let counter = 0;

const server = http.createServer((req, res) => {
	if (req.url !== 'favicon.ico'){
		counter++;
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
	}
	res.end();
})
server.listen(port);