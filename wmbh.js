console.log("Loaded wmbh.js");

// emote spam
document.addEventListener("click", function (e) {
  const img = e.target.closest("img.channel-emote");

  if (img) {
    const text = img.title;
    const input = document.getElementById("chatline");

    if (input && text) {
      input.value += text + " ";
      input.focus();
    }
  }
});

// hu string sound and other sounds
const chat = document.getElementById("messagebuffer");

const GLOBAL_VOLUME = 0;

const soundMap = {
  hu: "https://files.catbox.moe/vubijo.mp3",
  "/naruto": "https://www.myinstants.com/media/sounds/naruto_shadow_clones.mp3",
"/gutssad": "https://files.catbox.moe/uo08rw.mp3",
"/grasses": "https://files.catbox.moe/658tb3.mp3",
"/gutsenters": "https://files.catbox.moe/xnir4i.mp3",
"/gunshoot": "https://www.myinstants.com/media/sounds/gunshot1-connor_p-8650_hifi.mp3",
"/jet1": "https://www.myinstants.com/media/sounds/jet-fly-by_mixdown.mp3"
};

let lastPlay = 0;

function playSound(url) {
  const now = Date.now();
  if (now - lastPlay < 600) return;
  lastPlay = now;

  const audio = new Audio(url);
  audio.volume = GLOBAL_VOLUME;
  audio.play().catch(() => {});
}

const observer = new MutationObserver((mutations) => {
  for (const m of mutations) {
    for (const node of m.addedNodes) {
      if (node.nodeType !== 1) continue;

      const messageRow = node.classList?.contains("chat-msg-nippur")
        ? node
        : node.querySelector?.(".chat-msg-nippur");

      if (messageRow) {
        const spans = messageRow.querySelectorAll("span");
        const lastSpan = spans[spans.length - 1];

        const text = (lastSpan?.textContent || "").trim();

        if (/^hu$/i.test(text)) {
          playSound(soundMap.hu);
        }
      }

      const emotes = node.querySelectorAll?.("img.channel-emote") || [];

      emotes.forEach((img) => {
        const title = img.getAttribute("title");

        if (soundMap[title]) {
          playSound(soundMap[title]);
        }
      });
    }
  }
});

if (chat) {
  observer.observe(chat, { childList: true, subtree: true });
} else {
  console.log("messagebuffer not found");
}
