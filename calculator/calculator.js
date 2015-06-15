var calculator = {};
calculator.currentValue = "";
calculator.previousValue = "";
calculator.currentOperator = "";
calculator.lastKey = "";
calculator.clearCount = 0;

calculator.readButton = function(input) {
  var inputTest = input.attr("id"),
    displayValue;

  if (this.isValue(inputTest) || this.zeroTest(inputTest)) {
    this.checkNewInput();
    this.currentValue += inputTest;
  } else if (this.isDecimal(inputTest) &&
             !this.containsDecimal(this.currentValue)) {
    this.currentValue += inputTest;
  } else if (this.isOperator(inputTest)) {
    if (this.previousValue.length > 0 && this.currentValue.length > 0 &&
        this.lastKey !== "=") {
      this.previousValue = this.evaluateOperator(calculator.currentOperator);
      this.currentValue = "";
      this.displayText(this.previousValue);
      this.currentOperator = inputTest;
    } else if (this.previousValue.length > 0) {
      this.currentOperator = inputTest;
      this.currentValue = "";
    } else {
      this.previousValue = this.currentValue;
      this.currentValue = "";
      this.currentOperator = inputTest;
    }
  } else if (this.testEquals(inputTest)) {
    if (this.currentOperator.length > 0 &&
        this.previousValue.length > 0 && this.currentValue.length > 0) {
      this.previousValue = this.evaluateOperator(this.currentOperator);
      this.displayText(this.previousValue);
    }
  } else if (inputTest === "sqrt") {
    if (this.currentValue.length > 0 && +this.currentValue > 0) {
      this.currentValue = String(Math.sqrt(this.currentValue));
      this.previousValue = "";
      this.currentOperator = "";
    }
  }
  if (inputTest === "plus_minus") {
    console.log("In plus-minus");
    if (this.currentValue.length > 0) {
      if (this.currentValue.indexOf("-") >= 0) {
        this.currentValue = this.currentValue.slice(1);
      } else {
        console.log("add minus");
        this.currentValue = "-" + this.currentValue;
      }
    } else if (this.previousValue.length > 0) {
      if (this.currentValue.indexOf("-") >= 0) {
        this.previousValue = this.previousValue.slice(1);
      } else {
        console.log("add minus");
        this.previousValue = "-" + this.previousValue;
      }
    }
  }
  if (this.checkClear(inputTest)) {
    this.clearVals();
  } else {
    this.clearCount = 0;
  }
  console.log("Current val", this.currentValue);
  console.log("Prev val", this.previousValue);
  console.log("Op", this.currentOperator);
  console.log("Key", this.lastKey);

  this.lastKey = inputTest;
};
calculator.isValue = function(input) {
  var testNumber = input.match(/[1-9]/) || "";
  return testNumber.length > 0;
};
calculator.zeroTest = function(input) {
  var testZero = input.match(/0/) || "";
  return (this.currentValue.length > 0 && testZero.length > 0 ? true : false);
};
calculator.isDecimal = function(input) {
  var testDecimal = input.match(/\./) || "";
  return testDecimal.length > 0;
};
calculator.containsDecimal = function(input) {
  return input.indexOf(".") >= 0;
};
calculator.isOperator = function(input) {
  var testOperator = input.match(/\+|\-|\*|\//) || "";
  return testOperator.length > 0;
};
calculator.displayText = function (text) {
  var $displayText = $(".display-text"),
      displayValue = text || "0";
  if (displayValue.length > 9) {
    $displayText.text(displayValue.slice(0,10) + "...");
  } else {
    $displayText.text(displayValue);
  }
};
calculator.evaluateOperator = function(operator) {
  var evaluatedExpression;
  evaluatedExpression = calculator.performOperation(operator)(+this.previousValue, +this.currentValue);
  return String(evaluatedExpression);
};
calculator.performOperation = function(operator) {
  var operatorFcns = {
    "+": function(a, b) { return a + b; },
    "-": function(a, b) { return a - b; },
    "*": function(a, b) { return a * b; },
    "/": function(a, b) { return a / b; }
  };
  return operatorFcns[operator];
};
calculator.checkNewInput = function() {
  if (calculator.lastKey === "=") {
    this.currentValue = "";
    calculator.clearCount = 0;
  }
};
calculator.testEquals = function (input) {
  return input === "=";
};
calculator.checkClear = function(input) {
  return input === "AC";
};
calculator.clearVals = function () {
  if (calculator.clearCount === 0) {
    calculator.currentValue = "";
    calculator.currentOperator = "";
    calculator.clearCount += 1;
    calculator.displayText("0");
  } else {
    calculator.previousValue = "";
    calculator.currentValue = "";
    calculator.currentOperator = "";
    calculator.lastKey = "";
    calculator.clearCount = 0;
    calculator.displayText("0");
  }
};

$(document).ready(function() {
  calculator.displayText("0");
  $(".all-buttons").on("click", function() {
    calculator.readButton($(this));
    console.log("loop current", calculator.currentValue);
    if (calculator.currentValue.length > 0 && calculator.lastKey !== "=") {
      calculator.displayText(calculator.currentValue);
    }
  });
});
