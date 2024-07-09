import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import ConfettiExplosion from 'react-confetti-explosion';
import '../css/Calculator.css';

const MathCalculator = () => {
  const [screen, setScreen] = useState('');
  const [output, setOutput] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [storedValue, setStoredValue] = useState(0);
  const [toggleFunction, setToggleFunction] = useState(false);
  const [useRadians, setUseRadians] = useState(false);

  const handleButtonClick = (label) => {
    if (label === '=') {
      calculateResult();
    } else if (label === 'C') {
      setScreen('');
      setOutput('');
    } else if (label === 'mc') {
      setStoredValue(0);
    } else if (label === 'm+') {
      setStoredValue((prevValue) => prevValue + parseFloat(screen || '0'));
    } else if (label === 'm-') {
      setStoredValue((prevValue) => prevValue - parseFloat(screen || '0'));
    } else if (label === 'mr') {
      setScreen(storedValue.toString());
    } else if (label === '+/-') {
      setScreen((prevScreen) => (-parseFloat(prevScreen)).toString());
    } else if (label === '%') {
      setScreen((prevScreen) => (parseFloat(prevScreen) / 100).toString());
    } else if (label === '2nd') {
      setToggleFunction((prev) => !prev);
    } else if (label === 'Rad') {
      setUseRadians((prev) => !prev);
    } else if (label === 'Rand') {
      setScreen(Math.floor(Math.random() * 100) + 1);
    } else if (label === 'x²') {
      setScreen((prevScreen) => Math.pow(parseFloat(prevScreen), 2).toString());
    } else if (label === 'x³') {
      setScreen((prevScreen) => Math.pow(parseFloat(prevScreen), 3).toString());
    } else if (label === 'xʸ') {
      setScreen((prevScreen) => prevScreen + '^');
    } else if (label === 'eˣ') {
      setScreen((prevScreen) => Math.exp(parseFloat(prevScreen)).toString());
    } else if (label === '10ˣ') {
      setScreen((prevScreen) => Math.pow(10, parseFloat(prevScreen)).toString());
    } else if (label === '¹/x') {
      setScreen((prevScreen) => (1 / parseFloat(prevScreen)).toString());
    } else if (label === '²√x') {
      setScreen((prevScreen) => Math.sqrt(parseFloat(prevScreen)).toString());
    } else if (label === '³√x') {
      setScreen((prevScreen) => Math.cbrt(parseFloat(prevScreen)).toString());
    } else if (label === 'ʸ√x') {
      setScreen((prevScreen) => prevScreen + '√');
    } else if (label === 'ln') {
      setScreen((prevScreen) => Math.log(parseFloat(prevScreen)).toString());
    } else if (label === 'log₁₀') {
      setScreen((prevScreen) => Math.log10(parseFloat(prevScreen)).toString());
    } else if (label === 'x!') {
      const computeFactorial = (n) => (n <= 1 ? 1 : n * computeFactorial(n - 1));
      setScreen(computeFactorial(parseFloat(screen)).toString());
    } else if (label === 'sin') {
      setScreen((prevScreen) => (useRadians ? Math.sin(parseFloat(prevScreen)) : Math.sin(parseFloat(prevScreen) * (Math.PI / 180))).toString());
    } else if (label === 'cos') {
      setScreen((prevScreen) => (useRadians ? Math.cos(parseFloat(prevScreen)) : Math.cos(parseFloat(prevScreen) * (Math.PI / 180))).toString());
    } else if (label === 'tan') {
      setScreen((prevScreen) => (useRadians ? Math.tan(parseFloat(prevScreen)) : Math.tan(parseFloat(prevScreen) * (Math.PI / 180))).toString());
    } else if (label === 'sinh') {
      setScreen((prevScreen) => Math.sinh(parseFloat(prevScreen)).toString());
    } else if (label === 'cosh') {
      setScreen((prevScreen) => Math.cosh(parseFloat(prevScreen)).toString());
    } else if (label === 'tanh') {
      setScreen((prevScreen) => Math.tanh(parseFloat(prevScreen)).toString());
    } else if (label === 'π') {
      setScreen((prevScreen) => prevScreen + Math.PI.toString());
    } else if (label === 'e') {
      setScreen((prevScreen) => prevScreen + Math.E.toString());
    } else if (label === 'EE') {
      setScreen((prevScreen) => prevScreen + 'e');
    } else {
      setScreen((prev) => prev + label);
    }
  };

  const calculateResult = () => {
    try {
      if (/2\s*[\+\-\*\/]\s*6|6\s*[\+\-\*\/]\s*2/.test(screen)) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }

      let expression = screen.replace('×', '*').replace('÷', '/');

      expression = expression
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log₁₀/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/²√x/g, 'Math.sqrt')
        .replace(/³√x/g, 'Math.cbrt')
        .replace(/ʸ√x/g, 'Math.pow')
        .replace(/eˣ/g, 'Math.exp')
        .replace(/10ˣ/g, 'Math.pow(10,')
        .replace(/x²/g, 'Math.pow')
        .replace(/x³/g, 'Math.pow')
        .replace(/xʸ/g, 'Math.pow')
        .replace(/x!/g, 'factorial');

      const computeFactorial = (n) => (n <= 1 ? 1 : n * computeFactorial(n - 1));

      const evaluatedResult = eval(expression);
      setScreen(evaluatedResult.toString());
      setOutput(evaluatedResult.toString());
    } catch (error) {
      setScreen('Error');
    }
  };

  const buttonLayout = [
    ['(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '÷'],
    ['2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', '×'],
    ['¹/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '-'],
    ['x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+'],
    ['Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '=']
  ];

  return (
    <div className="calculator">
      {showConfetti && <ConfettiExplosion />}
      <Display value={screen} />
      {buttonLayout.map((row, i) => (
        <div key={i} className="button-row">
          {row.map((label) => (
            <Button 
              key={label} 
              label={label} 
              onClick={() => handleButtonClick(label)} 
              className={`button ${['÷', '×', '-', '+', '='].includes(label) ? 'operator' : ''} ${label === '0' ? 'zero' : ''}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MathCalculator;
