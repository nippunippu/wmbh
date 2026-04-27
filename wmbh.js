	// ===== CONFIG: EDIT THIS SECTION ===== //
	const DESCRIPTION_CONTENT = `
	    <div class="wmb-description">
	        <h2><span class="wmb-accent">White Man's Burden Hangout</span></h2>
	        <p>Anonymous is disabled, either login as "guest" or make an account.  I need emotes, ideas, open to anything.  Otherwise kickback and relax.  More to come.</p>
	        <ul>
			     <li><a href="https://paste.eccologic.net/?5b22fc594185f382#6YsFi6bJALdemPQ4C3hmsLiem79DDz5JEAuoSnRMPfsZ" target="_blank">Emotes TIPS AND TRICKS</a></li>
			     <li><a href="https://paste.eccologic.net/?b160abc4178361f4#DwdAmbHSHTYcfDWGqZ36DZeYSvp7px8D6trErEWXrXWk" target="_blank">Room Rules and Best Practices</a></li>
	            <li><a href="https://odysee.com/@nippu:0" target="_blank">Nippu's Odysee Channel (Gaming and more)</a></li>
	            <li><a href="https://odysee.com/@vidyasometimes:d/" target="_blank">Honk9000's Gaming Channel</a></li>
	            <li><a href="https://www.europa.com/" target="_blank">Unfiltered World News</a></li>
	        </ul>
	    </div>
	
	`;

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

const GLOBAL_VOLUME = 0.05;

const soundMap = {
  hu: "https://files.catbox.moe/vubijo.mp3",
  "/naruto": "https://www.myinstants.com/media/sounds/naruto_shadow_clones.mp3",
"/gutssad": "https://files.catbox.moe/uo08rw.mp3",
"/grasses": "https://files.catbox.moe/658tb3.mp3",
"/gutsenters": "https://files.catbox.moe/xnir4i.mp3",
"/gunshoot": "https://www.myinstants.com/media/sounds/gunshot1-connor_p-8650_hifi.mp3"
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
