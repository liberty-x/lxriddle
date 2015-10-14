(function pageLoad(){
  var riddleReq = new XMLHttpRequest();

  riddleReq.onreadystatechange = function(){
    if (riddleReq.readyState === 4 && riddleReq.status === 200){
      document.getElementById('riddle').innerHTML = riddleReq.responseText;
    }
  }
  riddleReq.open('GET', '/riddle');
  riddleReq.send();
}());

document.getElementById('postRiddle').addEventListener('submit', function (e){
    console.log('one');
    e.preventDefault();
    var postRiddleReq = new XMLHttpRequest();
    var riddleQuestion = document.getElementById('newRiddle').value;
    var riddleAnswer = document.getElementById('newRiddleAns').value;

    postRiddleReq.onreadystatechange = function(){
      if (postRiddleReq.readyState === 4 && postRiddleReq.status === 200){
        if(postRiddleReq.responseText === 'OK') {
          document.getElementById('riddleAdded').innerHTML = "Thanks we have added your riddle"
        } else{
          document.getElementById('riddleAdded').innerHTML = "Sorry there was an error, please try again."
        }
      }
    }
    postRiddleReq.open('POST', '/' + riddleQuestion + '/' + riddleAnswer);
    postRiddleReq.send();
})

// var jwt = require('jsonwebtoken');
//
// function createJWT(input){
//   var username = document.getElementById('username').value;
//   var password = document.getElementById('password').value;
//   var obj = {
//     'username': username;
//     'password': password
//   }
//
//   var token = jwt.sign(obj, 'shhhh');
//
// }
