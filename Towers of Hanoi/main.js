var hanoi = {};
hanoi.pegs = {
  leftPeg: [],
  middlePeg: [],
  rightPeg: []
};
hanoi.state = "unclicked";

hanoi.startGame = function() {
  this.totalBlocks = $("input").val();
  this.emptyBoard();
  this.fillBlocks();
};
hanoi.fillBlocks = function() {
  $tower1 = $("#tower-1");
  startBlocks = [];
  for (var i = 0; i < this.totalBlocks; i++) {
    this.pegs.leftPeg.push(i);
    startBlocks.push($("<div>", {id: "block"+i, class: "gamepiece"}));
    startBlocks[i].text(i+1);
  }
  $tower1.append(startBlocks);
};
hanoi.emptyBoard = function() {
  hanoi.pegs.leftPeg = [];
  hanoi.pegs.middlePeg = [];
  hanoi.pegs.rightPeg = [];
  hanoi.selectedBlock = null;
  hanoi.blockValue = null;
  $("#tower-1").empty();
  $("#tower-2").empty();
  $("#tower-3").empty();
};
hanoi.clearMove = function() {
  hanoi.selectedBlock = null;
  hanoi.blockValue = null;
  $(".gamepiece").removeClass("selected-piece");
};
hanoi.changeState = function() {
  hanoi.state = (hanoi.state === "unclicked" ? "clicked" : "unclicked");
};
hanoi.setBlock = function(destinationTower) {
  var $movedBlock = this.selectedTower.children(":first-child");
  if (this.checkBlockPlacement(destinationTower)) {
    this.pegs[destinationTower.attr("data")].unshift(this.blockValue);
    destinationTower.prepend($movedBlock.clone());
    $movedBlock.remove();
  } else {
    $("body").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    this.pegs[this.selectedTower.attr("data")].unshift(this.blockValue);
  }
  this.clearMove();
  this.changeState();
  this.checkWinner();
};
hanoi.checkBlockPlacement = function(destinationTower) {
  var nextBlock = this.pegs[destinationTower.attr("data")];
  return nextBlock.length === 0 || nextBlock[0] >= this.blockValue;
};
hanoi.checkWinner = function() {
  if (hanoi.pegs.rightPeg.length === Number(hanoi.totalBlocks)) {
    this.emptyBoard();
    this.displayWinner();
  }
};
hanoi.displayWinner = function() {
  var dark = $("<div>");
  dark.addClass("fade-black");
  $("body").prepend(dark);
  $("#winner-wrapper").slideDown(1500);
  $("#doc-win").on("click", function (event) {
    event.preventDefault();
    $("#winner-wrapper").hide();
    $(".fade-black").remove();
  });
};
hanoi.selectBlock = function(currentTower) {
  var towerData = this.pegs[currentTower.attr("data")];
  if (towerData.length !== 0) {
    this.selectedBlock = currentTower.children(':first-child');
    this.selectedBlock.toggleClass("selected-piece");
    this.blockValue = towerData.shift();
    this.selectedTower = currentTower;
    this.changeState();
  } else {
    this.clearMove();
  }
};

$(document).ready(function() {
  var stateSelect = {
    "unclicked": function($currentTower) {hanoi.selectBlock($currentTower);},
    "clicked": function($endTower) {hanoi.setBlock($endTower);}
  };
  $(".start-btn").on("click", function(event) {
    event.stopPropagation();
    event.preventDefault();
    hanoi.startGame();
  });
  $(".tower").on("click", function() {
    $currentTower = $(this).find(".tower-container");
    stateSelect[hanoi.state]($currentTower);
  });
});
