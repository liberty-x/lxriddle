var fs = require("fs");
var qs = require("querystring");
var redis = require("redis");
var client = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});
var jwt = require("jsonwebtoken");
var secret = process.env.JWT_SECRET || "banana";
var guid = require('guid');

var u = {un: 'dummy', pw: '123'};

function authHandler(req, res){
  console.log(req.url);
  if (req.method === 'POST'){
    var body = '';
    req.on('data', function(data){
      body += data;
    });
    req.on('end', function(){
            console.log(body);
      var post = JSON.parse(body);
      if (post.username && post.username === u.un && post.password && post.password === u.pw) {
        return authSuccess(req, res);
      } else {
        return authFail(res);
      }
    });
  }
}

function authSuccess(req, res) {
  var token = generateAndStoreToken(req);
  res.writeHead(200, {
    'Content-Type' : 'text.html',
    'authorisation' : token
  });
  return res.end("Logged In!");
}

function authFail(res, callback){
  res.writeHead(401, {'Content-Type' : 'text.html'});
  return res.end("username: dummy pw: 123");
}

function generateAndStoreToken(req){
  var id = generateGUID();
  var token = generateToken(req, id);
  var record = {
    "valid" : true,
    "created" : new Date().getTime()
  };
  client.SET(id, JSON.stringify(record), function(err, reply){
    console.log('REDIS err >>>>>', err, 'REDIS reply >>>>>', reply);
  });

  return token;
}

function generateGUID(){
  var id = guid.create();
  console.log(id);
  return id
}

function generateToken(req, id){
  var token = jwt.sign({
    auth : id,
    agent : req.headers['user-agent']
  }, secret);
  return token;
}

function validate(req, res, callback){
  var token = req.headers.authorisation;
    console.log("token", req.headers);
  var decoded = verify(token);
  if (!decoded || !decoded.auth){
    authFail(res);
    return callback(res);

  } else {

    client.GET(decoded.auth, function(err, record){
      var r;
      try {
        r = JSON.parse(record);
      } catch (e) {
        r = { valid : false };
      }
       if (err || !r.valid) {
         authFail(res);
         return callback(res);
       } else {
         confidential(res, token);
         return callback(res);
       }
    });
  }
}

function verify(token){
  var decoded = false;
  try {
    decoded = jwt.verify(token, secret);
  } catch (e) {
    decoded = false;
  }
  return decoded;
}

function confidential(res, token){
  res.writeHead(200, {
    'Content-Type' : 'text/html',
    'authorisation' :  token
  });
  return res.end("Verified");
}

function done(res){
  return;
}

module.exports = {
  authHandler : authHandler,
  authSuccess : authSuccess,
  authFail : authFail,
  done: done,
  generateAndStoreToken : generateAndStoreToken,
  validate : validate,
  verify : verify
};
