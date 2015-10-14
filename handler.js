var serve = (function() {
  var http = require('http');
  var fs = require('fs');
  var port = process.env.PORT || 8000;
  var index = fs.readFileSync(__dirname + '/public/index.html')

  function handler(req, res) {
    var url = req.url;
    console.log(url);
    if (url === '/') {
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end(index);
    } else if (url.indexOf('.') > -1) {
      var ext = url.split('.')[1]
      var file = fs.readFileSync(__dirname + url)
      res.writeHead(200, {'Content-Type': 'text/' + ext})
      res.end(file);
    }
  }

  function create() {
    http.createServer(handler).listen(port);
    console.log('Server running at http://' + port);
  }

  return {
    handler: handler,
    create: create
  }
}());

module.exports = serve
