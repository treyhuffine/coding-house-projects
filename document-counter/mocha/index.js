var CH = {};

CH.operate = function(operator) {
  return function(a1, a2) {
    return eval(a1 + operator + a2);
  };
};

CH.sum = function(a, b) {
  // assert.deepEqual([4, 8], CH.sum([2, 2], [3, 5]));
  // a = [2,2] => 4 => sum(2,2) | sum.apply(null, [2,2])
  // b = [3,5] => 8
  // [4,8]

  // CH.sum.apply(null, everyArrayArgument)
  // CH.sum.apply(null, a)
  // CH.sum.apply(null, b)
  // [a, b] => [CH.sum.apply(null, a), CH.sum.apply(null, b)]

  // return arguments.map(function(oneArg) {
  //   return CH.sum.apply(null, oneArg);
  // });
  if (Array.isArray(arguments[0])) {
    return Array.prototype.map.call(arguments, function(oneArg) {
      return CH.sum.apply(null, oneArg);
    });
  }

  return Array.prototype.reduce.call(arguments, function(total, e) {
    return total + e || 0;
  }, 0);
}

module.exports = CH;
