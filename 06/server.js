'use strict';

const http = require('http');

const server =  http.createServer((req, res) => {
	switch (req.url) {
		case '/students':
			setTimeout(() => {
				const data = 'STUDENTS '
				res.write(data);
				res.end();
			}, 3000);
			break;
		default:
			res.write('ERROR ');
			res.end();
	}

})

server.listen(3004);