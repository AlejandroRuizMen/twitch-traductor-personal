console.log("Content script traductor activo");

let enabled = true;

// BOTÓN
const btn = document.createElement("button");
btn.textContent = "🌐 Traductor: ON";

Object.assign(btn.style, {
  position: "fixed",
  top: "80px",
  right: "20px",
  zIndex: "999999",
  background: "#9147ff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "6px 10px",
  cursor: "pointer",
  fontSize: "12px"
});

btn.onclick = () => {
  enabled = !enabled;
  btn.textContent = enabled
    ? "🌐 Traductor: ON"
    : "🌐 Traductor: OFF";
};

document.body.appendChild(btn);

// ENVIAR A BACKGROUND
function translate(text, callback) {
  chrome.runtime.sendMessage(
    { type: "TRANSLATE", text },
    response => callback(response?.translated || "")
  );
}

// ESCANEO SIMPLE
function scanMessages() {
  if (!enabled) return;

  document.querySelectorAll('[data-a-target="chat-message-text"]').forEach(msg => {
    if (msg.dataset.translated) return;

    const text = msg.innerText.trim();
    if (text.length < 2) return;

    msg.dataset.translated = "true";

    translate(text, translated => {
      if (!translated) return;

      const div = document.createElement("div");
      div.textContent = "ES: " + translated;
      div.style.fontSize = "12px";
      div.style.color = "#915954";
      div.style.opacity = "0.85";
      div.style.marginTop = "2px";

      msg.appendChild(div);
    });
  });
}

// cada 2 segundos
setInterval(scanMessages, 2000);
