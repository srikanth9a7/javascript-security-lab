// Vulnerable: any entered JavaScript can run in the page.
const expressionBox = document.querySelector("#expression");
const answer = document.querySelector("#answer");

const harmlessPayload =
  `document.querySelector('#runtime-marker').textContent = ` +
  `'Unexpected JavaScript executed'; 8 * 4`;

document.querySelector("#sample").addEventListener("click", () => {
  expressionBox.value = harmlessPayload;
});

document.querySelector("#calculate").addEventListener("click", () => {
  try {
    const result = eval(expressionBox.value); // Unsafe: input becomes code.
    answer.textContent = `Calculated value: ${result}`;
  } catch (error) {
    answer.textContent = "Calculation could not be completed.";
  }
});
