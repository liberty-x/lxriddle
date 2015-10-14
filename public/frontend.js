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
  var answer = document.getElementById('answer').value;
  var riddle = document.getElementById('riddle').innerHTML;
  console.log(answer, riddle)

  answerReq.onreadystatechange = function() {
    if (answerReq.readyState === 4 && answerReq.status === 200) {
      if (answerReq.responseText === answer) {
        document.getElementById('correctAnswer').innerHTML = 'Correct!'
      } else {
        document.getElementById('correctAnswer').innerHTML = 'Try Again!'
      }
    }
  }
  answerReq.open('GET', '/answer/' + riddle);
  answerReq.send();
});
