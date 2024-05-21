'use strict';

const http = require('http');
const port = 3003;
let counter = 0;

const server = http.createServer((req, res) => {
	if (req.url !== 'favicon.ico'){
		counter++;
		res.write('it kamasutra: ' + counter)
	}
	res.end();
})
server.listen(port);