var fs = require("fs");
var jwt = require("jsonwebtoken");
var secret = process.env.JWT_SECRET || "banana";
var uuid = require("uuid");
var client = require("./redis.js");

var u = {un: "dummy", pw: "123"}; //  hardcoded username (un) & password (pw) (database)

function authHandler(req, res){ //takes in un and pw submission from frontend
  console.log(req.url);
  if (req.method === "POST"){
    var body = "";
    req.on("data", function(data){
      body += data;
    });
    req.on("end", function(){
            console.log(body);
      var post = JSON.parse(body);
      if (post.username && post.username === u.un && post.password && post.password === u.pw) { // checking if un & pw match with dummy 123
        return authSuccess(req, res); // if it matches, run authSuccess
      } else {
        return authFail(res); // if it fails, run authFail
      }
    });
  }
}

function authSuccess(req, res) { // if un & pw match, create a JWT token and store it in the header of the response
  var token = generateAndStoreToken(req);
  res.writeHead(200, {
    "Content-Type" : "text.html",
    "authorisation" : token
  });
  return res.end("Logged In!");
}

function authFail(res, callback){ // if un & pw don't match, send back 401 (permission denied)
  res.writeHead(401, {"Content-Type" : "text.html"});
  return res.end("Please login or sign up");
}

function generateAndStoreToken(req){
  var id = generateGUID(); // generates unique user id for that session (link between DB record and JTW token)
  var token = generateToken(req, id); // generates a JWT token for that session
  var record = { // record that gets stored in the DB for that session
    "valid" : true,
    "created" : new Date().getTime()
  };
  client.SET(id, JSON.stringify(record), function(err, reply){ // store the ID and record as a key value pair in the DB
    console.log("REDIS err >>>>>", err, "REDIS reply >>>>>", reply);
  });

  return token;
}

function generateGUID(){
  return uuid.v1();
}

function generateToken(req, id){ // generates JWT token and attaches 'secret' to it
  var token = jwt.sign({
    auth : id, // link between record and JWT token
    agent : req.headers["user-agent"]
  }, secret);
  return token;
}

function validate(req, res, callback){ // deals with incoming requests that have a JWT token in the header
  var token = req.headers.authorisation; // accesses token in the header
  var decoded = verify(token); // checkes token against DB key value pair (id: record)
  if (!decoded || !decoded.auth){
    authFail(res);

  } else {

    client.GET(decoded.auth, function(err, record){ // gets the auth property of the record stored in the DB based on the information in the JWT token
      var r;
      try {
        r = JSON.parse(record);
      } catch (e) {
        r = { valid : false };
      }
       if (err || !r.valid) {
         authFail(res);
       } else {
         return callback(res); // callback is riddleAddAndRespond in the handler.js file under url.method = post
       }
    });
  }
}

function verify(token){
  var decoded = false;
  try {
    decoded = jwt.verify(token, secret); // decodes jwt token back into obj in lines 61-64
  } catch (e) {
    decoded = false;
  }
  return decoded;
}

module.exports = {
  authHandler : authHandler,
  authSuccess : authSuccess,
  authFail : authFail,
  generateAndStoreToken : generateAndStoreToken,
  validate : validate,
  verify : verify,
};
