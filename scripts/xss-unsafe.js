// Vulnerable: the browser parses the visitor's text as HTML.
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
  badge.textContent = "Message posted. Checking page behavior...";
  badge.dataset.kind = "";
  wall.innerHTML = messageBox.value; // Unsafe sink: HTML is interpreted.
});
