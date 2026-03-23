export const STATS = [
  { label: "Собрано за одну уборку", value: "204 кг мусора", source: "движение 42" },
  { label: "Поступает в Белое море", value: "3 000 частиц/час", source: "plus-one.ru" },
  { label: "Крупный мусор", value: "70% — рыболовные сети", source: "экспедиционные данные" },
];

export const WASTE_COMPOSITION = [
  { type: "Пластик", percent: 48 },
  { type: "Резина", percent: 22 },
  { type: "Металл", percent: 18 },
  { type: "Стекло", percent: 12 },
];

export const GLOBAL_FACTS = {
  title: "Большое мусорное пятно в Тихом океане",
  description:
    "Масштаб мусорного скопления сопоставим с площадью крупного государства и продолжает расти из-за речного стока и судоходства.",
  bbcFact: "23 кусочка пластика достаточно, чтобы с вероятностью 90% убить морскую птицу.",
};

export const GALLERY_ITEMS = [
  {
    id: "slipper",
    name: "Резиновый тапок",
    material: "Резина",
    reason: "Потерян отдыхающими, унесен приливом.",
    image: "assets/images/item-slipper.svg",
    details: "Один из самых частых предметов на берегу: легкий, плавучий и долговечный.",
  },
  {
    id: "fishing-net",
    name: "Рыболовная сеть",
    material: "Синтетика",
    reason: "Брошена или потеряна рыбаками.",
    image: "assets/images/item-net.svg",
    details: "Сети формируют значительную часть крупного морского мусора и опасны для животных.",
  },
  {
    id: "pet-bottle",
    name: "Пластиковая бутылка",
    material: "Пластик",
    reason: "Выброшена мимо бака, попала в реку.",
    image: "assets/images/item-bottle.svg",
    details: "ПЭТ-бутылка быстро переносится течением и распадается на микропластик.",
  },
  {
    id: "car-plate",
    name: "Автомобильный номер",
    material: "Металл",
    reason: "Смыт в реку, приплыл с Северной Двиной.",
    image: "assets/images/item-plate.svg",
    details: "Показывает, что мусор может попадать в море из городской среды на большом расстоянии.",
  },
  {
    id: "carpet",
    name: "Ковёр",
    material: "Синтетика",
    reason: "Найден на побережье, источник неизвестен.",
    image: "assets/images/item-carpet.svg",
    details: "Крупногабаритный бытовой мусор медленно разлагается и удерживает частицы пластика.",
  },
  {
    id: "toy",
    name: "Детская игрушка",
    material: "Пластик",
    reason: "Потеряна на пляже, смыта водой.",
    image: "assets/images/item-toy.svg",
    details: "Яркие пластиковые предметы часто принимаются птицами за пищу.",
  },
  {
    id: "meteo-probe",
    name: "Метеозонд",
    material: "Пластик/металл",
    reason: "Запущен для исследований, упал в море.",
    image: "assets/images/item-probe.svg",
    details: "Даже научные и технические объекты при потере становятся отходами.",
  },
  {
    id: "can",
    name: "Банка из-под напитков",
    material: "Металл",
    reason: "Оставлена на берегу, унесена приливом.",
    image: "assets/images/item-can.svg",
    details: "Алюминиевые банки ценны для переработки, но в природе могут сохраняться десятилетиями.",
  },
];

export const GAME_BINS = [
  { id: "plastic", label: "Пластик", emoji: "♻️", color: "#3B82F6" },
  { id: "glass-metal", label: "Стекло/Металл", emoji: "🥫", color: "#10B981" },
  { id: "rubber-synthetic", label: "Резина/Синтетика", emoji: "🧤", color: "#F59E0B" },
  { id: "special", label: "Спецотходы", emoji: "⚠️", color: "#EF4444" },
];

export const GAME_ITEMS = [
  {
    id: "game-bottle",
    name: "Пластиковая бутылка",
    material: "ПЭТ",
    bin: "plastic",
    reason: "Выброшена мимо бака, попала в реку.",
    image: "assets/images/item-bottle.svg",
    fact: "Пластиковая бутылка может разлагаться сотни лет.",
  },
  {
    id: "game-slipper",
    name: "Резиновый тапок",
    material: "Резина",
    bin: "rubber-synthetic",
    reason: "Потерян отдыхающими, унесен приливом.",
    image: "assets/images/item-slipper.svg",
    fact: "Резина долго сохраняется в морской среде.",
  },
  {
    id: "game-net",
    name: "Рыболовная сеть",
    material: "Нейлон",
    bin: "rubber-synthetic",
    reason: "Брошена рыбаками, дрейфует годами.",
    image: "assets/images/item-net.svg",
    fact: "Сети особенно опасны для птиц и морских животных.",
  },
  {
    id: "game-can",
    name: "Алюминиевая банка",
    material: "Алюминий",
    bin: "glass-metal",
    reason: "Оставлена на берегу, унесена водой.",
    image: "assets/images/item-can.svg",
    fact: "Алюминий можно многократно перерабатывать.",
  },
  {
    id: "game-glass-bottle",
    name: "Стеклянная бутылка",
    material: "Стекло",
    bin: "glass-metal",
    reason: "Выброшена, разбилась, осколки опасны.",
    image: "assets/images/item-bottle.svg",
    fact: "Стекло не разлагается быстро и травмирует животных.",
  },
  {
    id: "game-plate",
    name: "Автомобильный номер",
    material: "Металл + пластик",
    bin: "glass-metal",
    reason: "Смыт в реку во время паводка.",
    image: "assets/images/item-plate.svg",
    fact: "Паводки переносят крупный мусор на большие расстояния.",
  },
  {
    id: "game-probe",
    name: "Метеозонд",
    material: "Пластик, металл",
    bin: "special",
    reason: "Упал в море после исследования.",
    image: "assets/images/item-probe.svg",
    fact: "Спецотходы требуют отдельного обращения и утилизации.",
  },
  {
    id: "game-bag",
    name: "Полиэтиленовый пакет",
    material: "Полиэтилен",
    bin: "plastic",
    reason: "Унесен ветром, попал в воду.",
    image: "assets/images/item-carpet.svg",
    fact: "Пакеты часто принимаются животными за пищу.",
  },
];

export const MAP_SOURCES = [
  { name: "Архангельск", lat: 64.5393, lng: 40.5169, wasteEstimate: "≈ 900 частиц/час" },
  { name: "Новодвинск", lat: 64.4165, lng: 40.8122, wasteEstimate: "≈ 450 частиц/час" },
  { name: "Северодвинск", lat: 64.5635, lng: 39.8302, wasteEstimate: "≈ 600 частиц/час" },
  { name: "Холмогоры", lat: 64.2226, lng: 41.6565, wasteEstimate: "≈ 300 частиц/час" },
  { name: "Емецк", lat: 63.4764, lng: 41.0496, wasteEstimate: "≈ 200 частиц/час" },
];

export const MAP_CLEANUPS = [
  {
    name: "Побережье у Пертоминска",
    lat: 64.7492,
    lng: 38.4135,
    total: "204 кг",
    types: "Сети, пластик, резина",
  },
  {
    name: "Остров Ягры",
    lat: 64.5907,
    lng: 39.7474,
    total: "126 кг",
    types: "Пластик, металл, стекло",
  },
];

export const MAP_CURRENTS = [
  {
    name: "Течение Северной Двины",
    points: [
      [64.22, 41.65],
      [64.42, 40.81],
      [64.54, 40.52],
      [64.67, 40.2],
    ],
  },
  {
    name: "Прибрежное течение Белого моря",
    points: [
      [64.67, 40.2],
      [64.72, 39.95],
      [64.73, 39.5],
      [64.74, 38.9],
      [64.75, 38.41],
    ],
  },
];

export const PARTICLE_PRESETS = {
  bottle: { label: "Бутылка", color: "#f7a72a", speed: 0.0008, count: 18 },
  bag: { label: "Пакет", color: "#4dc4ff", speed: 0.0006, count: 14 },
  net: { label: "Сеть", color: "#ff6b6b", speed: 0.00045, count: 10 },
};

