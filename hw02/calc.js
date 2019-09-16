/* Java eval learned about here: https://www.w3schools.com/jsref/jsref_eval.asp */

(function () {
 
  "use strict";

  /* the current mathematical function */
  var expression = "0";
  var currDisplay = "0";

  /* the object that will be updated to display on the calculator */
  var display = document.getElementById("display");

  /*
   * name: setInput
   * returns: nothing
   * parameter: num (a number string)
   * does: if the expression is blank set the expression
   *      otherwise concatenate the number.
   */
  function setInput(num) {
    if (expression === "0") {
      expression = num;
    } else {
      expression = expression.concat(num);
    }
  }
  

  /*
   * name: isLastOperator
   * parameter: none
   * returns: true if the last character in the expression
   *          is an operator, false otherwise
   * does: checks if the last character is an operator
   */
  function isLastOperator() {
    // checks if the last character is -, +, /, or *
    if (expression.charAt(expression.length-1) === "-" ||
        expression.charAt(expression.length-1) === "*" ||
        expression.charAt(expression.length-1) === "/" ||
        expression.charAt(expression.length-1) === "+") {
  
      return true;
    }

    return false;
  }
  

  /*
   * name: containsOperator
   * parameters: none
   * returns: true if the expression contains an operator
   *          false otherwise
   * does: iterates through the expression string and
   *      searches for an operator (+, -, /, *)
   */
  function containsOperator() {
    for (var i = 0; i < expression.length; i++) { 
      if (expression.charAt(i) === "+" ||
          expression.charAt(i) === "-" ||
          expression.charAt(i) === "/" ||
          expression.charAt(i) === "*") {
    
        return true;
      }
    }

    return false;
  }

  /*
   * name: evaluateExpression
   * parameters: none
   * returns: a number if the expression can be evaluated,
   *          null otherwise
   * does: tries to evaluate the expression and returns the
   *      result if it can, otherwise returns null
   */
  function evaluateExpression() {
    var result = null;
    try {
      result = eval(expression);
      return result;
    } catch (error) {
      return result;
    }
  }
  
  
  /*
   * name: changeDisplay
   * parameter: num (a number string)
   * returns: nothing
   * does: sets the expression string and updates the calculator
   *      display with num added
   */
  function changeDisplay(num) {
    // if the calculator has just been opened
    // replace the 0 with whatever number has been
    // pressed
    if (expression === "0") {
      expression = num;
      currDisplay = num;
      display.innerHTML = num;
    }

    // if the expression ends with an operator
    // concatenate the number and set the
    // currDisplay to the number and update
    // the calculator display
    else if (isLastOperator()){
      expression = expression.concat(num);
      currDisplay = num;
      display.innerHTML = currDisplay;
    }
  
    // otherwise concatenate the number
    // to the expression and the current display
    // and update the calculator's display
    else {
      expression = expression.concat(num);
      currDisplay = currDisplay.concat(num);
      display.innerHTML = currDisplay;
    }

  }

  /*
   * name: tryToEvaluate
   * parameters: none
   * returns: true if possible to evaluate, false otherwise
   *          (note: eval() works on a single number, but
   *          this method considers a single number not
   *          possible to evaluate)
   * does: checks if there exists an operator in the expression
   *      if there is, we try to evaluate it and if we can evaluate it
   *      we update the expression and the currDisplay and display the
   *      result.
   */
  function tryToEvaluate() {
    
    // if there's an operator
    if (containsOperator()) {
      
      // try to evaluate
      var result = evaluateExpression();
      if (result != null) {
        expression = "" + result;
        currDisplay = "" + result;
        display.innerHTML = result;
        return true;
      }
    }
    return false;
  }
  

  /*
   * name: addEquals
   * parameters: none
   * returns: nothing
   * does: checks if it's appropriate to add an addition
   *      symbol or if it makes sense to carry out the current
   *      mathematical equation
   */
  function addEquals() {
    if (!isLastOperator()) {
      var success = tryToEvaluate();
      if (!success) {
        expression = expression.concat("+");
      }
    }
  }
  

  /*
   * name: sub
   * parameters: none
   * returns: nothing
   * does: checks if the last character
   *      in the expression string is a "-"
   *      and if not, updates the expression
   *      and display
   */
  function sub() {
    if (!isLastOperator()) {
      var success = tryToEvaluate();

      if (!success) {
        if (!isLastOperator()) {
          expression = expression.concat("-");  
        } 
      }
      else {
        expression = expression.concat("-");
      }
    }
  }

  /*
   * name: mul
   * parameters: none
   * returns: nothing
   * does: checks if the last character
   *      in the expression string is a "*"
   *      and if not, updates the expression
   *      and display
   */
  function mul() { 
    if (!isLastOperator()) {
      var success = tryToEvaluate();
      
      if (!success){
        if (!isLastOperator()) {
          expression = expression.concat("*");
        }
      }

      else {
        expression = expression.concat("*");
      }
    }
  }


  /*
   * name: div
   * parameters: none
   * returns: nothing
   * does: checks if the last character
   *      in the expression string is a "/"
   *      and if not, updates the expression
   *      and display
   */
  function div() {
    if (!isLastOperator()) {
      var success = tryToEvaluate();
      
      if (!success) {  
        if (!isLastOperator()) {
          expression = expression.concat("/");
        }
      }

      else {
        expression = expression.concat("/");
      }
    }
  }


  /*
   * name: dec
   * parameters: none
   * returns: nothing
   * does: checks if the current number
   *      on the display contains a decimal.
   *      if it doesn't, it checks if the last
   *      character in the expression is a number
   *      and if not, it adds a 0 before the decimal.
   *
   *      This means that you will have x-0.y instead
   *      of x-.y
   */
  function dec() {
    if (!currDisplay.includes(".")) {
      if (isLastOperator()) {
        changeDisplay("0.");
      } else {
        changeDisplay(".");
      }
    }
  }


  /*
   * name: clear
   * parameters: none
   * returns: nothing
   * does: sets the expression to 0 and updates the display.
   */
  function clear() {
    expression = "0";
    currDisplay = "0";
    display.innerHTML = expression;
  }
 


  /*
   * name: addListeners
   * parameters: none
   * returns: nothing
   * does: sets up the event listeners for
   *      all buttons on the calculator. Runs
   *      automatically when the page is loaded.
   */
  (function addListeners() {
    document.getElementById("9").addEventListener("click", 
                                function() {changeDisplay("9")});

    document.getElementById("8").addEventListener("click", 
                                function() {changeDisplay("8")});

    document.getElementById("7").addEventListener("click", 
                                function() {changeDisplay("7")});

    document.getElementById("6").addEventListener("click", 
                                function() {changeDisplay("6")});

    document.getElementById("5").addEventListener("click",
                                function() {changeDisplay("5")});

    document.getElementById("4").addEventListener("click", 
                                function() {changeDisplay("4")});

    document.getElementById("3").addEventListener("click", 
                                function() {changeDisplay("3")});

    document.getElementById("2").addEventListener("click", 
                                function() {changeDisplay("2")});

    document.getElementById("1").addEventListener("click", 
                                function() {changeDisplay("1")});

    document.getElementById("0").addEventListener("click", 
                                function() {changeDisplay("0")});
    
    document.getElementById("+=").addEventListener("click", addEquals);
    document.getElementById("-").addEventListener("click", sub);
    document.getElementById("/").addEventListener("click", div);
    document.getElementById("x").addEventListener("click", mul);
    document.getElementById(".").addEventListener("click", dec);
    document.getElementById("c").addEventListener("click", clear);
  })();

})();
