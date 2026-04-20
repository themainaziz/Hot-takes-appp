const takes = [
  "Messi is better than Ronaldo",
  "The Premier League is overrated",
  "VAR has ruined football",
  "Drake is overrated",
  "Android is better than iPhone",
  "School doesn’t prepare you for real life",
  "Social media makes people insecure",
  "Most influencers are overrated",
  "Anime is better than live action movies",
  "Money matters more than passion",
  "Pineapple belongs on pizza",
  "Group projects are just stress",
  "Voice notes over 30 seconds are annoying",
  "Most people follow trends blindly",
  "Netflix is getting worse",
  "Everyone thinks they’re the main character",
  "Arguments online are pointless",
  "Waking up early is overrated",
  "People pretend to be busy",
  "Confidence matters more than intelligence",
  "Gym selfies cancel the workout",
  "People fake being busy to feel important",
  "Most TikTok advice is useless",
  "Hustle culture is toxic",
  "People don’t read, they just scroll"
];

let agree = 50;
let disagree = 50;
let isTransitioning = false;

// LOAD NEW TAKE
function loadTake() {
  if (isTransitioning) return;
  isTransitioning = true;

  const card = document.querySelector(".card");

  // fade out
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * takes.length);
    const take = takes[randomIndex];

    document.getElementById("take").innerText = take;
    document.getElementById("category").innerText = "HOT TAKE";

    agree = 50;
    disagree = 50;

    updateUI();

    // fade in
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";

    isTransitioning = false;
  }, 200);
}

// UPDATE UI
function updateUI() {
  let total = agree + disagree;
  let percent = Math.round((agree / total) * 100);

  document.getElementById("agreeBar").style.width = percent + "%";
  document.getElementById("percent").innerText = percent + "% Agree";
}

// REACTION POPUP
function showReaction(percent, type) {
  const msg = document.createElement("div");

  let text = "";

  if (type === "agree" && percent < 50) {
    text = "💀 You are alone on this one";
  } else if (type === "disagree" && percent > 50) {
    text = "💀 Nobody agrees with you";
  } else if (percent > 80) {
    text = "🔥 This is basically fact";
  } else if (percent < 20) {
    text = "💀 This take is horrible";
  } else {
    text = "🤝 You’re with the majority";
  }

  msg.innerText = text;

  msg.style.position = "fixed";
  msg.style.top = "35%";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%) scale(0.9)";
  msg.style.background = "rgba(0,0,0,0.85)";
  msg.style.padding = "14px 22px";
  msg.style.borderRadius = "14px";
  msg.style.fontSize = "16px";
  msg.style.color = "white";
  msg.style.zIndex = "999";
  msg.style.opacity = "0";
  msg.style.transition = "all 0.25s ease";

  document.body.appendChild(msg);

  setTimeout(() => {
    msg.style.opacity = "1";
    msg.style.transform = "translateX(-50%) scale(1)";
  }, 10);

  setTimeout(() => {
    msg.style.opacity = "0";
    msg.style.transform = "translateX(-50%) scale(0.9)";
  }, 900);

  setTimeout(() => msg.remove(), 1200);
}

// VOTE
function vote(type) {
  if (isTransitioning) return;

  if (type === "agree") agree++;
  else disagree++;

  updateUI();

  let total = agree + disagree;
  let percent = Math.round((agree / total) * 100);

  showReaction(percent, type);

  setTimeout(loadTake, 500);
}

// TAP ANYWHERE TO SKIP (TikTok feel)
document.body.addEventListener("click", function(e) {
  if (e.target.tagName !== "BUTTON") {
    loadTake();
  }
});

// START APP
loadTake();
