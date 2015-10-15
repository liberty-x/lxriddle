var request = new XMLHttpRequest();

(function pageLoad() {
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var output = (request.responseText)
      document.getElementById('riddle').innerHTML = JSON.parse(output);
    }
  }
  request.open('GET', '/riddle');
  request.send();
}());

document.getElementById('riddleAnswer').addEventListener('submit', function(e) {
  e.preventDefault();
  var answer = document.getElementById('answer').value.toLowerCase();
  var riddle = document.getElementById('riddle').innerHTML;
  console.log('FROM USER >>>>>>', answer)

  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var answerFromDb = (JSON.parse(request.responseText)).answer
     console.log('FROM DB >>>>>>>>', answerFromDb)
      if (answerFromDb === answer) {
        document.getElementById('correctAnswer').innerHTML = 'Correct!'
      } else {
        document.getElementById('correctAnswer').innerHTML = 'Try Again!'
      }
    }
  }
  request.open('GET', '/answer/' + riddle);
  request.send();
});

document.getElementById('next').addEventListener('click', function(){
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var output = (request.responseText)
      document.getElementById('riddle').innerHTML = JSON.parse(output);
    }
  }
  request.open('GET', '/newriddle');
  request.send();
})
