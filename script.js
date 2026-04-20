let agree = 50;
let disagree = 50;

function vote(type) {
  if (type === "agree") agree++;
  else disagree++;

  let total = agree + disagree;
  let percent = Math.round((agree / total) * 100);

  document.getElementById("agreeBar").style.width = percent + "%";
  document.getElementById("percent").innerText = percent + "% Agree";
}
