const takes = [
  "Messi is better than Ronaldo",
  "School is a scam",
  "Most people fake confidence",
  "iPhone users are in a cult",
  "Android is actually better",
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
let streak = 0;
let isAnimating = false;

// LOAD TAKE
function loadTake() {
  if (isAnimating) return;
  isAnimating = true;

  const card = document.getElementById("card");

  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";

  setTimeout(() => {
    const take = takes[Math.floor(Math.random() * takes.length)];

    document.getElementById("take").innerText = take;
    document.getElementById("category").innerText = "HOT TAKE";

    agree = 50;
    disagree = 50;

    updateUI();

    card.style.opacity = "1";
    card.style.transform = "translateY(0)";

    isAnimating = false;
  }, 200);
}

// UPDATE BAR
function updateUI() {
  let total = agree + disagree;
  let percent = Math.round((agree / total) * 100);

  document.getElementById("agreeBar").style.width = percent + "%";
  document.getElementById("percent").innerText = percent + "% Agree";
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

// VOTE
function vote(type) {
  if (isAnimating) return;

  if (type === "agree") agree++;
  else disagree++;

  streak++;
  document.getElementById("streak").innerText = "🔥 " + streak;

  updateUI();

  let total = agree + disagree;
  let percent = Math.round((agree / total) * 100);

  if (percent > 80) showPopup("🔥 Everyone agrees");
  else if (percent < 20) showPopup("💀 Terrible take");
  else if ((type === "agree" && percent < 50) || (type === "disagree" && percent > 50)) {
    showPopup("💀 You’re in the minority");
  } else {
    showPopup("🤝 Fair take");
  }

  setTimeout(loadTake, 500);
}

// TAP TO SKIP
document.body.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") {
    loadTake();
  }
});

// START
loadTake();
