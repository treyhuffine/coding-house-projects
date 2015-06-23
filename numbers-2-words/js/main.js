var n2w = angular.module("number2words", []);

function n2wctrl($scope, $sce) {
  $scope.words = [];
  $scope.wordsLeft = [];
  $scope.wordsMiddle = [];
  $scope.wordsRight = [];
  $scope.phoneNumber = "";
  $scope.digitWord = "";
  $scope.convertLetters = "";
  $scope.showFilter = false;
  translateNumbersToWords = PERMS.translateNumbersToWords;
  numCases = PERMS.numCases;
  convertWordToNumbers = PERMS.convertWordToNumbers;

  var setDisplayArrays = function() {
    var len = Math.floor($scope.words.length / 3);
    $scope.wordsLeft = $scope.words.slice(0,len);
    $scope.wordsMiddle = $scope.words.slice(len, $scope.words.length - len);
    $scope.wordsRight = $scope.words.slice($scope.words.length - len);
  };
  $scope.processNumber = function() {
    $scope.showFilter = true;
    $scope.words = [];
    var phoneNumber = $scope.phoneNumber.match(/[\d]/g);
    var newWords = translateNumbersToWords(phoneNumber);
    $scope.words = newWords
                    .filter(function(word) {
                      return !word.match(/[a-z][0-9]+[a-z]/);
                    })
                    .filter(function(word) {
                      if (word.match(/[a-z]/g)) {
                        return word.match(/[a-z]/g).length > 1;
                      }
                    })
                    .map(function(word) {
                        return {text: word,
                                html: $sce.trustAsHtml(word.replace(/([a-z]+)/g, '<span>$1</span>'))};
                    });
    setDisplayArrays();
  };
  $scope.setDigits = function() {
    $scope.digitWord = convertWordToNumbers($scope.convertLetters);
  };
}

n2w.controller("n2wCtrl", n2wctrl);
