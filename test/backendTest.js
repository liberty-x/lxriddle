var test = require('tape');
var server = require('../handler.js');
var shot = require('shot');

test('check server is running', function(t){

  var request = {
    method:'GET',
    url: '/'
  };

  shot.inject(server.handler, request, function(res){
    var result = res.statusCode;
    var expected = 200;
    t.equal(expected, result, 'server is up and running');
    t.end();
  });
});


test('check handler can process files', function(t){

  var request = {
    method:'GET',
    url: '/public/style.css'
  };

  shot.inject(server.handler, request, function(res){
    var result = res.statusCode;
    var expected = 200;
    t.equal(expected, result, 'handler ready to process files');
    t.end();
  });
});

test('has the riddle been posted to the database', function(t){
  var request = {
    method: 'POST',
    url: '/' + 'What goes down but never goes up' + '/' + 'rain'
  }

  shot.inject(server.handler, request, function(res){
    var result = res.payload;
    var expected = 'OK'
    t.equal(expected, result, 'Riddle is posted to DB');
    t.end();
    server.client.quit();
  });
});
