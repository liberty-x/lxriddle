var iframe = document.getElementById('iframe');
var target = iframe.contentDocument || iframe.contentWindow.document;
var evt = document.createEvent("KeyboardEvent");

// to pass this test you need to hardcode a value of "answer" into the input tag in index.html
test("answer value is logged", function(assert){
  var initial = target.getElementById('answer').value;
  var result = (function pressEnter(e) {
      return initial;
      }(evt.initKeyboardEvent(13)));
  var expected = 'answer';
  assert.equal(result,expected, "congrats!");
});
