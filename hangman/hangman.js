var game = {};

game.alphabet = [];
game.pressedLetters = [];
game.correctLetters = [];
game.lives = 10;
game.aCode = 65;


$(document).ready( function() {

  game.canvas = document.getElementById("hanging-man");

  // Initialize the game
  game.setLetters();
  game.fillLetters();
  game.showLives();
  game.chooseWord();
  game.setSpaces();

  //  Wait for letter press event
  $("body").on("keyup", function(event) {

    if (event.keyCode >= 65 && event.keyCode <= 90) {
      game.playGame(event.keyCode);
    }

  });

  $(".reset-button").on("click", function(event) {
    game.resetGame();
  });



});

game.fillLetters = function() {
  var newLetter;
  for (var i = 0; i < game.alphabet.length; i++) {
    newLetter = $("<li></li>");
    newLetter.addClass("letter").addClass(game.alphabet[i]).addClass("fresh-letter");
    newLetter.text(game.alphabet[i]);
    $(".letters-grid").append(newLetter);
  }

};

game.setLetters = function() {
  for (var i = 0; i < 26; i++) {
    game.alphabet[i] = String.fromCharCode(game.aCode + i);
  }
};

game.playGame = function(press) {
  // check if letter has been pressed
  // check if letter is inside stored array
  var letter = String.fromCharCode(press);

  if (game.pressedLetters.indexOf(letter) > -1) {
    $("body").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    return
  } else {
    game.pressedLetters.push(letter);
    $("." + letter).removeClass("fresh-letter").addClass("guess-letter");
    game.letterCheck(letter);
  }
};

game.resetGame = function() {
  game.lives = 10;
  $(".letter").removeClass("guess-letter").addClass("fresh-letter");
  $(".word-grid").empty();
  game.chooseWord();
  game.setSpaces();
  game.showLives();
  game.pressedLetters = [];
  game.correctLetters = [];
  $(".show-winner").hide();
  $(".show-loser").hide();
  game.canvas.width = game.canvas.width;
};

game.chooseWord = function() {
  game.currentWord = dictionary[ Math.floor( Math.random() * dictionary.length )].toUpperCase().split("");
};

game.setSpaces = function() {
  var newLetter;
  for (var i = 0; i < game.currentWord.length; i++) {
    newLetter = $("<li></li>");
    //newLetter.text(game.currentWord[i]);
    newLetter.addClass("outline").addClass("word-" + game.currentWord[i]);
    $(".word-grid").append(newLetter);
    $(".word-grid li:last-child").append($("<h2></h2>").text(game.currentWord[i]));
  }

  $(".word-grid h2").hide();
};

game.letterCheck = function(letter) {

  var tempLetters = game.getUnique(game.currentWord);

  if (game.lives <= 0 || game.correctLetters.length === tempLetters.length) {

    // alert("Game already over. Reset to play again!");
    // Remove alert - refactor if necessary since section of if statement is not used

  } else {


    if (game.currentWord.indexOf(letter) > -1) {

      $(".word-" + letter + " " + "h2").show();
      game.correctLetters.push(letter);

    } else {

      game.lives -= 1;
      game.showLives();
      game.drawCanvas();

    }

    if (game.correctLetters.length === tempLetters.length) {

      $(".game").hide();
      $("#canvas-wrapper").show();
      $("#doc-win").on("submit", function (event) {
        event.preventDefault();
        $("#canvas-wrapper").hide();
        $(".game").show();
      });
      $(".show-winner").show();

    } else if (game.lives <= 0) {

      var dark = $("<div></div>");
      dark.addClass("fade-black");
      $(".game").addClass("push-back");
      $("body").prepend(dark);
      $("#loser-wrapper").slideDown(1500);
      $("#doc-lose").on("submit", function (event) {
        event.preventDefault();
        $("#loser-wrapper").hide();
        $(".game").removeClass("push-back");
        $(".fade-black").remove();
      });
      $(".show-loser").text("You lose: word = " + game.currentWord.join("")).show();
    }
  }
};

game.showLives = function() {
  $("#lives h1").text("Lives = " + game.lives);
};

game.getUnique = function(arr) {
  var outArr = [],
      i;
  for (i = 0; i < arr.length; i++) {
    if (outArr.indexOf(arr[i]) === -1) {
      outArr.push(arr[i]);
    }
  }

  return outArr;
};

game.drawCanvas = function() {
  var c = game.canvas.getContext('2d'),
      beg,
      fin;
  game.canvas.width = game.canvas.width;

  if (game.lives < 10) {
    c.lineWidth = 5;
    c.strokeStyle = 'green';
    c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
    c.fillStyle = 'red';
    // draw the ground
    beg = [game.canvas.width*.25, game.canvas.height*.9];
    fin = [game.canvas.width*.75, beg[1]];
    game.drawLine(c, beg, fin);
  }
  if (game.lives < 9) {
    beg = [beg[0]+10, fin[1]]
    fin = [beg[0], game.canvas.height*.1];
    c.strokeStyle = '#A52A2A';
    game.drawLine(c, beg, fin);
  }
  if (game.lives < 8) {
    beg = [fin[0]-3, fin[1]];
    fin = [beg[0]+90, beg[1]]
    c.strokeStyle = '#A52A2A';
    game.drawLine(c, beg, fin);
  }
  if (game.lives < 7) {
    c.strokeStyle = 'black';
    c.lineWidth = 2;
    // draw rope
    beg = [fin[0]-5, fin[1]];
    fin = [beg[0], beg[1]+15]
    game.drawLine(c, beg, fin);
  }
  if (game.lives < 6) {
    c.beginPath();
    c.moveTo(fin[0]+15, fin[1]+15);
    c.arc(fin[0], fin[1]+15, 15, 0, (Math.PI/180)*360);
    c.stroke(); 
  }
  if (game.lives < 5) {
    beg = [fin[0], fin[1]+30];
    fin = [beg[0], beg[1]+40];
    game.drawLine(c, beg, fin);
  }
  if (game.lives < 4) {
    beg = fin;
    fin = [beg[0]+10, beg[1]+20];
    game.drawLine(c, beg, fin);
  }
  if (game.lives < 3) {
    fin = [beg[0]-10, beg[1]+20];
    game.drawLine(c, beg, fin);
  }
  if (game.lives < 2) {
    beg = [beg[0], beg[1]-20];
    fin = [beg[0]-10, beg[1]-10];
    game.drawLine(c, beg, fin);
  }
  if (game.lives < 1) {
    fin = [beg[0]+10, beg[1]-10];
    game.drawLine(c, beg, fin);
  }
};

game.drawLine = function(context, from, to) {
  context.beginPath();
  context.moveTo(from[0], from[1]);
  context.lineTo(to[0], to[1]);
  context.stroke();
};