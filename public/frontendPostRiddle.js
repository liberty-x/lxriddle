document.getElementById('postRiddle').addEventListener('submit', function(e) {
  console.log('one');
  e.preventDefault();
  var postRiddleReq = new XMLHttpRequest();
  var riddleQuestion = document.getElementById('newRiddle').value;
  var riddleAnswer = document.getElementById('newRiddleAns').value.toLowerCase();
  console.log(riddleAnswer, riddleQuestion);

  postRiddleReq.onreadystatechange = function() {
    if (postRiddleReq.readyState === 4 && postRiddleReq.status === 200) {
      if (postRiddleReq.responseText === 'OK') {
        document.getElementById('riddleAdded').innerHTML = 'Thanks we have added your riddle';
      } else {
        document.getElementById('riddleAdded').innerHTML = 'Sorry there was an error, please try again.';
      }
    }
  };
  postRiddleReq.open('POST', '/' + riddleQuestion + '/' + riddleAnswer);
  postRiddleReq.send();
});
