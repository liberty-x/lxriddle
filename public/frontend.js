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

var socket = io();
var messages = document.getElementById('socketioMessages');
document.getElementById('chatForm').addEventListener('submit', function(e) {
  var input = document.getElementById('messageInput');
  console.log(input.value);
  e.preventDefault();
  socket.emit('chat message in', input.value);
  input.value = '';
});
  socket.on('chat message out', function(msg) {
  messages.innerHTML += ("<li>" + msg + "</li>");
});
