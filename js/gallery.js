import { GALLERY_ITEMS } from "./data.js";

const filters = ["Все", "Пластик", "Резина", "Металл", "Синтетика", "Пластик/металл"];

export function initGallery(openModal) {
  const filtersRoot = document.querySelector("#gallery-filters");
  const grid = document.querySelector("#gallery-grid");
  if (!filtersRoot || !grid) return;

  let currentFilter = "Все";

  const renderFilters = () => {
    filtersRoot.innerHTML = "";
    filters.forEach((filter) => {
      const btn = document.createElement("button");
      btn.className = `btn filter-btn ${currentFilter === filter ? "active" : ""}`;
      btn.type = "button";
      btn.textContent = filter;
      btn.addEventListener("click", () => {
        currentFilter = filter;
        renderFilters();
        renderGrid();
      });
      filtersRoot.append(btn);
    });
  };

  const renderGrid = () => {
    const items =
      currentFilter === "Все"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.material.toLowerCase() === currentFilter.toLowerCase());

    grid.innerHTML = "";
    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "gallery-card";
      card.tabIndex = 0;
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <div class="gallery-card-content">
          <h3>${item.name}</h3>
          <p><strong>Материал:</strong> ${item.material}</p>
          <p>${item.reason}</p>
        </div>
      `;

      const open = () => openModal(item);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      });
      grid.append(card);
    });
  };

  renderFilters();
  renderGrid();
}
