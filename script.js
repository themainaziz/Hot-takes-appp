const questions = [
  "Being nice gets you used more than respected",
  "Money matters more than love",
  "Most people fake their personality",
  "Social media is ruining your brain",
  "You trust people too easily",
  "Hard work doesn't guarantee success",
  "People care more about image than truth"
];

let index = 0;
let isAnimating = false;

let agreeCount = 0;
let disagreeCount = 0;
let streak = 0;

const text = document.getElementById("question");
const stats = document.getElementById("stats");
const result = document.getElementById("result");
const card = document.getElementById("card");

const agreeFeedback = ["Hot take", "Bold", "Interesting", "Valid", "Sharp"];
const disagreeFeedback = ["Unpopular", "Controversial", "Risky", "Hmm", "Different"];

text.innerText = questions[index];

function updateStats() {
  stats.innerText = `Agree: ${agreeCount} | Disagree: ${disagreeCount} | Streak: ${streak}`;
}

function getPersonality() {
  const total = agreeCount + disagreeCount;
  if (total === 0) return "No data";

  const ratio = agreeCount / total;

  if (ratio > 0.7) return "Bold Thinker";
  if (ratio > 0.5) return "Balanced Mind";
  if (ratio > 0.3) return "Independent";
  return "Contrarian";
}

function nextCard() {
  index++;

  if (index >= questions.length) {
    text.innerText = `Result: ${getPersonality()}`;
    result.innerText = "Session complete";
    card.style.transform = "scale(1.05)";
    return;
  }

  text.innerText = questions[index];

  card.style.transition = "none";
  card.style.transform = "translateX(0) rotate(0deg)";
  card.style.opacity = "1";

  result.innerText = "";
}

function handleChoice(choice) {
  if (isAnimating) return;
  isAnimating = true;

  if (choice === "agree") {
    agreeCount++;
    streak++;
  } else {
    disagreeCount++;
    streak = 0;
  }

  updateStats();

  const move = choice === "agree" ? 400 : -400;
  const percentage = Math.floor(Math.random() * 60 + 20);

  const feedback =
    choice === "agree"
      ? agreeFeedback[Math.floor(Math.random() * agreeFeedback.length)]
      : disagreeFeedback[Math.floor(Math.random() * disagreeFeedback.length)];

  result.innerText = `${feedback} • ${percentage}%`;
  result.style.color = choice === "agree" ? "#00c853" : "#d50000";

  animateOut(move);
}

function animateOut(move) {
  card.style.transition = "transform 0.3s ease, opacity 0.3s ease";
  card.style.transform = `translateX(${move}px) rotate(${move/20}deg)`;
  card.style.opacity = "0";

  setTimeout(() => {
    nextCard();
    isAnimating = false;
  }, 300);
}

/* swipe support */
let startX = 0;
let currentX = 0;
let isDragging = false;

card.addEventListener("touchstart", (e) => {
  if (isAnimating) return;
  startX = e.touches[0].clientX;
  isDragging = true;
});

card.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  currentX = e.touches[0].clientX;
  let diff = currentX - startX;

  card.style.transform = `translateX(${diff}px) rotate(${diff/20}deg)`;
});

card.addEventListener("touchend", () => {
  if (!isDragging) return;

  let diff = currentX - startX;

  if (diff > 100) handleChoice("agree");
  else if (diff < -100) handleChoice("disagree");
  else {
    card.style.transition = "transform 0.2s";
    card.style.transform = "translateX(0)";
  }

  isDragging = false;
});
