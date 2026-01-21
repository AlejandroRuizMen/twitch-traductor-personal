console.log("Background traductor activo (Google)");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type !== "TRANSLATE") return;

  const url =
    "https://translate.googleapis.com/translate_a/single" +
    "?client=gtx" +
    "&sl=auto" +
    "&tl=es" +
    "&dt=t" +
    "&q=" + encodeURIComponent(msg.text);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      // Estructura rara pero estable
      const translated = data[0]
        .map(item => item[0])
        .join("");

      sendResponse({ translated });
    })
    .catch(err => {
      console.error("Error Google Translate:", err);
      sendResponse({ translated: "" });
    });

  return true; // obligatorio
});
