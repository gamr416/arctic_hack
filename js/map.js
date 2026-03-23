import { MAP_CURRENTS, PARTICLE_PRESETS } from "./data.js";

let map;
let sourceLayer;
let cleanupLayer;
let currentLayer;
let mapCanvas;
let ctx;
let particles = [];
let animationId = null;
let currentPreset = PARTICLE_PRESETS.bottle;

const LOCATIONS = [
  {
    name: "Северодвинск (остров Ягры, пляж)",
    coords: [64.6067, 39.8152],
    type: "beach",
    description:
      "Популярное место отдыха. На пляже регулярно находят пластиковые бутылки, упаковку, обувь. Часть мусора уносится в море во время приливов.",
    findings: "Пластиковые бутылки, тапки, рыболовные снасти",
    source: "Бытовой мусор отдыхающих, морские выбросы",
  },
  {
    name: "Архангельск (набережная Северной Двины, р-н ул. Свободы)",
    coords: [64.5365, 40.5133],
    type: "city",
    description: "Центральная набережная. Мусор с улиц города попадает в реку через ливневую канализацию и во время паводков.",
    findings: "Пластиковая упаковка, крышки, окурки, мелкий пластик",
    source: "Городской сток, несанкционированные свалки",
  },
  {
    name: "Архангельск (остров Краснофлотский, пляж)",
    coords: [64.5028, 40.5835],
    type: "beach",
    description: "Пляж в черте города. Здесь хорошо видно, как река выносит мусор из городской агломерации.",
    findings: "Бутылки, полиэтиленовые пакеты, строительный мусор",
    source: "Речной вынос из Северной Двины",
  },
  {
    name: "Остров Соловецкий (Тамарин причал)",
    coords: [65.0232, 35.7001],
    type: "hotspot",
    description:
      "Особо охраняемая природная территория. Несмотря на удаленность, здесь находят мусор, принесенный течениями из Белого моря.",
    findings: "Сети, пластик, метеозонды, необычные предметы",
    source: "Морские течения, судоходство",
  },
  {
    name: "д. Рикасиха (Приморский р-н, выход к Никольскому рукаву)",
    coords: [64.535, 40.165],
    type: "village",
    description: "Деревня на берегу Северной Двины. Местный мусор попадает в реку, особенно в период таяния снегов.",
    findings: "Бытовой мусор, пластик, стекло",
    source: "Прибрежные поселения, речной вынос",
  },
  {
    name: "Пос. Первомайский (Новодвинск, берег реки)",
    coords: [64.459, 40.814],
    type: "city",
    description: "Промышленная зона Новодвинска. Вблизи находится целлюлозно-бумажный комбинат.",
    findings: "Промышленные отходы, пластик, упаковка",
    source: "Промышленность, городской сток",
  },
  {
    name: "д. Кянда (Онежский берег Белого моря)",
    coords: [64.1351, 38.0825],
    type: "beach",
    description: "Побережье Онежского полуострова. Здесь мусор накапливается после путешествия по течениям.",
    findings: "Рыболовные сети, пластик, резиновые тапки, бутылки",
    source: "Морские течения, приливные выбросы",
  },
];

function getIcon(type) {
  let color = "#10B981";
  let emoji = "📍";
  if (type === "city") {
    color = "#3B82F6";
    emoji = "🏙️";
  } else if (type === "beach") {
    color = "#F59E0B";
    emoji = "🏖️";
  } else if (type === "hotspot") {
    color = "#EF4444";
    emoji = "⚠️";
  }
  return L.divIcon({
    html: `<div style="background:${color};width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 8px rgba(0,0,0,0.2);border:2px solid white;">${emoji}</div>`,
    iconSize: [32, 32],
    className: "custom-marker",
  });
}

function getTypeBadge(type) {
  if (type === "city") return "Городской источник";
  if (type === "beach") return "Пляж / место уборки";
  if (type === "hotspot") return "Очаг загрязнения";
  return "Поселение";
}

function popupContent(location) {
  return `
    <div class="custom-popup">
      <h4>${location.name}</h4>
      <p><strong>Находки:</strong> ${location.findings}</p>
      <p><strong>Источник:</strong> ${location.source}</p>
      <p><strong>Подробнее:</strong> ${location.description}</p>
      <div class="type-badge">${getTypeBadge(location.type)}</div>
    </div>
  `;
}

function makeSourceLayer() {
  const sourceMarkers = LOCATIONS.filter((loc) => loc.type !== "beach").map((loc) =>
    L.marker(loc.coords, { icon: getIcon(loc.type) }).bindPopup(popupContent(loc)),
  );
  return L.layerGroup(sourceMarkers);
}

function makeCleanupLayer() {
  const cleanupMarkers = LOCATIONS.filter((loc) => loc.type === "beach").map((loc) =>
    L.marker(loc.coords, { icon: getIcon(loc.type) }).bindPopup(popupContent(loc)),
  );
  return L.layerGroup(cleanupMarkers);
}

function makeCurrentsLayer() {
  return L.layerGroup(
    MAP_CURRENTS.map((line) =>
      L.polyline(line.points, {
        color: "#4dc4ff",
        weight: 2,
        opacity: 0.4,
      }).bindPopup(`<strong>${line.name}</strong>`),
    ),
  );
}

function resizeCanvas() {
  const rect = map.getContainer().getBoundingClientRect();
  mapCanvas.width = rect.width;
  mapCanvas.height = rect.height;
}

function buildParticles() {
  particles = [];
  MAP_CURRENTS.forEach((route) => {
    const segmentCount = route.points.length - 1;
    for (let i = 0; i < currentPreset.count; i += 1) {
      particles.push({
        route: route.points,
        t: Math.random(),
        speed: currentPreset.speed * (0.8 + Math.random() * 0.4),
        segmentCount,
      });
    }
  });
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function latLngOnRoute(route, t) {
  const totalSegments = route.length - 1;
  const scaled = t * totalSegments;
  const i = Math.min(Math.floor(scaled), totalSegments - 1);
  const localT = scaled - i;
  const start = route[i];
  const end = route[i + 1];
  return [lerp(start[0], end[0], localT), lerp(start[1], end[1], localT)];
}

function animate() {
  ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
  ctx.fillStyle = currentPreset.color;
  particles.forEach((particle) => {
    particle.t += particle.speed;
    if (particle.t > 1) particle.t = 0;

    const [lat, lng] = latLngOnRoute(particle.route, particle.t);
    const point = map.latLngToContainerPoint([lat, lng]);
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3.2, 0, Math.PI * 2);
    ctx.fill();
  });
  animationId = requestAnimationFrame(animate);
}

function toggleLayer(name, visible) {
  const layerMap = {
    sources: sourceLayer,
    cleanups: cleanupLayer,
    currents: currentLayer,
  };
  const layer = layerMap[name];
  if (!layer) return;
  if (visible && !map.hasLayer(layer)) layer.addTo(map);
  if (!visible && map.hasLayer(layer)) map.removeLayer(layer);
}

export function initMap() {
  const mapContainer = document.querySelector("#map");
  mapCanvas = document.querySelector("#map-canvas");
  if (!mapContainer || !mapCanvas || typeof L === "undefined") return;

  map = L.map("map").setView([64.2, 39.5], 7);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    subdomains: "abcd",
    minZoom: 6,
    maxZoom: 13,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CartoDB',
  }).addTo(map);

  sourceLayer = makeSourceLayer().addTo(map);
  cleanupLayer = makeCleanupLayer().addTo(map);
  currentLayer = makeCurrentsLayer().addTo(map);

  ctx = mapCanvas.getContext("2d");
  resizeCanvas();
  buildParticles();

  map.on("move zoom resize", resizeCanvas);
  map.on("move zoom", () => {
    if (!animationId) return;
    ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
  });
}

export function initMapControls() {
  const animateBtn = document.querySelector("#animate-btn");
  const layerInputs = document.querySelectorAll("[data-layer]");
  const particleInputs = document.querySelectorAll('input[name="particle"]');

  layerInputs.forEach((input) => {
    input.addEventListener("change", () => {
      toggleLayer(input.dataset.layer, input.checked);
    });
  });

  particleInputs.forEach((input) => {
    input.addEventListener("change", () => {
      currentPreset = PARTICLE_PRESETS[input.value] || PARTICLE_PRESETS.bottle;
      buildParticles();
    });
  });

  animateBtn?.addEventListener("click", () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
      ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
      animateBtn.textContent = "Показать путь";
      return;
    }
    if (!particles.length) buildParticles();
    animate();
    animateBtn.textContent = "Скрыть путь";
  });
}
