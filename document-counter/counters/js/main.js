$(document).ready(function() {
  var updateUI = function(text) {
    var counts = Counter.count(text);
    $("#characters").text(counts.characters);
    $("#words").text(counts.words);
    $("#spaces").text(counts.spaces);
    $("#numbers").text(counts.numbers);
    $("#paragraphs").text(counts.paragraphs);
  };

  $("#data").on("keyup", function() {
    updateUI(this.value);
  });
});
