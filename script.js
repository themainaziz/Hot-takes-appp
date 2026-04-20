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
    const take = takes[Math.floor(Math.random() * takes.length)];

    document.getElementById("take").innerText = take;
    document.getElementById("category").innerText = "HOT TAKE";

    agree = 50;
    disagree = 50;

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

  setTimeout(() => loadTake("down"), 300);
}

// SWIPE DETECTION
document.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
  endY = e.changedTouches[0].clientY;

  if (startY - endY > 50) {
    loadTake("down"); // swipe up
  } else if (endY - startY > 50) {
    loadTake("up"); // swipe down
  }
});

// START
loadTake();
