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
        document.getElementById("riddleAdded").innerHTML = "Sorry there was an error, please try again.";
      }
    }
  };
  request.open("POST", "/" + riddleQuestion + "/" + riddleAnswer);
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
        document.getElementById('loginResponse').innerHTML = 'Logged In!';
      } else {
        document.getElementById('loginResponse').innerHTML = 'Please Log in';
      }
    };
    request.open('GET', '/auth');
    request.send(JSON.stringify(obj));
  });
