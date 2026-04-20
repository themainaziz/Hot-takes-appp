const takes = [
  "Messi is better than Ronaldo",
  "The Premier League is overrated",
  "VAR has ruined football",
  "Drake is overrated",
  "Android is better than iPhone",
  "School doesn’t prepare you for life",
  "Social media makes people insecure",
  "Most influencers are overrated",
  "Anime is better than live action movies",
  "Money matters more than passion"
];

let agree = 50;
let disagree = 50;

let currentTake = "";

function loadTake() {
  currentTake = takes[Math.floor(Math.random() * takes.length)];

  document.getElementById("take").innerText = currentTake;
  document.getElementById("category").innerText = "HOT TAKE";

  agree = 50;
  disagree = 50;

  updateUI();
}

function updateUI() {
  let total = agree + disagree;
  let percent = Math.round((agree / total) * 100);

  document.getElementById("agreeBar").style.width = percent + "%";
  document.getElementById("percent").innerText = percent + "% Agree";
}

function vote(type) {
  if (type === "agree") agree++;
  else disagree++;

  updateUI();

  setTimeout(loadTake, 500);
}

loadTake();
