import { STATS } from "./data.js";
import { initGallery } from "./gallery.js";
import { initGame } from "./game.js";
import { initMap } from "./map.js";

function initGlobalSection() {
  const canvas = document.querySelector("#particles-canvas");
  const context = canvas?.getContext("2d");

  if (!context || !canvas) return;
  const particles = Array.from({ length: 26 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: 0.5 + Math.random() * 1.2,
    radius: 1 + Math.random() * 2.5,
  }));

  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#4dc4ff";
    particles.forEach((p) => {
      p.y += p.speed;
      if (p.y > canvas.height + 5) p.y = -5;
      context.beginPath();
      context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      context.fill();
    });
    requestAnimationFrame(draw);
  };
  draw();
}

function initStats() {
  const statsGrid = document.querySelector("#stats-grid");
  if (!statsGrid) return;

  STATS.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "stat-card";
    card.innerHTML = `
      <p>${entry.label}</p>
      <p class="stat-value">${entry.value}</p>
      <p>${entry.source}</p>
    `;
    statsGrid.append(card);
  });

}

function setupModal() {
  const modal = document.querySelector("#item-modal");
  const closeBtn = document.querySelector("#modal-close");
  const closeTargets = document.querySelectorAll("[data-modal-close]");

  const openModal = (item) => {
    document.querySelector("#modal-image").src = item.image;
    document.querySelector("#modal-image").alt = item.name;
    document.querySelector("#modal-title").textContent = item.name;
    document.querySelector("#modal-material").textContent = item.material;
    document.querySelector("#modal-reason").textContent = item.reason;
    document.querySelector("#modal-details").textContent = item.details;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  closeBtn?.addEventListener("click", closeModal);
  closeTargets.forEach((node) => node.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  return openModal;
}

function boot() {
  initGlobalSection();
  initStats();
  initMap();
  const gameController = initGame();
  const openModal = setupModal();
  initGallery(openModal);
}

document.addEventListener("DOMContentLoaded", boot);
