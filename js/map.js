let map;
let parkLayer;
let ornithologyLayer;
let pollutionLayer;

const LOCATIONS = [
  {
    name: "Северодвинск (остров Ягры, пляж)",
    coords: [64.6067, 39.8152],
    type: "beach",
    description: "Популярное место отдыха. На пляже регулярно находят пластиковые бутылки, упаковку, обувь.",
    findings: "Пластиковые бутылки, тапки, рыболовные снасти",
  },
  {
    name: "Архангельск (набережная Северной Двины)",
    coords: [64.5365, 40.5133],
    type: "city",
    description: "Центральная набережная. Мусор с улиц города попадает в реку через ливневую канализацию.",
    findings: "Пластиковая упаковка, крышки, окурки, мелкий пластик",
  },
  {
    name: "д. Кянда (Онежский берег)",
    coords: [64.1351, 38.0825],
    type: "beach",
    description: "Побережье Онежского полуострова. Здесь мусор накапливается после путешествия по течениям.",
    findings: "Рыболовные сети, пластик, резиновые тапки, бутылки",
  },
  {
    name: "д. Рикасиха (Приморский р-н)",
    coords: [64.535, 40.165],
    type: "village",
    description: "Деревня на берегу Северной Двины. Местный мусор попадает в реку в период таяния снегов.",
    findings: "Бытовой мусор, пластик, стекло",
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
  }
  return L.divIcon({
    html: `<div style="background:${color};width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 8px rgba(0,0,0,0.2);border:2px solid white;">${emoji}</div>`,
    iconSize: [32, 32],
    className: "custom-marker",
  });
}

function popupContent(location) {
  return `
    <div class="custom-popup">
      <h4>${location.name}</h4>
      <p><strong>Находки:</strong> ${location.findings}</p>
      <p><strong>Подробнее:</strong> ${location.description}</p>
    </div>
  `;
}

function loadParkBoundary() {
  fetch("assets/geojsons/onezh_pomor_park.geojson")
    .then((response) => response.json())
    .then((geojson) => {
      parkLayer = L.geoJSON(geojson, {
        style: {
          fillColor: "#3b82f6",
          fillOpacity: 0.1,
          color: "#2563eb",
          weight: 2,
        },
      }).addTo(map);
    })
    .catch((error) => {
      console.error("Error loading park boundary:", error);
    });
}

function loadOrnithologySites() {
  fetch("assets/geojsons/key_ornithology_sites.geojson")
    .then((response) => response.json())
    .then((geojson) => {
      ornithologyLayer = L.geoJSON(geojson, {
        style: {
          fillColor: "#10b981",
          fillOpacity: 0.2,
          color: "#059669",
          weight: 2,
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          layer.bindPopup(`
            <div class="custom-popup">
              <h4>${props.Russ_Name}</h4>
              <p><strong>Код:</strong> ${props.Russ_Code}</p>
              <p><strong>Критерий:</strong> ${props.Criterion}</p>
              <p><strong>Площадь:</strong> ${props.OFFIC_AREA} га</p>
            </div>
          `);
        },
      }).addTo(map);
    })
    .catch((error) => {
      console.error("Error loading ornithology sites:", error);
    });
}

function loadPollution() {
  fetch("assets/geojsons/pollution.geojson")
    .then((response) => response.json())
    .then((geojson) => {
      const filteredFeatures = geojson.features.filter(f => f.properties.severity !== "medium");
      
      pollutionLayer = L.geoJSON({
        type: "FeatureCollection",
        features: filteredFeatures
      }, {
        style: (feature) => {
          const severity = feature.properties?.severity || "low";
          const colors = {
            high: "#e31a23",
            low: "#f5a623",
          };
          return {
            fillColor: colors[severity] || "#f5a623",
            fillOpacity: 0.4,
            color: colors[severity] || "#f5a623",
            weight: 3,
          };
        },
        pointToLayer: (feature, latlng) => {
          const props = feature.properties;
          const severity = props?.severity || "low";
          const colors = {
            high: "#e31a23",
            low: "#f5a623",
          };
          return L.circleMarker(latlng, {
            radius: 10,
            fillColor: colors[severity],
            color: "#fff",
            weight: 2,
            fillOpacity: 0.9,
          });
        },
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          layer.bindPopup(`
            <div class="custom-popup">
              <h4>${props.name}</h4>
              <p>${props.description}</p>
              <p><strong>Тип:</strong> ${props.type}</p>
              <p><strong>Уровень:</strong> ${props.severity === "high" ? "Высокий" : "Низкий"}</p>
            </div>
          `);
        },
      }).addTo(map);
    })
    .catch((error) => {
      console.error("Error loading pollution data:", error);
    });
}

function addLegend() {
  const legend = L.control({ position: "bottomright" });

  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "map-legend");
    div.innerHTML = `
      <h4>Легенда</h4>
      <div class="legend-item">
        <span class="legend-color" style="background: #e31a23; opacity: 0.5;"></span>
        <span>Зоны загрязнения (высокий)</span>
      </div>
      <div class="legend-item">
        <span class="legend-color" style="background: #f5a623; opacity: 0.5;"></span>
        <span>Зоны загрязнения (низкий)</span>
      </div>
      <div class="legend-item">
        <span class="legend-color" style="background: #2563eb; opacity: 0.2;"></span>
        <span>Национальный парк</span>
      </div>
      <div class="legend-item">
        <span class="legend-color" style="background: #059669; opacity: 0.2;"></span>
        <span>Орнитологические территории</span>
      </div>
      <div class="legend-divider"></div>
      <div class="legend-item">
        <span class="legend-marker" style="background: #3B82F6;">🏙️</span>
        <span>Город</span>
      </div>
      <div class="legend-item">
        <span class="legend-marker" style="background: #F59E0B;">🏖️</span>
        <span>Пляж</span>
      </div>
      <div class="legend-item">
        <span class="legend-marker" style="background: #10B981;">📍</span>
        <span>Поселение</span>
      </div>
    `;
    return div;
  };

  legend.addTo(map);
}

export function initMap() {
  const mapContainer = document.querySelector("#map");
  if (!mapContainer || typeof L === "undefined") return;

  map = L.map("map").setView([64.5, 38.5], 7);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    subdomains: "abcd",
    minZoom: 6,
    maxZoom: 13,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CartoDB',
  }).addTo(map);

  LOCATIONS.forEach((loc) => {
    L.marker(loc.coords, { icon: getIcon(loc.type) })
      .bindPopup(popupContent(loc))
      .addTo(map);
  });

  loadParkBoundary();
  loadOrnithologySites();
  loadPollution();
  addLegend();
}

export function initMapControls() {}