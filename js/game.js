import { GAME_BINS, GAME_ITEMS } from "./data.js";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function initGame() {
  const startBtn = document.querySelector("#game-start");
  const binsRoot = document.querySelector("#game-bins");
  const itemLayer = document.querySelector("#game-item-layer");
  const scoreNode = document.querySelector("#game-score");
  const messageNode = document.querySelector("#game-message");
  const eduNode = document.querySelector("#game-education");
  const areaNode = document.querySelector("#game-area");

  if (!startBtn || !binsRoot || !itemLayer || !scoreNode || !messageNode || !areaNode) return;

  let queue = [];
  let current = null;
  let score = 0;
  let mistakes = 0;
  let active = false;
  let selectedItemId = null;
  let startedAt = 0;

  const setMessage = (text) => {
    messageNode.textContent = text;
  };

  const showEduCard = (item) => {
    eduNode.hidden = false;
    eduNode.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h4>${item.name}</h4>
        <p><strong>Материал:</strong> ${item.material}</p>
        <p><strong>Почему в море:</strong> ${item.reason}</p>
        <p><strong>Факт:</strong> ${item.fact}</p>
      </div>
    `;
    setTimeout(() => {
      eduNode.hidden = true;
    }, 3000);
  };

  const paintBins = () => {
    binsRoot.innerHTML = "";
    GAME_BINS.forEach((bin, idx) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "bin-card";
      card.dataset.bin = bin.id;
      card.style.borderColor = bin.color;
      card.innerHTML = `
        <span class="bin-icon">${bin.emoji}</span>
        <div class="bin-info">
          <strong>${bin.label}</strong>
          <small>Клавиша ${idx + 1}</small>
        </div>
      `;
      card.addEventListener("dragover", (event) => event.preventDefault());
      card.addEventListener("click", () => {
        if (!active || !selectedItemId) return;
        const activeItem = current && current.id === selectedItemId ? current : null;
        if (activeItem) checkDrop(bin.id);
      });
      card.addEventListener("drop", (event) => {
        event.preventDefault();
        if (!active) return;
        const binId = event.currentTarget.dataset.bin;
        checkDrop(binId);
      });
      binsRoot.append(card);
    });
  };

  const updateScore = () => {
    scoreNode.textContent = `Очки: ${score} | Ошибки: ${mistakes}`;
  };

  const clearHighlights = () => {
    binsRoot.querySelectorAll(".bin-card").forEach((node) => node.classList.remove("ok", "bad"));
  };

  const spawnItem = () => {
    itemLayer.innerHTML = "";
    selectedItemId = null;
    
    if (!queue.length) {
      queue = shuffle(GAME_ITEMS);
    }

    current = queue.shift();
    const item = document.createElement("button");
    item.type = "button";
    item.className = "game-item wave-in";
    item.draggable = true;
    item.dataset.itemId = current.id;
    item.setAttribute("aria-label", `Предмет: ${current.name}`);
    const areaRect = areaNode.getBoundingClientRect();
    item.style.left = `${20 + Math.random() * (areaRect.width - 150)}px`;
    item.style.top = `${20 + Math.random() * (areaRect.height - 150)}px`;
    item.innerHTML = `<img src="${current.image}" alt="${current.name}" /><span>${current.name}</span>`;

    item.addEventListener("dragstart", () => {
      selectedItemId = current.id;
      item.classList.add("dragging");
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });

    let pointerOffsetX = 0;
    let pointerOffsetY = 0;
    const onMove = (event) => {
      if (!item.hasPointerCapture(event.pointerId)) return;
      const areaRect = areaNode.getBoundingClientRect();
      const x = event.clientX - areaRect.left - pointerOffsetX;
      const y = event.clientY - areaRect.top - pointerOffsetY;
      item.style.left = `${Math.max(0, Math.min(areaRect.width - 90, x))}px`;
      item.style.top = `${Math.max(0, Math.min(areaRect.height - 90, y))}px`;
    };
    item.addEventListener("pointerdown", (event) => {
      selectedItemId = current.id;
      const rect = item.getBoundingClientRect();
      pointerOffsetX = event.clientX - rect.left;
      pointerOffsetY = event.clientY - rect.top;
      item.setPointerCapture(event.pointerId);
    });
    item.addEventListener("pointermove", onMove);
    item.addEventListener("pointerup", (event) => {
      if (item.hasPointerCapture(event.pointerId)) item.releasePointerCapture(event.pointerId);
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest(".bin-card");
      if (target) checkDrop(target.dataset.bin);
    });

    item.addEventListener("focus", () => {
      selectedItemId = current.id;
      setMessage("Выбран предмет. Нажмите 1-4 для сортировки в контейнер.");
    });

    itemLayer.append(item);
  };

  const blinkBin = (binId, ok) => {
    const bin = binsRoot.querySelector(`[data-bin="${binId}"]`);
    if (!bin) return;
    bin.classList.add(ok ? "ok" : "bad");
    setTimeout(() => bin.classList.remove(ok ? "ok" : "bad"), 450);
  };

  const checkDrop = (binId) => {
    if (!current || !active) return;
    clearHighlights();
    if (current.bin === binId) {
      score += 1;
      updateScore();
      blinkBin(binId, true);
      showEduCard(current);
      setMessage("Верно! Продолжай очищать побережье.");
      spawnItem();
      return;
    }
    mistakes += 1;
    updateScore();
    blinkBin(binId, false);
    const node = itemLayer.querySelector(".game-item");
    if (node) node.classList.add("shake");
    setTimeout(() => node?.classList.remove("shake"), 350);
    setMessage("Не тот контейнер! Попробуй еще раз.");
  };

  const start = () => {
    queue = shuffle(GAME_ITEMS);
    current = null;
    score = 0;
    mistakes = 0;
    active = true;
    startedAt = Date.now();
    updateScore();
    eduNode.hidden = true;
    setMessage("Перетащи мусор в нужный контейнер.");
    spawnItem();
  };

  document.addEventListener("keydown", (event) => {
    if (!active || !current) return;
    const map = { 
      "1": GAME_BINS[0].id, 
      "2": GAME_BINS[1].id, 
      "3": GAME_BINS[2].id, 
      "4": GAME_BINS[3].id,
      "5": GAME_BINS[4].id 
    };
    if (map[event.key]) {
      checkDrop(map[event.key]);
    }
  });

  paintBins();
  updateScore();
  startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    start();
  });

  return { start };
}
