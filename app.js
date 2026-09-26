
const STORAGE_KEY = "what2eat-history-v1-1";

const state = {
  energy: null,
  time: null,
  meals: [],
  candidates: [],
  current: null,
  rotation: 0,
  spinning: false,
  history: []
};

const effortLimit = {
  fine: 3,
  tired: 2,
  done: 1
};

const energyLabel = {
  fine: "I'm fine",
  tired: "Pretty tired",
  done: "Completely done"
};

const wheelColors = [
  "#f1cfaa",
  "#dce9d8",
  "#dce6f2",
  "#eadff2",
  "#f2dce2",
  "#f3e5b8",
  "#d9ece7",
  "#ead8c8"
];

const $ = (id) => document.getElementById(id);

const energyButtons = [...document.querySelectorAll("[data-energy]")];
const timeButtons = [...document.querySelectorAll("[data-time]")];

function loadHistory() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      state.history = JSON.parse(saved);
    }
  } catch (error) {
    console.error("Couldn't load history:", error);
  }
}

function saveHistory() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.history));
  } catch (error) {
    console.error("Couldn't save history:", error);
  }
}

async function loadMeals() {
  try {
    const response = await fetch("./meals.json");
    if (!response.ok) throw new Error(response.status);
    state.meals = await response.json();
    renderHistory();
    updateCandidates();
  } catch (error) {
    console.error(error);
    $("status").textContent = "Couldn't load meals.json. Make sure this is running through GitHub Pages.";
  }
}

function selectEnergy(value) {
  state.energy = value;
  energyButtons.forEach(btn => btn.classList.toggle("selected", btn.dataset.energy === value));
  $("message").textContent = "";
  updateCandidates();
}

function selectTime(value) {
  state.time = value;
  timeButtons.forEach(btn => btn.classList.toggle("selected", btn.dataset.time === value));
  $("message").textContent = "";
  updateCandidates();
}

function getRecentIds(limit = 3) {
  return state.history.slice(0, limit).map(item => item.id);
}

function buildBaseCandidates() {
  if (!state.energy || !state.time) return [];

  const maxEffort = effortLimit[state.energy];
  return state.meals.filter(meal => {
    const effortOK = meal.effort <= maxEffort;
    const timeOK = state.time === "30plus" ? meal.time >= 21 : meal.time <= Number(state.time);
    return effortOK && timeOK;
  });
}

function updateCandidates() {
  if (!state.meals.length || !state.energy || !state.time) {
    $("spin").disabled = true;
    $("matchSummary").textContent = "Choose your energy and time first.";
    $("status").textContent = "Pick two answers to unlock the wheel.";
    renderWheel([]);
    return;
  }

  const allMatching = buildBaseCandidates();
  const recentIds = getRecentIds(3);

  let candidates = allMatching.filter(meal => !recentIds.includes(meal.id));
  let usingFallback = false;

  if (candidates.length === 0) {
    candidates = allMatching;
    usingFallback = true;
  }

  state.candidates = candidates;

  $("spin").disabled = candidates.length === 0;

  const timeText = state.time === "30plus" ? "30+ minutes" : `${state.time} minutes`;
  let summary = `${candidates.length} meals fit “${energyLabel[state.energy]}” with ${timeText} available.`;

  if (recentIds.length && !usingFallback && allMatching.length !== candidates.length) {
    summary += ` Recently eaten meals are temporarily deprioritised.`;
  }
  if (usingFallback && recentIds.length) {
    summary += ` Not enough fresh options, so recent meals are allowed again.`;
  }

  $("matchSummary").textContent = summary;
  $("status").textContent = candidates.length
    ? "The wheel now contains only suitable meals."
    : "No match yet. Try another combination.";

  renderWheel(candidates);
}

function sampleVisible(items, max = 8) {
  if (items.length <= max) return [...items];
  const result = [];
  const step = items.length / max;
  for (let i = 0; i < max; i++) {
    result.push(items[Math.floor(i * step)]);
  }
  return result;
}

function renderWheel(items) {
  const visible = sampleVisible(items, 8);
  $("labels").innerHTML = "";

  if (!visible.length) {
    $("wheel").style.background = "conic-gradient(#ebe6de 0 360deg)";
    $("hubText").textContent = "Ready?";
    return;
  }

  const slice = 360 / visible.length;
  const gradient = visible
    .map((meal, i) => `${wheelColors[i % wheelColors.length]} ${i * slice}deg ${(i + 1) * slice}deg`)
    .join(",");

  $("wheel").style.background = `conic-gradient(${gradient})`;

  visible.forEach((meal, i) => {
    const angle = i * slice + slice / 2 - 90;
    const radius = 37;
    const rad = angle * Math.PI / 180;
    const label = document.createElement("div");
    label.className = "wheel-label";
    label.style.left = `${50 + radius * Math.cos(rad)}%`;
    label.style.top = `${50 + radius * Math.sin(rad)}%`;
    label.textContent = `${meal.emoji} ${meal.name}`;
    $("labels").appendChild(label);
  });

  $("hubText").textContent = `${items.length} options`;
}

function spin() {
  if (state.spinning || !state.candidates.length) return;

  state.spinning = true;
  $("spin").disabled = true;
  $("accept").disabled = true;
  $("again").disabled = true;
  $("share").disabled = true;
  $("message").textContent = "";

  state.current = state.candidates[Math.floor(Math.random() * state.candidates.length)];

  state.rotation += 1080 + Math.floor(Math.random() * 360);
  $("wheel").style.transform = `rotate(${state.rotation}deg)`;
  $("hubText").textContent = "Deciding…";
  $("status").textContent = "No more thinking.";

  setTimeout(() => {
    showResult(state.current);
    state.spinning = false;
    $("spin").disabled = false;
    $("accept").disabled = false;
    $("again").disabled = false;
    $("share").disabled = false;
  }, 1350);
}

function showResult(meal) {
  $("emoji").textContent = meal.emoji;
  $("mealName").textContent = meal.name;
  $("meta").textContent = `${meal.time} min · effort ${meal.effort}/3 · ${meal.servings} serving${meal.servings > 1 ? "s" : ""}`;
  $("why").textContent = `${meal.name} fits because your current energy allows effort level ${effortLimit[state.energy]}/3 and it matches the time you selected. ${meal.note}`;
  $("hubText").textContent = meal.name;
  $("status").textContent = "Decision made. Accept it or spin again.";
}

function acceptMeal() {
  if (!state.current) return;

  state.history = [
    {
      id: state.current.id,
      name: state.current.name,
      emoji: state.current.emoji,
      time: state.current.time,
      chosenAt: new Date().toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    },
    ...state.history.filter(item => item.id !== state.current.id)
  ].slice(0, 6);

  saveHistory();
  renderHistory();
  updateCandidates();
  $("message").textContent = "Locked in. This meal is officially no longer your problem. ✓";
}

function renderHistory() {
  if (!state.history.length) {
    $("history").innerHTML = '<p class="muted">Nothing here yet.</p>';
    return;
  }

  $("history").innerHTML = state.history
    .map(item => `
      <article class="historyitem">
        <strong>${item.emoji} ${item.name}</strong>
        <span>${item.time} min · ${item.chosenAt}</span>
      </article>
    `)
    .join("");
}

async function shareMeal() {
  if (!state.current) return;

  const shareText =
    `${state.current.emoji} ${state.current.name}\n` +
    `${state.current.time} min · effort ${state.current.effort}/3\n\n` +
    `What2Eat picked our next meal.`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "What2Eat",
        text: shareText,
        url: window.location.href
      });
      $("message").textContent = "Meal shared.";
      return;
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  }

  const fallback = `${shareText}\n${window.location.href}`;
  try {
    await navigator.clipboard.writeText(fallback);
    $("message").textContent = "Share text copied to clipboard.";
  } catch (error) {
    console.error(error);
    $("message").textContent = "Sharing isn't available here.";
  }
}

function clearHistory() {
  state.history = [];
  saveHistory();
  renderHistory();
  updateCandidates();
  $("message").textContent = "";
}

energyButtons.forEach(btn => btn.addEventListener("click", () => selectEnergy(btn.dataset.energy)));
timeButtons.forEach(btn => btn.addEventListener("click", () => selectTime(btn.dataset.time)));

$("spin").addEventListener("click", spin);
$("again").addEventListener("click", spin);
$("accept").addEventListener("click", acceptMeal);
$("share").addEventListener("click", shareMeal);
$("clear").addEventListener("click", clearHistory);

loadHistory();
loadMeals();
