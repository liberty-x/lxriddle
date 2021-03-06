  var http = require('http');
  var fs = require('fs');
  var app = require('./helpers.js');
  var client = require('./redis.js');
  var port = process.env.PORT || 8000;
  var index = fs.readFileSync(__dirname + '/public/index.html');

  function handler(req, res) {
    var url = req.url;
    console.log(req.method);
    console.log(url);

    if (url === '/') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(index);

    } else if (url.indexOf('.html') > -1 || url.indexOf('.css') > -1 || url.indexOf('.js') > -1 || url.indexOf('.ico') > -1) {
      var ext = url.split('.')[1];
      var file = fs.readFileSync(__dirname + url);
      res.writeHead(200, {'Content-Type': 'text/' + ext});
      res.end(file);

    } else if (url === '/riddle' || url.indexOf('/newriddle') > -1) {
      getRandomRiddle(function(err, obj) {
        if (err) {
          console.log(err);
        } else {
        console.log(obj);
        res.end(JSON.stringify(obj));
        }
      });

    } else if (url === '/auth'){
      app.authHandler(req,res);

    } else if (req.method === 'POST') {
      var postRiddle = (url.split('/')[1]).replace(/%20/g, ' ');
      var postAnswer = (url.split('/')[2]).replace(/%20/g, ' ');
      app.validate(req,res, riddleAddAndRespond);
      function riddleAddAndRespond(res){
        addToDb(postRiddle, postAnswer, function(err, reply) {
          if (err) {
            console.log(err);
          } else {
          res.end(reply);
          }
        });
      }

    } else if (url.indexOf('/answer') > -1) {
      var riddle = (url.split('/')[2]).replace(/%20/g, ' ');
      getAnswer(riddle, function (err, reply) {
        if (err) {
          console.log(err);
        } else {
        res.end(JSON.stringify(reply.answer));
        }
      });
    }
  }

  function create() {
    var server = http.createServer(handler).listen(port);
    console.log('Server running at http://' + port);
    var io = require('socket.io')(server);
    io.on('connection', manageConnection);

    function manageConnection(socket){
      console.log('a user connected');
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
      socket.on('chat message in', function(msg){
        console.log('message>>>>>>>', msg);
        io.emit('chat message out', msg);
      });
    }
  }

  function addToDb(riddle, answer, callback) {
    client.INCR('riddlecount', function(err, riddlecount) {
      if (err) {
        console.log(err);
      } else {
      client.HMSET(riddlecount, 'riddle', riddle, 'answer', answer, callback);
      }
    });
  }

  function getRandomRiddle(callback) {
    client.GET('riddlecount', function(err, reply) {
      var randomNumber = Math.floor(Math.random() * (reply - 2)) + 1;
      client.HGET(randomNumber, 'riddle', function(err, data) {
        if (err) {
          console.log(err);
        } else {
          var response = {
            ID: randomNumber,
            riddle: data
          };
          callback(err, response);
        }
      });
    });
  }

  function getAnswer(riddle, callback) {
    client.HGETALL(riddle, callback);
  }

  module.exports = {
    handler: handler,
    create: create,
    client: client,
    getAnswer : getAnswer,
    getRandomRiddle : getRandomRiddle,
    addToDb : addToDb,
    // manageConnection : manageConnection
  };
