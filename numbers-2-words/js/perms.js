var PERMS = {};
PERMS.numCases = {
  "1": ["1"],
  "2": ["a","b","c","2"],
  "3": ["d","e","f","3"],
  "4": ["g","h","i","4"],
  "5": ["j","k","l","5"],
  "6": ["m","n","o","6"],
  "7": ["p","q","r","s","7"],
  "8": ["t","u","v","8"],
  "9": ["w","x","y","z","9"],
  "0": ["0"]
};
PERMS.translateNumbersToWords = function(numString) {
  var currentNumCases = numCases[numString[0]];

  if (numString.length === 1) {
    return currentNumCases;
  }

  var cases = [],
      remainingCases = translateNumbersToWords(numString.slice(1));

  currentNumCases.forEach(function(currentStr) {
    remainingCases.forEach(function(remainingStr) {
      cases.push(currentStr + remainingStr);
    });
  });
  return cases;

};
PERMS.convertWordToNumbers = function(word) {
  var wordAsNumber = "",
      wordArray = word.split("");
  wordArray.forEach(function(letter) {
    var currentLetter = "";
    for (var i = 0; i < 10; i++) {
      if (PERMS.numCases[i].indexOf(letter.toLowerCase()) > -1) {
        currentLetter = String(i);
      }
    }
    wordAsNumber += currentLetter || letter;
  });
  return wordAsNumber;
};
// module.export = PERMS;
