import React, { useState } from "react";
import "./App.css";
import { evaluate } from "mathjs";

const evaluateFormula = (formula) => {
  return evaluate(formula);
};

function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [formula, setFormula] = useState("");
  const [evaluated, setEvaluated] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
  };

  const handleNumberClick = (value) => {
    if (displayValue === "0" || evaluated) {
      setDisplayValue(value);
      setEvaluated(false);
    } else {
      setDisplayValue(displayValue + value);
    }
  };

  const handleDecimalClick = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const handleClearClick = () => {
    setDisplayValue("0");
    setFormula("");
    setEvaluated(false);
    setLastAction(null);
  };

  const handleOperatorClick = (operator) => {
    if (evaluated) {
      setFormula(displayValue + operator);
      setDisplayValue("0");
      setEvaluated(false);
    } else {
      const lastCharIsOperator = /[+\/*-]$/.test(formula);

      if (operator === "-" && lastCharIsOperator) {
        setDisplayValue("-");
      } else {
        if (lastCharIsOperator && operator !== "-") {
          setFormula(formula.slice(0, -1) + operator);
        } else {
          setFormula(formula + displayValue + operator);
        }
        setDisplayValue("0");
      }
    }

    setLastAction(operator);
  };

  const handleEqualsClick = () => {
    try {
      if (evaluated) {
        setFormula(displayValue);
      } else {
        let evalFormula = formula;
        if (evaluated) {
          evalFormula = formula.replace(/=.*$/, "");
        }

        evalFormula = evalFormula.replace(/(-\d+(\.\d+)?)$/, "($1)");

        const result = eval(evalFormula + displayValue);

        setDisplayValue(String(result));
        setFormula(evalFormula + displayValue + "=" + String(result));
        setLastAction(null);
      }

      setEvaluated(true);
    } catch (error) {
      setDisplayValue("Error");
      setFormula("Error");
      setEvaluated(true);
      setLastAction(null);
    }
  };

  return (
    <>
      <h1>
        <span className="letterC">C</span>alculator <span>App</span>
      </h1>

      <div id="calculator">
        <div id="display">{displayValue}</div>
        <button id="clear" onClick={handleClearClick}>
          AC
        </button>
        <button id="zero" onClick={() => handleNumberClick("0")}>
          0
        </button>
        <button id="one" onClick={() => handleNumberClick("1")}>
          1
        </button>
        <button id="two" onClick={() => handleNumberClick("2")}>
          2
        </button>
        <button id="three" onClick={() => handleNumberClick("3")}>
          3
        </button>
        <button id="four" onClick={() => handleNumberClick("4")}>
          4
        </button>
        <button id="five" onClick={() => handleNumberClick("5")}>
          5
        </button>
        <button id="six" onClick={() => handleNumberClick("6")}>
          6
        </button>
        <button id="seven" onClick={() => handleNumberClick("7")}>
          7
        </button>
        <button id="eight" onClick={() => handleNumberClick("8")}>
          8
        </button>
        <button id="nine" onClick={() => handleNumberClick("9")}>
          9
        </button>
        <button id="add" onClick={() => handleOperatorClick("+")}>
          +
        </button>
        <button id="subtract" onClick={() => handleOperatorClick("-")}>
          -
        </button>
        <button id="multiply" onClick={() => handleOperatorClick("*")}>
          *
        </button>
        <button id="divide" onClick={() => handleOperatorClick("/")}>
          /
        </button>
        <button id="decimal" onClick={handleDecimalClick}>
          .
        </button>
        <button id="equals" onClick={handleEqualsClick}>
          =
        </button>
      </div>
    </>
  );
}

export default App;
