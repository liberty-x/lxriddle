var test = require('tape');
var server = require('../handler.js');
var shot = require('shot');

test("check server is running", function(t){

var request = {
  method:'GET',
  url: '/'
};

  shot.inject(server.handler, request, function(res){
    var result = res.statusCode;
    var expected = 200;
    t.equal(expected, result, "server is up and running");
    t.end();
    server.client.quit();
  });
});
