var expect = require("chai").expect;
var permsObj = require("./perms.js");
perms = permsObj.translateNumbersToWords;

describe("calculate", function() {
  it("works for 1", function() {
    expect(perms("1")).to.deep.equal(["1"]);
  });
  it("works for 12 and 21", function() {
    expect(perms("12")).to.deep.equal(["1a", "1b", "1c", "12"]);
    expect(perms("21")).to.deep.equal(["a1", "b1", "c1", "21"]);
  });
  it("works for 34", function() {
    expect(perms("34")).to.deep.equal([
      "dg", "dh", "di", "d4",
      "eg", "eh", "ei", "e4",
      "fg", "fh", "fi", "f4",
      "3g", "3h", "3i", "34"
    ]);
  });
  it("works for 342", function() {
    expect(perms("342")).to.include.members(["dhb", "f4a", "342"]);
  });
  it("works for 3420", function() {
    expect(perms("3420")).to.include.members(["dhb0", "f4a0", "3420"]);
  });
});
