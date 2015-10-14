(function pageLoad() {
  var riddleReq = new XMLHttpRequest();

  riddleReq.onreadystatechange = function() {
    if (riddleReq.readyState === 4 && riddleReq.status === 200) {
      var output = (riddleReq.responseText).replace(/%20/g, ' ')
      document.getElementById('riddle').innerHTML = JSON.parse(output);
    }
  }
  riddleReq.open('GET', '/riddle');
  riddleReq.send();
}());

document.getElementById('riddleAnswer').addEventListener('submit', function(e) {
  e.preventDefault();
  var answerReq = new XMLHttpRequest();
  var answer = document.getElementById('answer').value.toLowerCase();
  var riddle = document.getElementById('riddle').innerHTML;
  console.log('FROM USER >>>>>>', answer)

  answerReq.onreadystatechange = function() {
    if (answerReq.readyState === 4 && answerReq.status === 200) {
      var answerFromDb = (JSON.parse(answerReq.responseText).answer).replace(/%20/g, ' ')
     console.log('FROM DB >>>>>>>>', answerFromDb)
      if (answerFromDb === answer) {
        document.getElementById('correctAnswer').innerHTML = 'Correct!'
      } else {
        document.getElementById('correctAnswer').innerHTML = 'Try Again!'
      }
    }
  }
  answerReq.open('GET', '/answer/' + riddle);
  answerReq.send();
});
