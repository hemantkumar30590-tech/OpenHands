```js
// Utility functions
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}

// Mapping of custom tokens to actual JavaScript Math functions
const tokenMap = {
    'sin':    (x) => Math.sin(x),
    'cos':    (x) => Math.cos(x),
    'tan':    (x) => Math.tan(x),
    'asin':   (x) => Math.asin(x),
    'acos':   (x) => Math.acos(x),
    'atan':   (x) => Math.atan(x),
    'sinh':   (x) => Math.sinh(x),
    'cosh':   (x) => Math.cosh(x),
    'tanh':   (x) => Math.tanh(x),
    'log10':  (x) => Math.log10(x),
    'ln':     (x) => Math.log(x),
    'sqrt':   (x) => Math.sqrt(x),
    'abs':    (x) => Math.abs(x),
    'ceil':   (x) => Math.ceil(x),
    'floor':  (x) => Math.floor(x),
    'round':  (x) => Math.round(x),
    'exp':    (x) => Math.exp(x),
    'pow10':  (x) => Math.pow(10, x),
    'factorial': (x) => factorial(x),
    'deg':    (x) => x * (180 / Math.PI),
    'rad':    (x) => x * (Math.PI / 180),
    'π':      Math.PI,
    'e':      Math.E
};

// Replace tokens in the expression with JavaScript-evaluable code
function preprocess(expr) {
    // Replace constants
    expr = expr.replace(/π/g, 'Math.PI');
    expr = expr.replace(/e/g, 'Math.E');

    // Replace operators
    expr = expr.replace(/\^/g, '**'); // exponentiation

    // Replace functions
    for (let token in tokenMap) {
        // Skip constants that are already handled
        if (typeof tokenMap[token] === 'function') {
            const regex = new RegExp(`${token}\\(`, 'g');
            expr = expr.replace(regex, `tokenMap['${token}'](`);
        }
    }

    // Replace factorial syntax "x!" -> factorial(x)
    expr = expr.replace(/(\d+(\.\d+)?|\([^()]*\))!/g, (match, p1) => {
        return `tokenMap['factorial'](${p1})`;
    });

    return expr;
}

// Evaluate the expression safely
function evaluate(expr) {
    try {
        const processed = preprocess(expr);
        // eslint-disable-next-line no-new-func
        const fn = new Function('tokenMap', `return ${processed}`);
        const result = fn(tokenMap);
        return (result === undefined) ? 'Error' : result;
    } catch (e) {
        return 'Error';
    }
}

// UI handling
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-value') || btn.textContent.trim();

        if (val === 'C') {
            display.value = '';
        } else if (val === '←') {
            display.value = display.value.slice(0, -1);
        } else if (val === '=') {
            // Handled separately
        } else {
            display.value += val;
        }
    });
});

document.getElementById('equals').addEventListener('click', () => {
    const expr = display.value;
    const result = evaluate(expr);
    display.value = result;
});

// Allow keyboard input (Enter = evaluate, Esc = clear)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('equals').click();
    } else if (e.key === 'Escape') {
        display.value = '';
    }
});
```