var Counter = {};

Counter.count = function(text) {
  var wordsMatch = text.split(/\s/g) || [],
      numbersMatch = text.match(/[0-9]/g) || [],
      spacesMatch = text.match(/\s/g) || [],
      paragraphMatch = text.split(/\n/) || [];
  return {
    characters: text.length,
    words: wordsMatch.filter(this.isWord).length,
    spaces: spacesMatch.length,
    numbers: numbersMatch.length,
    paragraphs: paragraphMatch.filter(this.isWord).length
  };
};

Counter.isWord = function(word) {
  return word.length > 0;
};

module.exports = Counter;
