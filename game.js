(() => {
  "use strict";

  const SECRET_LENGTH = 4;
  const BEST_KEY = "bulls-cows-best";

  const els = {
    form: document.getElementById("guess-form"),
    input: document.getElementById("guess-input"),
    error: document.getElementById("error"),
    attempts: document.getElementById("attempts"),
    best: document.getElementById("best"),
    historyList: document.getElementById("history-list"),
    winBanner: document.getElementById("win-banner"),
    winMessage: document.getElementById("win-message"),
    restartBtn: document.getElementById("restart-btn"),
  };

  let secret = "";
  let attempts = 0;
  let history = [];
  let isWon = false;

  function generateSecret() {
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    return digits.slice(0, SECRET_LENGTH).join("");
  }

  function validateGuess(input) {
    if (input.length !== SECRET_LENGTH) {
      return `請輸入 ${SECRET_LENGTH} 位數字`;
    }
    if (!/^\d+$/.test(input)) {
      return "只能輸入 0-9 的數字";
    }
    if (new Set(input).size !== input.length) {
      return "每位數字必須互不相同";
    }
    return null;
  }

  function computeAB(secretStr, guess) {
    let a = 0;
    let b = 0;
    for (let i = 0; i < SECRET_LENGTH; i++) {
      if (guess[i] === secretStr[i]) {
        a++;
      } else if (secretStr.includes(guess[i])) {
        b++;
      }
    }
    return { a, b };
  }

  function renderHistory() {
    els.historyList.innerHTML = "";
    for (let i = history.length - 1; i >= 0; i--) {
      const entry = history[i];
      const li = document.createElement("li");

      const turn = document.createElement("span");
      turn.className = "turn";
      turn.textContent = `第 ${i + 1} 次`;

      const guess = document.createElement("span");
      guess.className = "guess";
      guess.textContent = entry.guess;

      const result = document.createElement("span");
      result.className = "result";
      result.textContent = `${entry.a}A${entry.b}B`;

      li.append(turn, guess, result);
      els.historyList.appendChild(li);
    }
  }

  function loadBest() {
    const raw = localStorage.getItem(BEST_KEY);
    const n = Number(raw);
    return Number.isInteger(n) && n > 0 ? n : null;
  }

  function renderBest() {
    const best = loadBest();
    els.best.textContent = best === null ? "—" : `${best} 次`;
  }

  function saveBestIfBetter(currentAttempts) {
    const best = loadBest();
    if (best === null || currentAttempts < best) {
      localStorage.setItem(BEST_KEY, String(currentAttempts));
      return true;
    }
    return false;
  }

  function showError(msg) {
    els.error.textContent = msg || "";
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isWon) return;

    const input = els.input.value.trim();
    const errMsg = validateGuess(input);
    if (errMsg) {
      showError(errMsg);
      return;
    }
    showError("");

    const { a, b } = computeAB(secret, input);
    attempts++;
    history.push({ guess: input, a, b });

    els.attempts.textContent = String(attempts);
    renderHistory();
    els.input.value = "";

    if (a === SECRET_LENGTH) {
      isWon = true;
      const isNewBest = saveBestIfBetter(attempts);
      renderBest();
      els.winMessage.textContent = isNewBest
        ? `恭喜過關！${attempts} 次，刷新個人最佳！`
        : `恭喜過關！共 ${attempts} 次。`;
      els.winBanner.hidden = false;
      els.input.disabled = true;
      els.restartBtn.focus();
    } else {
      els.input.focus();
    }
  }

  function startNewGame() {
    secret = generateSecret();
    attempts = 0;
    history = [];
    isWon = false;

    els.attempts.textContent = "0";
    els.historyList.innerHTML = "";
    els.winBanner.hidden = true;
    els.input.disabled = false;
    els.input.value = "";
    showError("");
    renderBest();
    els.input.focus();
  }

  els.form.addEventListener("submit", handleSubmit);
  els.restartBtn.addEventListener("click", startNewGame);

  startNewGame();
})();
