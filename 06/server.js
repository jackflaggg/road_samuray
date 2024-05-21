'use strict';

const http = require('http');
const fs = require('fs');

const server =  http.createServer((req, res) => {
	switch (req.url) {
		case '/about': {
			const data = fs.readFileSync('pages/about.html');
			res.write(data);
			res.end();
			break;
		}
		case '/home': {
			const data = fs.readFileSync('pages/home.html');
			res.write(data);
			res.end();
			break;
		}
		default: {
			res.write('ERROR ');
			res.end();
		}
	}
})

server.listen(3004);