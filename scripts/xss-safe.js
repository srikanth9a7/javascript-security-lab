// Corrected: untrusted visitor input is displayed only as text.
const messageBox = document.querySelector("#observation");
const wall = document.querySelector("#wall");
const badge = document.querySelector("#result-badge");

const harmlessPayload =
  `Sky map updated. <img src="missing-observation.jpg" ` +
  `onerror="document.querySelector('#result-badge').textContent=` +
  `'Injected JavaScript executed inside the page';` +
  `document.querySelector('#result-badge').dataset.kind='warning'">`;

document.querySelector("#sample").addEventListener("click", () => {
  messageBox.value = harmlessPayload;
});

document.querySelector("#post").addEventListener("click", () => {
  wall.textContent = messageBox.value; // Safe sink: no HTML interpretation.
  badge.textContent = "Input displayed as text; no script executed.";
  badge.dataset.kind = "safe";
});
