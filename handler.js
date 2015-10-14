var serve = (function() {
  var http = require('http');
  var fs = require('fs');
  var redis = require('redis');
  // remeber to add redis deets to var client for heroku
  var client = redis.createClient();
  var port = process.env.PORT || 8000;
  var index = fs.readFileSync(__dirname + '/public/index.html')

  function handler(req, res) {
    var url = req.url;
    console.log(req.method);
    console.log(url)
    if (url === '/') {
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end(index);
    } else if (url.indexOf('.') > -1) {
      var ext = url.split('.')[1]
      var file = fs.readFileSync(__dirname + url)
      res.writeHead(200, {'Content-Type': 'text/' + ext})
      res.end(file);
    } else if (url === '/riddle'){
      client.RANDOMKEY(function (err, obj){
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.end(JSON.stringify(obj));
      });
    } else if (req.method === 'POST'){
      var riddle = url.split('/')[1]
      var answer = url.split('/')[2]
      addToDb(riddle, answer, function(err, reply){
        res.end(reply);
      });

    }
  }
//
  function create() {
    http.createServer(handler).listen(port);
    console.log('Server running at http://' + port);
  }


  function addToDb(riddle, answer, callback){
    client.HMSET(riddle, 'answer', answer, callback);
  }



  return {
    handler: handler,
    create: create,
    client: client
  }
}());

module.exports = serve
