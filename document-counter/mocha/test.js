var assert = require("assert");
var expect = require('chai').expect;
var CH = require("./index.js");

describe('CH', function() {
  describe("Cade's funky operate", function() {
    it("operates", function() {
      assert.equal(4, CH.operate('+')(2,2));
      expect(CH.operate('+')(2,2)).to.equal(4);
      assert.equal(1, CH.operate('-')(5,4));
      assert.equal(12, CH.operate('*')(4,3));
      assert.equal(2, CH.operate('/')(4,2));
    });
  });

  describe('the sum function', function() {
    it("returns the sum of its X arguments", function() {
      assert.equal(7, CH.sum(3, 4));
      assert.equal(-1, CH.sum(0, -1));
      assert.equal(-1, CH.sum(2, -1, 1, -1, 2, -2, -2));
      assert.equal(-1, CH.sum.apply(null, [2, -1, 1, -1, 2, -2, -2]));
      assert.equal(-1, CH.sum.call(null, 2, -1, 1, -1, 2, -2, -2));
    });
    it("returns zero when no arguments are present", function() {
      assert.equal(0, CH.sum());
    });
    it("returns one argument if the other is missing", function() {
      assert.equal(3, CH.sum(3));
      assert.equal(3, CH.sum(undefined, 3));
      assert.equal(3, CH.sum(null, 3));
      assert.equal(3, CH.sum(NaN, 3));
      assert.equal(3, CH.sum(false, 3));
      assert.equal(3, CH.sum("", 3));
    });
    it("returns an array that sums individually passed arrays", function() {
      assert.deepEqual([4, 8], CH.sum([2, 2], [3, 5]));
      assert.deepEqual([16, 8],
                       CH.sum([2, 2, 2, 2, 2, 2, 2, 2], [3, 5, 1, -1, 1, -1]));
    });
  });
});
