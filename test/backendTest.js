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
  });
});

test('Is the correct answer for the riddle retrieved from the database', function(t){
  var request = {
    method: 'GET',
    url: '/answer/What%20goes%20down%20but%20never%20goes%20up'
  }

  shot.inject(server.handler, request, function(res){
    var result = res.payload;
    var expected = '{"answer":"rain"}'
    t.equal(expected, result, 'Correct answer has been retrieved');
    t.end();
  })
})

test('Is a random riddle being generated', function(t){
  var request = {
    method: 'GET',
    url: '/riddle'
  }

  shot.inject(server.handler, request, function(res){
    var result = res.statusCode;
    var expected = 200
    t.equal(expected, result, 'Random riddle has been generated');
    t.end();
    server.client.quit();
  })
})
