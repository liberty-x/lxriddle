var request = new XMLHttpRequest();

(function pageLoad() {
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var output = (request.responseText);
      document.getElementById('riddle').innerHTML = (JSON.parse(output)).riddle;
      riddleId = ((JSON.parse(output)).ID);
    }
  };
  request.open('GET', '/riddle');
  request.send();
}());

document.getElementById('riddleAnswer').addEventListener('submit', function(e) {
  e.preventDefault();
  var answer = document.getElementById('answer').value.toLowerCase();

  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var answerFromDb = (JSON.parse(request.responseText));
     console.log('FROM DB >>>>>>>>', answerFromDb);
      if (answerFromDb === answer) {
        document.getElementById('correctAnswer').innerHTML = 'Correct!';
      } else {
        document.getElementById('correctAnswer').innerHTML = 'Try Again!';
      }
    }
  };
  request.open('GET', '/answer/' + riddleId);
  request.send();
});

document.getElementById('next').addEventListener('click', function(){
  document.getElementById('correctAnswer').innerHTML = '';
  document.getElementById('answer').value = '';
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var output = (request.responseText);
      document.getElementById('riddle').innerHTML = (JSON.parse(output)).riddle;
      riddleId = ((JSON.parse(output)).ID);
    }
  };
  request.open('GET', '/newriddle');
  request.send();
});

document.getElementById("postRiddle").addEventListener("submit", function(e) {
  console.log("one");
  e.preventDefault();
  var riddleQuestion = document.getElementById("newRiddle").value;
  var riddleAnswer = document.getElementById("newRiddleAns").value.toLowerCase();
  console.log(riddleAnswer, riddleQuestion);

  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      if (request.responseText === "OK") {
        document.getElementById("riddleAdded").innerHTML = "Thanks we have added your riddle";
      } else {
        document.getElementById("riddleAdded").innerHTML = "Sorry, you need to log in to post a riddle.";
      }
    }
  };
  request.open("POST", "/" + riddleQuestion + "/" + riddleAnswer);
  request.setRequestHeader('authorisation', token);
  request.send();
});

document.getElementById('auth').addEventListener('submit', function(e) {
  e.preventDefault();
  var auth = new XMLHttpRequest();
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var obj = {
    'username': username,
    'password': password
  };
  auth.onreadystatechange = function() {
    if (auth.readyState === 4 && auth.status === 200) {
      var token = auth.getResponseHeader('authorisation');
      document.getElementById('loginResponse').innerHTML = auth.responseText;
      console.log(token);
    }
    else {
      document.getElementById('loginResponse').innerHTML = auth.responseText;
    }
  };
  auth.open('POST', '/auth');
  auth.send(JSON.stringify(obj));
});

// var socket = io();
// var messages = document.getElementById('socketioMessages');
// document.getElementById('chatForm').addEventListener('submit', function(e) {
//   var input = document.getElementById('messageInput');
//   console.log(input.value);
//   e.preventDefault();
//   socket.emit('chat message in', input.value);
//   input.value = '';
// });
// socket.on('chat message out', function(msg) {
//   messages.innerHTML += ("<li>" + msg + "</li>");
// });
