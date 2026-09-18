```js
/* ==============================================================
   Super Calculator – Core Logic (TDD ready)
   ============================================================== */

class Calculator {
  constructor(displayExpressionEl, displayResultEl) {
    this.expressionEl = displayExpressionEl;
    this.resultEl = displayResultEl;
    this.clearAll();
  }

  clearAll() {
    this.current = '';
    this.prev = '';
    this.operator = null;
    this.updateDisplay();
  }

  deleteLast() {
    this.current = this.current.slice(0, -1);
    this.updateDisplay();
  }

  appendDigit(digit) {
    if (digit === '.' && this.current.includes('.')) return;
    this.current += digit;
    this.updateDisplay();
  }

  chooseOperator(op) {
    if (this.current === '' && this.prev === '') return;
    if (this.current === '' && this.prev !== '') {
      this.operator = op; // change operator
      this.updateDisplay();
      return;
    }
    if (this.prev !== '') {
      this.compute();
    }
    this.operator = op;
    this.prev = this.current;
    this.current = '';
    this.updateDisplay();
  }

  compute() {
    const a = parseFloat(this.prev);
    const b = parseFloat(this.current);
    if (isNaN(a) || isNaN(b)) return;

    let result;
    switch (this.operator) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/':
        result = b === 0 ? 'Error' : a / b;
        break;
      case '%':
        result = a % b;
        break;
      default: return;
    }

    this.current = result.toString();
    this.prev = '';
    this.operator = null;
    this.updateDisplay();
  }

  updateDisplay() {
    this.expressionEl.textContent = `${this.prev} ${this.operator ?? ''}`.trim();
    this.resultEl.textContent = this.current || '0';
  }
}

/* ==============================================================
   UI Wiring
   ============================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const exprEl = document.getElementById('expression');
  const resEl = document.getElementById('result');
  const calc = new Calculator(exprEl, resEl);

  // Button clicks
  document.querySelectorAll('.buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const value = btn.dataset.value;

      switch (action) {
        case 'digit':   calc.appendDigit(value); break;
        case 'decimal': calc.appendDigit('.'); break;
        case 'operator':calc.chooseOperator(value); break;
        case 'equals':  calc.compute(); break;
        case 'clear':   calc.clearAll(); break;
        case 'delete':  calc.deleteLast(); break;
        case 'percent': calc.chooseOperator('%'); break;
      }
    });
  });

  // Keyboard support
  document.addEventListener('keydown', e => {
    if (e.key >= '0' && e.key <= '9') {
      calc.appendDigit(e.key);
    } else if (e.key === '.') {
      calc.appendDigit('.');
    } else if (['+', '-', '*', '/', '%'].includes(e.key)) {
      calc.chooseOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      calc.compute();
    } else if (e.key === 'Backspace') {
      calc.deleteLast();
    } else if (e.key === 'Escape') {
      calc.clearAll();
    }
  });
});
```
