const takes = [
  "Pineapple on pizza is elite and people who disagree are emotional",
  "Waking up early is just unpaid suffering",
  "Most people don’t hate Mondays, they hate their life setup",
  "Voicenotes are aggressive for no reason",
  "People who say 'I’m not like other people' are exactly like other people",
  "iPhone users act like they’re in a cult sometimes",
  "Android users are too defensive for no reason",
  "School teaches you nothing about taxes but everything about sadness",
  "Group projects are just solo work with extra stress",
  "Most arguments online are two people being confidently wrong",
  "Influencers would struggle in a normal 9–5 for 2 days",
  "Nobody actually understands crypto, they just nod along",
  "Netflix has 1 good show every 3 years",
  "Reading books is just loading screens for real life",
  "People don’t hate ads, they hate being interrupted",
  "Gym selfies cancel out 80% of the workout benefits",
  "Voice messages over 30 seconds are disrespectful",
  "Most people aren’t busy, they’re just disorganised",
  "If you need a morning routine video, your life is already off track",
  "Everyone thinks they’re the main character… and they’re not",
  "People only like deep quotes when they’re sad",
  "The group chat is always dead until someone leaves it",
  "Most ‘glow ups’ are just better lighting and angles",
  "Arguing on social media is unpaid overtime for stupidity"
];
function showReaction(percent, type) {
  const msg = document.createElement("div");

  let text = "";

  if (type === "agree" && percent < 50) {
    text = "💀 You are fighting the majority";
  } else if (type === "disagree" && percent > 50) {
    text = "💀 You are in the minority";
  } else {
    text = "🔥 You are with the crowd";
  }

  msg.innerText = text;

  msg.style.position = "absolute";
  msg.style.top = "30%";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.background = "rgba(0,0,0,0.8)";
  msg.style.padding = "12px 18px";
  msg.style.borderRadius = "12px";
  msg.style.fontSize = "16px";
  msg.style.color = "white";
  msg.style.zIndex = "999";

  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 1200);
}
