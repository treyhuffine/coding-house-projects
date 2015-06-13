var expect = require('chai').expect;
var Counter = require("../counters/js/counter.js");

var counts1 = Counter.count("TDD for the win");
var counts2 = Counter.count("and BDD is better, y0");
var counts3 = Counter.count("");
var counts4 = Counter.count("hi\nlet's code\n\n\n\nit's fun");

describe("Counter", function() {
  describe("count", function() {
    it("counts characters", function() {
      expect(counts1.characters).to.equal(15);
      expect(counts2.characters).to.equal(21);
      expect(counts3.characters).to.equal(0);
      expect(counts4.characters).to.equal(25);
    });
    it("counts words", function() {
      expect(counts1.words).to.equal(4);
      expect(counts2.words).to.equal(5);
      expect(counts3.words).to.equal(0);
      expect(counts4.words).to.equal(5);
    });
    it("counts spaces", function() {
      expect(counts1.spaces).to.equal(3);
      expect(counts2.spaces).to.equal(4);
      expect(counts3.spaces).to.equal(0);
      expect(counts4.spaces).to.equal(7);
    });
    it("counts numbers", function() {
      expect(counts1.numbers).to.equal(0);
      expect(counts2.numbers).to.equal(1);
      expect(counts3.numbers).to.equal(0);
      expect(counts4.numbers).to.equal(0);
    });
    it("counts paragraphs", function() {
      expect(counts1.paragraphs).to.equal(1);
      expect(counts2.paragraphs).to.equal(1);
      expect(counts3.paragraphs).to.equal(0);
      expect(counts4.paragraphs).to.equal(3);
    });
  });
});
