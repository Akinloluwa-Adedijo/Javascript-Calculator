class Calculator {
    constructor(previousOperationTextElement, currentOperationTextElement) {
      this.previousOperationTextElement = previousOperationTextElement;
      this.currentOperationTextElement = currentOperationTextElement;
      this.clear();
    }
  
    // clearing numbers on the calculator screen
    clear() {
      this.currentOperation = "";
      this.previousOperation = "";
      this.operation = undefined;
    }
  
    // appending a number when it is clicked on
    appendNumber(number) {
      // prevents multiple decimal points
      if (number === "." && this.currentOperation.includes(".")) {
        return;
      }
      this.currentOperation =
        this.currentOperation.toString() + number.toString();
    }
  
    //determing which operation to perform based on the one clicked
    chooseOperation(operation) {
      if (this.currentOperation === "") {
        return;
      }
      if (this.previousOperation !== "") {
        this.compute();
      }
      this.operation = operation;
      this.previousOperation = this.currentOperation;
      this.currentOperation = "";
    }
  
    // computing the operation
    compute() {
      let answer;
      const previous = parseFloat(this.previousOperation);
      let current = parseFloat(this.currentOperation);
      if (isNaN(previous) || isNaN(current)) {
        return;
      }
  
      switch (this.operation) {
        case "+":
          answer = previous + current;
          break;
        case "-":
          answer = previous - current;
          break;
        case "X":
          answer = previous * current;
          break;
        case "/":
          answer = previous / current;
          break;
        default:
          return;
      }
  
      this.currentOperation = answer;
      this.operation = undefined;
      this.previousOperation = "";
    }
    switch() {
      if (this.currentOperation === "") {
        return;
      }
  
      let switchCurrent = parseFloat(this.currentOperation);
      switchCurrent = switchCurrent * -1;
      this.currentOperation = switchCurrent;
      this.operation = undefined;
      this.previousOperation = "";
    }
  
    // updating the display
    updateDisplay() {
      this.currentOperationTextElement.innerText = this.currentOperation;
      this.previousOperationTextElement.innerText = this.previousOperation;
    }
  }
  
  // selecting the Buttons and Text elements of the Calculator
  const numberButtons = document.querySelectorAll("[data-numbers]");
  const operationButtons = document.querySelectorAll("[data-operation]");
  const equalsButton = document.querySelector("[data-equals]");
  const clearButton = document.querySelector("[data-all-clear]");
  const switchButton = document.querySelector("[data-operation-switch");
  const previousOperationTextElement = document.querySelector(
    "[data-previous-operation]"
  );
  const currentOperationTextElement = document.querySelector(
    "[data-current-operation]"
  );
  
  const calculator = new Calculator(
    previousOperationTextElement,
    currentOperationTextElement
  );
  
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  equalsButton.addEventListener("click", (button) => {
    calculator.compute();
    calculator.updateDisplay();
  });
  
  clearButton.addEventListener("click", (button) => {
    calculator.clear();
    calculator.updateDisplay();
  });
  
  switchButton.addEventListener("click", (button) => {
    calculator.switch();
    calculator.updateDisplay();
  });
  