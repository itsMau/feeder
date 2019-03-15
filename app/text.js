const http = require('http'), 
	  fs = require('fs'),
	  url = require('url');

const hostname = '127.0.0.1';
const port = 9000;




const server = http.createServer(function(request, response){
	/* var path = url.parse(request.url).pathname;*/
	
	response.statusCode = 200;
	
	fs.readFile(__dirname+'/index.html', function(err, file) {  
		if(err) {  
			console.log(err);
			return;  
		}  
		response.setHeader('Content-Type', 'text/html');
		response.end(file, "utf-8");
	});
	
	
	
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});