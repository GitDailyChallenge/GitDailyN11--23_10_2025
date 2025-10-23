const textarea = document.getElementById("options");
const roulette = document.getElementById("roulette");
const spinBtn = document.getElementById("spin");
const resultEl = document.getElementById("result");
const winnerEl = document.getElementById("winner");

spinBtn.addEventListener("click", spinRoulette);

function createOptions() {
  roulette.innerHTML = "";
  const input = textarea.value.trim();

  if (!input) return [];

  const options = input
    .split(",")
    .map((o) => o.trim())
    .filter((o) => o);
  options.forEach((opt) => {
    const div = document.createElement("div");
    div.classList.add("option");
    div.textContent = opt;
    roulette.appendChild(div);
  });

  return options;
}

function spinRoulette() {
  const options = createOptions();

  if (options.length < 2) {
    alert("Please enter at least two options!");
    return;
  }

  resultEl.classList.add("hidden");
  let highlights = 0;
  const items = document.querySelectorAll(".option");
  const totalSpins = Math.floor(Math.random() * 30) + 30; // spin time
  let currentIndex = 0;

  const interval = setInterval(() => {
    items.forEach((item) => item.classList.remove("active"));
    items[currentIndex].classList.add("active");

    currentIndex = (currentIndex + 1) % items.length;
    highlights++;

    if (highlights > totalSpins) {
      clearInterval(interval);
      const winnerIndex = (currentIndex - 1 + items.length) % items.length;
      const winner = items[winnerIndex].textContent;
      winnerEl.textContent = winner;
      resultEl.classList.remove("hidden");
    }
  }, 100);
}
