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
  "Confidence matters more than intelligence"
];

let agree = 50;
let disagree = 50;

// load a new random take
function loadTake() {
  const randomIndex = Math.floor(Math.random() * takes.length);
  const take = takes[randomIndex];

  document.getElementById("take").innerText = take;
  document.getElementById("category").innerText = "HOT TAKE";

  agree = 50;
  disagree = 50;

  updateUI();
}

// update percentage bar
function updateUI() {
  let total = agree + disagree;
  let percent = Math.round((agree / total) * 100);

  document.getElementById("agreeBar").style.width = percent + "%";
  document.getElementById("percent").innerText = percent + "% Agree";
}

// reaction popup
function showReaction(percent, type) {
  const msg = document.createElement("div");

  let text = "";

  if (type === "agree" && percent < 50) {
    text = "💀 You are in the minority";
  } else if (type === "disagree" && percent > 50) {
    text = "💀 You are in the minority";
  } else {
    text = "🔥 You are with the majority";
  }

  msg.innerText = text;

  msg.style.position = "absolute";
  msg.style.top = "35%";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.background = "rgba(0,0,0,0.85)";
  msg.style.padding = "12px 20px";
  msg.style.borderRadius = "12px";
  msg.style.fontSize = "16px";
  msg.style.color = "white";
  msg.style.zIndex = "999";

  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 1200);
}

// vote function
function vote(type) {
  if (type === "agree") agree++;
  else disagree++;

  let total = agree + disagree;
  let percent = Math.round((agree / total) * 100);

  document.getElementById("agreeBar").style.width = percent + "%";
  document.getElementById("percent").innerText = percent + "% Agree";

  showReaction(percent, type);

  setTimeout(() => {
    loadTake();
  }, 600);
}

// start app
loadTake();
