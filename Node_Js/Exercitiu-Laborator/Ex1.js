var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type' : 'text/plain'});
  res.write(req.url);
  res.end('\n Hello World!\n');
}).listen(8080);