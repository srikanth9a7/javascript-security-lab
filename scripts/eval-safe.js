// Corrected: calculate only an explicitly permitted arithmetic expression.
const expressionBox = document.querySelector("#expression");
const answer = document.querySelector("#answer");

const harmlessPayload =
  `document.querySelector('#runtime-marker').textContent = ` +
  `'Unexpected JavaScript executed'; 8 * 4`;

document.querySelector("#sample").addEventListener("click", () => {
  expressionBox.value = harmlessPayload;
});

function calculateSimple(input) {
  const pattern = /^\s*(-?\d+(?:\.\d+)?)\s*([+*/-])\s*(-?\d+(?:\.\d+)?)\s*$/;
  const match = input.match(pattern);
  if (!match) return "Only two numbers and one operator are allowed.";

  const left = Number(match[1]);
  const operator = match[2];
  const right = Number(match[3]);
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return "Both numbers must be finite.";
  }
  if (operator === "+") return left + right;
  if (operator === "-") return left - right;
  if (operator === "*") return left * right;
  if (right === 0) return "Division by zero is not allowed.";
  return left / right;
}

document.querySelector("#calculate").addEventListener("click", () => {
  const result = calculateSimple(expressionBox.value);
  answer.textContent = `Result: ${result}`; // Safe text output.
});
