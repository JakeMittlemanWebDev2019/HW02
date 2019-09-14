/* Java eval learned about here: https://www.w3schools.com/jsref/jsref_eval.asp */

(function () {
 
  "use strict";

  /* the current mathematical function */
  var input1 = "0";

  /* the object that will be updated to display on the calculator */
  var display = document.getElementById("display");

  /*
   * name: setInput
   * returns: nothing
   * parameter: num (a number string)
   * does: if the input is blank set the input
   *      otherwise concatenate the number.
   */
  function setInput(num) {
    if (input1 === "0") {
      input1 = num;
    } else {
      input1 = input1.concat(num);
    }
  }


  /*
   * name: isLastOperator
   * parameter: none
   * returns: true if the last character in the input
   *          is an operator, false otherwise
   * does: checks if the last character is an operator
   */
  function isLastOperator() { 
    
    // checks if the last character is -, +, /, or *
    if (input1.charAt(input1.length-1) === "-" ||
        input1.charAt(input1.length-1) === "*" ||
        input1.charAt(input1.length-1) === "/" ||
        input1.charAt(input1.length-1) === "+") {
  
      return true;
    }

    return false;
  }

  
  /*
   * name: changeDisplay
   * parameter: num (a number string)
   * returns: nothing
   * does: sets the input string and updates the calculator
   *      display with num added
   */
  function changeDisplay(num) {
    setInput(num);
    display.innerHTML = input1;
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

    /*
     * Basically what happens here is we check if
     * there's an operator (+, -, /, *) and if we
     * find one, we try to evaluate. If for some reason
     * it doesn't work (like "4 + 3 +") we just do nothing
     * otherwise we evaluate the current equation
     */
    
    // iterate through the input string
    // and check if there's an operator
    for (var i = 0; i < input1.length; i++) {
      if (input1.charAt(i) === "+" ||
          input1.charAt(i) === "-" ||
          input1.charAt(i) === "/" ||
          input1.charAt(i) === "*") {
      


          try {
        
            // try to evaluate the current input
            // and update the display
            var newVal = eval(input1);
            input1 = "" + newVal;
            display.innerHTML = input1;
            return;

            // otherwise do nothing
          } catch (error) {
            return;
          }
      }
    }

    // if no operator was found add a + sign
    // so if there's just a number.
    changeDisplay("+");
  }


  /*
   * name: sub
   * parameters: none
   * returns: nothing
   * does: checks if the last character
   *      in the input string is a "-"
   *      and if not, updates the input
   *      and display
   */
  function sub() {
    if (!isLastOperator()) {
      changeDisplay("-");  
    }
  }


  /*
   * name: mul
   * parameters: none
   * returns: nothing
   * does: checks if the last character
   *      in the input string is a "*"
   *      and if not, updates the input
   *      and display
   */
  function mul() {
    if (!isLastOperator()) {
      changeDisplay("*");
    }
  }


  /*
   * name: div
   * parameters: none
   * returns: nothing
   * does: checks if the last character
   *      in the input string is a "/"
   *      and if not, updates the input
   *      and display
   */
  function div() {
    if (!isLastOperator()) {
      changeDisplay("/");
    }
  }


  /*
   * name: dec
   * parameters: none
   * returns: nothing
   * does: finds if there's a decimal point
   *      after the most recent operator. If
   *      so, does nothing. Otherwise it adds
   *      either "0." if the last character is
   *      an operator (so that it's -0.x instead
   *      of -.x) or "." if the last character
   *      is a number.
   */
  function dec() {

    // start the index at the last character
    var index = input1.length-1;

    // search backwards through the input string for
    // an operator. If we find one, update index
    // and break the search (we only need the most recent
    // operator.)
    for (var i = input1.length-1; i >=0; i--) {
      if (input1.charAt(i) === "+" ||
          input1.charAt(i) === "-" ||
          input1.charAt(i) === "/" ||
          input1.charAt(i) === "*") {
    

        index = i;
        break;
      }
      
      // if we find a decimal before finding an operator
      // then we can't add a new decimal point
      else if (input1.charAt(i) === ".") {
        return;
      }

    }

    // if the last character is an operator (+. -. *, /)
    // add a 0 before the decimal, otherwise just add
    // the decimal
    if (isLastOperator()) {
      changeDisplay("0.");
    } else {
      changeDisplay(".");
    }
  }


  /*
   * name: clear
   * parameters: none
   * returns: nothing
   * does: sets the input to 0 and updates the display.
   */
  function clear() {
    input1 = "0";
    display.innerHTML = input1;
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
