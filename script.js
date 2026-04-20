const takes = [
  "Messi is better than Ronaldo",
  "School is useless",
  "Most people fake confidence",
  "iPhone users are in a cult",
  "Android is better",
  "Drake is overrated",
  "People pretend to be busy",
  "Gym selfies are cringe",
  "Social media ruins confidence",
  "Most influencers are useless",
  "Netflix is boring now",
  "Waking up early is overrated",
  "Group projects are torture",
  "Voice notes are annoying",
  "People follow trends blindly",
  "Money > passion",
  "Nobody reads anymore",
  "Everyone thinks they’re special",
  "Arguments online are pointless",
  "Confidence beats intelligence"
];

let agree = 50;
let disagree = 50;
let currentTake = "";

let startY = 0;
let endY = 0;

// LOAD TAKE
function loadTake(direction = "down") {
  const screen = document.getElementById("screen");

  screen.style.transform = direction === "down"
    ? "translateY(-100%)"
    : "translateY(100%)";

  screen.style.opacity = "0";

  setTimeout(() => {
    currentTake = takes[Math.floor(Math.random() * takes.length)];

    document.getElementById("take").innerText = currentTake;
    document.getElementById("category").innerText = "HOT TAKE";

    // fake global votes (feels real)
    agree = Math.floor(Math.random() * 500 + 50);
    disagree = Math.floor(Math.random() * 500 + 50);

    updateUI();

    screen.style.transform = "translateY(0)";
    screen.style.opacity = "1";
  }, 200);
}

// UPDATE UI
function updateUI() {
  let total = agree + disagree;
  let percent = Math.round((agree / total) * 100);

  document.getElementById("agreeBar").style.width = percent + "%";
  document.getElementById("percent").innerText = percent + "% Agree";
}

// VOTE
function vote(type) {
  if (type === "agree") agree++;
  else disagree++;

  updateUI();

  let total = agree + disagree;
  let percent = Math.round((agree / total) * 100);

  // identity trigger (viral psychology)
  if (percent < 30 || percent > 70) {
    showPopup("💀 This is controversial");
  } else {
    showPopup("🤝 Most people agree");
  }

  setTimeout(() => loadTake("down"), 400);
}

// POPUP
function showPopup(text) {
  const pop = document.createElement("div");

  pop.innerText = text;

  pop.style.position = "fixed";
  pop.style.top = "40%";
  pop.style.left = "50%";
  pop.style.transform = "translateX(-50%) scale(0.8)";
  pop.style.background = "rgba(0,0,0,0.9)";
  pop.style.padding = "14px 20px";
  pop.style.borderRadius = "14px";
  pop.style.fontSize = "16px";
  pop.style.opacity = "0";
  pop.style.transition = "0.25s ease";

  document.body.appendChild(pop);

  setTimeout(() => {
    pop.style.opacity = "1";
    pop.style.transform = "translateX(-50%) scale(1)";
  }, 10);

  setTimeout(() => {
    pop.style.opacity = "0";
  }, 900);

  setTimeout(() => pop.remove(), 1200);
}

// 🔥 SHARE FUNCTION (THIS IS THE VIRAL PART)
function shareTake() {
  let total = agree + disagree;
  let percent = Math.round((agree / total) * 100);

  const message =
    `I got ${percent}% agree on this take:\n\n"${currentTake}"\n\nDo you agree or disagree?`;

  if (navigator.share) {
    navigator.share({
      title: "Hot Takes",
      text: message,
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(message);
    showPopup("📋 Copied. Send it to someone.");
  }
}

// SWIPE
document.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
  endY = e.changedTouches[0].clientY;

  if (startY - endY > 50) loadTake("down");
  else if (endY - startY > 50) loadTake("up");
});

// START
loadTake();
