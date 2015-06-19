var FB = {};

FB.ref = new Firebase("https://tic-tac-toe-trey.firebaseio.com/");
FB.gameRef = FB.ref.child("game");
FB.gridRef = FB.gameRef.child("grid");
FB.turnRef = FB.gameRef.child("turn");
FB.playersRef = FB.gameRef.child("players");

$(document).ready(function() {
  var clickedCell, currentMark;
  setCellHeight();
  $("#login").on("click", function() {
    FB.ref.authWithOAuthPopup("twitter", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  });
  $("#new-game").on("click", function() {
    Game.setNewBoard();
  });
  if (Game.checkNewGame()) {
    Game.setNewBoard();
  }
  $(window).resize(setCellHeight);
  $(".cell").on("click", function() {
          currentMark = Game.currentMark(),
          cw = $(".cell").width(),
          fw = cw - .15 * cw;
      $(".marker").css({'font-size': fw+'px'});
      var $th = $(this), $newMarker;
      if (currentMark && Game.playersTurn(currentMark) && Game.emptySpot($th)) {
        $th = $(this);
        $newMarker = $th.find(".marker").text(currentMark).addClass(currentMark);
        $newMarker.css({'font-size': fw+'px'});
        $th.append($newMarker);
        Game.setPieceArray($th, currentMark);
        FB.gridRef.update(Game.board);
        Game.changeTurn();
      }
  });
});

var Game = {};
function setCellHeight() {
  var cw = $(".cell").width(),
      fw = Number(cw) - .15 * cw;
  $(".cell").css({'height': cw+'px'});
  $(".marker").css({'font-size': fw+'px'});
}
Game.rowLabels = ["a", "b", "c"];
Game.board = {a: [0,0,0], b: [0,0,0], c: [0,0,0]};
Game.setNewBoard = function() {
  console.log("NEW BOARD SET");
  Game.board = {a: [0,0,0], b: [0,0,0], c: [0,0,0]};
  FB.gridRef.set(Game.board);
  FB.turnRef.set({});
  Game.currentTurn = "x";
  FB.turnRef.update({turn: this.currentTurn});
  $(".your-turn").removeClass("your-turn");
  if (this.currentTurn === "x") {
    $("#first-player").addClass("your-turn");
  } else {
    $("#second-player").addClass("your-turn");
  }
  $(".marker").empty();
  $(".marker").removeClass("x o");
};
Game.checkNewGame = function() {
  for (var i = 0; i < 3; i++) {
    if (Game.board[Game.rowLabels[i]].indexOf(1) > -1 || Game.board[Game.rowLabels[i]].indexOf(-1) > -1) {
      return false;
    }
  }
  console.log("no new game");
  return true;
};
Game.setPieceArray = function(currentCell, currentMark) {
  var letter = currentCell.attr("data-letter"),
      number = currentCell.attr("data-number");
  var boardSet = {
    "x": Game.setX,
    "o": Game.setO
  };
  boardSet[currentMark](letter, number);
};
Game.setX = function(letter, number) {
  Game.board[letter][number] = +1;
};
Game.setO = function(letter, number) {
  Game.board[letter][number] = -1;
};
Game.checkWin = function() {
  this.checkRowWin();
  this.checkColumnWin();
  this.checkDiagonalWin();
  this.checkDraw();
};
Game.checkDraw = function() {
  for (var letter = 0; letter < 3; letter++) {
    var counter = 0;
    for (var number = 0; number < 3; number++) {
      counter += Game.board[Game.rowLabels[letter]][number];
    }
    if (counter === 3 || counter === -3) {
      Game.win(counter);
    }
  }
};
Game.checkRowWin = function() {
  for (var letter = 0; letter < 3; letter++) {
    if (Game.board[Game.rowLabels[letter]].indexOf(0) > -1) {
      return;
    }
  }
  alert("It's a draw!! You both lose...");
  Game.setNewBoard();
};
Game.checkColumnWin = function() {
  for (var number = 0; number < 3; number++) {
    var counter = 0;
    for (var letter = 0; letter < 3; letter++) {
      counter += Game.board[Game.rowLabels[letter]][number];
    }
    if (counter === 3 || counter === -3) {
      Game.win(counter);
    }
  }
};
Game.checkDiagonalWin = function() {
  Game.checkDiagonal1();
  Game.checkDiagonal2();
};
Game.checkDiagonal1 = function() {
  var diagTest = Game.board["a"]["0"] + Game.board["b"]["1"] + Game.board["c"]["2"];
  if (diagTest === 3 || diagTest === -3) {
    Game.win(diagTest);
  }
};
Game.checkDiagonal2 = function() {
  var diagTest = Game.board["a"]["2"] + Game.board["b"]["1"] + Game.board["c"]["0"];
  if (diagTest === 3 || diagTest === -3) {
    Game.win(diagTest);
  }
};
Game.xWins = function() {
  alert("Winner winner chicken dinner! - X wins");
  Game.setNewBoard();
};
Game.oWins = function() {
  alert("THE WOOO SAYS - O wins");
  Game.setNewBoard();
};
Game.gameWinner = {
    "3": Game.xWins,
    "-3": Game.oWins
};
Game.win = function(winner) {
  Game.gameWinner[winner]();
};
Game.currentMark = function() {
  if (Game.x === Game.currentUsername) {
    return 'x';
  }
  if (Game.o === Game.currentUsername) {
    return 'o';
  }
  return null;
};
Game.changeTurn = function() {
  this.currentTurn = (this.currentTurn === "x" ? "o" : "x");
  FB.turnRef.update({turn: this.currentTurn});
  $(".your-turn").removeClass("your-turn");
  if (this.currentTurn === "x") {
    $("#first-player").addClass("your-turn");
  } else {
    $("#second-player").addClass("your-turn");
  }
};
Game.playersTurn = function(mark) {
  return mark === Game.currentTurn;
};
Game.emptySpot = function(currentCell) {
  var letter = currentCell.attr("data-letter"),
      number = currentCell.attr("data-number");
  return Game.board[letter][number] === 0;
};
Game.fillGrid = function(grid) {
  Game.board = grid;
  for (var letter in Game.board) {
    for (var number = 0; number < 3; number++) {
      var $currentCell = $("#" + letter + number).find(".marker");
      if (Game.board[letter][number] === 1) {
        $currentCell.addClass("x").text("x");
      }
      if (Game.board[letter][number] === -1) {
        $currentCell.addClass("o").text("o");
      }
    }
  }
  Game.checkWin();
};
Game.nextPlayer = function() {
  console.log("THIS X", this.x);
  if (!this.x) {
    return 'x';
  }
  if (!this.o && Game.x !== Game.currentUsername) {
    return 'o';
  }
  return null;
};

FB.playersRef.on("value", assignPlayers);
FB.gridRef.on("value", redrawGrid);
FB.turnRef.on("value", storeLastMark);

function storeLastMark(snap) {
  if(snap.val()) {
    Game.currentTurn = snap.val().turn;
  }
}

function assignPlayers(snap) {
  var players = snap.val();
  if (!players) {
    return;
  }
  if (players) {
    Game.players = players;
    Game.x = players.x;
    Game.o = players.o;
    $("#first-player").text(Game.players.x + " - X");
    $("#second-player").text(Game.players.o + " - O");
  }
}

function redrawGrid(snap) {
  var grid = snap.val(), mark;
  if (grid) {
    Game.fillGrid(grid);
  }
}

FB.ref.onAuth(function(authData) {
  console.log("Auth:", authData);
  if (authData) {
    FB.playersRef.once("value", function(snap) {
      assignPlayers(snap);
      Game.currentUsername = authData.twitter.username;
      var options = {}, nextPlayer = Game.nextPlayer();
      if (nextPlayer) {
        options[nextPlayer] = Game.currentUsername;
        FB.playersRef.update(options);
      }
    });
  }
});

function getName(authData) {
  switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
  }
}
