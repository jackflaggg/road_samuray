'use strict';

const http = require('http');
const port = 3003;
let counter = 0;

const server = http.createServer((req, res) => {
	if (req.url !== 'favicon.ico'){
		counter++;
		console.log(req.url);

		switch (req.url) {
			case '/students':
				console.log(req.url === '/students');
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