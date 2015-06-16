var calculator = {};
calculator.currentValue = "";
calculator.storedValue = "";
calculator.currentOperator = "";
calculator.lastKey = "";
calculator.clearCount = 0;
calculator.shifted = false;

calculator.readButton = function(input) {
  var inputTest = input,
      displayValue;

  if (this.isValue(inputTest) || this.checkZeroPlacement(inputTest)) {
    this.checkNewInput();
    this.currentValue += inputTest;
  } else if (this.isDecimal(inputTest) &&
             !this.containsDecimal(this.currentValue)) {
    this.currentValue += inputTest;
  } else if (this.isOperator(inputTest)) {
    if (this.storedLengthCheck() && this.currentLengthCheck() &&
        !this.testEquals(this.lastKey)) {
      this.storedValue = this.evaluateOperator(this.currentOperator);
      this.currentValue = this.storedValue;
      this.displayText(this.storedValue);
      this.currentOperator = inputTest;
    } else if (this.storedLengthCheck()) {
      this.currentOperator = inputTest;
      this.currentValue = "";
    } else {
      this.storedValue = this.currentValue;
      this.currentValue = "";
      this.currentOperator = inputTest;
    }
  } else if (this.testEquals(inputTest)) {
    if (this.currentOperator.length > 0 &&
        this.storedLengthCheck() && this.currentLengthCheck()) {
      this.storedValue = this.evaluateOperator(this.currentOperator);
      this.displayText(this.storedValue);
    }
  }
  if (this.isPercent(inputTest)) {
    if (this.storedLengthCheck()) {
      this.storedValue = String(this.storedValue / 100);
      this.currentValue = "";
      this.currentOperator = "";
      this.displayText(this.storedValue);
    } else if (this.currentValue.length > 0) {
      this.currentValue = String(this.currentValue / 100);
      this.storedValue = "";
      this.currentOperator = "";
      this.displayText(this.storedValue);
    }
  }
  if (inputTest === "plus_minus") {
    if (this.storedValue.length > 0) {
      if (this.storedValue.indexOf("-") >= 0) {
        this.storedValue = this.storedValue.slice(1);
        this.currentValue = "";
        this.displayText(this.storedValue);
      } else {
        this.storedValue = "-" + this.storedValue;
        this.currentValue = "";
        this.displayText(this.storedValue);
      }
    } else if (this.currentValue.length > 0) {
      if (this.currentValue.indexOf("-") >= 0) {
        this.storedValue = this.currentValue.slice(1);
        this.currentValue = "";
        this.displayText(this.storedValue);
      } else {
        this.storedValue = "-" + this.currentValue;
        this.currentValue = "";
        this.displayText(this.storedValue);
      }
    }
  }
  if (this.checkClear(inputTest)) {
    this.clearVals();
  } else {
    this.clearCount = 0;
  }

  this.lastKey = inputTest;
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
calculator.isValue = function(input) {
  var testNumber = input.match(/[1-9]/) || "";
  return testNumber.length > 0;
};
calculator.checkZeroPlacement = function(input) {
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
calculator.isPercent = function(input) {
  return input === "%";
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
  var evaluatedExpression,
      num1 = +this.storedValue,
      num2 = +this.currentValue;
  evaluatedExpression = calculator.performOperation(operator)(num1, num2);
  return String(evaluatedExpression);
};
calculator.checkNewInput = function() {
  if (this.lastKey === "=" || this.isOperator(this.lastKey)) {
    this.currentValue = "";
    this.clearCount = 0;
  }
};
calculator.testEquals = function (input) {
  return input === "=";
};
calculator.checkClear = function(input) {
  return input === "AC";
};
calculator.clearVals = function () {
  if (this.clearCount === 0) {
    this.currentValue = "";
    this.currentOperator = "";
    this.clearCount += 1;
    this.displayText("0");
  } else {
    this.storedValue = "";
    this.currentValue = "";
    this.currentOperator = "";
    this.lastKey = "";
    this.clearCount = 0;
    this.displayText("0");
  }
};
calculator.storedLengthCheck = function() {
  return this.storedValue.length > 0;
};
calculator.currentLengthCheck = function() {
  return this.currentValue.length > 0;
};
calculator.checkASCIINumbers = function(event) {
  return (event >= 48 && event <= 57);
};
calculator.checkASCIISymbolsNoShift = function(event) {
  return [189, 190, 191, 187, 13].indexOf(event) >= 0;
};
calculator.checkASCIISymbolsShift = function(event) {
  return [53, 56, 187].indexOf(event) >= 0;
};
calculator.convertSymbols = function(event) {
  var convertTable = {
    "187": "61",
    "189": "45",
    "190": "46",
    "191": "47",
    "13": "61"
  };
  return convertTable[event];
};
calculator.convertShifted = function(event) {
  var convertTable = {
    "53": "37",
    "56": "42",
    "187": "43"
  };
  return convertTable[event];
};
calculator.onShift = function () {
  this.shifted ? this.shifted = false : this.shifted = true;
};
calculator.checkKeypressShifted = function(event) {
  var convertVal;
  if (this.checkASCIISymbolsShift(event)) {
    convertVal = this.convertShifted(event);
    this.readButton(String.fromCharCode(convertVal));
  }
};
calculator.checkKeypressNoShift = function(event) {
  var convertedVal;
  if (this.checkASCIINumbers(event)) {
    this.readButton(String.fromCharCode(event));
  }
  if (this.checkASCIISymbolsNoShift(event)) {
    convertedVal = this.convertSymbols(event);
    this.readButton(String.fromCharCode(convertedVal));
  }
};

$(document).ready(function() {
  calculator.displayText("0");
  // Check for shift hold
  $("body").on("keydown", function(event) {
    if (event.which === 16) {
      calculator.onShift();
    }
  });
  $("body").on("keyup", function(event) {
    if (event.which === 16) {
      calculator.onShift();
    }
  });
  // Check for keyboard press
  $("body").on("keyup", function(event) {
    if (calculator.shifted) {
      calculator.checkKeypressShifted(event.which);
    } else {
      calculator.checkKeypressNoShift(event.which);
      if (calculator.currentValue.length > 0 && calculator.lastKey !== "=") {
        calculator.displayText(calculator.currentValue);
      }
    }
    if (event.which === 27) {
      calculator.clearVals();
    }
  });
  // Gui press on screen
  $(".all-buttons").on("click", function() {
    calculator.readButton($(this).attr("id"));
    if (calculator.currentValue.length > 0 && calculator.lastKey !== "=") {
      calculator.displayText(calculator.currentValue);
    }
  });
});
