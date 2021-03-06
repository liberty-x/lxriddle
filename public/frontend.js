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
  var token = sessionStorage.getItem('token');
  e.preventDefault();
  if(!token){
    document.getElementById('riddleAdded').innerHTML = "Please login";
    return;
  }
  var riddleQuestion = document.getElementById("newRiddle").value;
  var riddleAnswer = document.getElementById("newRiddleAns").value.toLowerCase();
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.responseText);
      if (request.responseText === "OK") {
        document.getElementById("riddleAdded").innerHTML = "Thanks! We have added your riddle";
      } else {
        document.getElementById("riddleAdded").innerHTML = "Sorry there was an error, please try again.";
      }
    }
  };
  request.open("POST", "/" + riddleQuestion + "/" + riddleAnswer);
  request.setRequestHeader('authorisation', token);
  request.send();
});

document.getElementById('auth').addEventListener('submit', function(e) {
  e.preventDefault();
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var obj = {
    'username' : username,
    'password' : password
  };
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var token = request.getResponseHeader('authorisation');
      sessionStorage.setItem('token', token);
        document.getElementById('loginResponse').innerHTML = request.responseText;
      } else {
        document.getElementById('loginResponse').innerHTML = request.responseText;
      }
    };
    request.open('POST', '/auth');
    request.send(JSON.stringify(obj));
  });

  var socket = io();
  var messages = document.getElementById('socketioMessages');


  document.getElementById('chatForm').addEventListener('submit', function(e) {
    var input = document.getElementById('messageInput');
    e.preventDefault();
    if ((input.value).match(/</g)) {
        messages.innerHTML = 'Please do not script inject our site. Thank you.';
    } else {
    socket.emit('chat message in', input.value);
    input.value = '';
    }
  });
    socket.on('chat message out', function(msg) {
    messages.innerHTML += ("<li>" + msg + "</li>");
  });
