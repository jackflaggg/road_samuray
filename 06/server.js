'use strict';

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	switch (req.url) {
		case '/students':
			const data= 'best';
			const start = new Date();

			while (new Date() - start <= 5000) {
				console.log(new Date() - start)
			}
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