export const STATS = [
  {
    label: "Собрано за одну уборку (2023 г.)",
    value: "204 кг мусора",
    source: "экологическое движение 42",
  },
  {
    label: "Поступает в Белое море",
    value: "3 000 частиц/час",
    source: "Journal of Marine Science and Engineering",
  },
  {
    label: "Основной компонент состава",
    value: "48% — пластик",
    source: "экспедиционные данные",
  },
];

export const WASTE_COMPOSITION = [
  { type: "Мягкий пластик", percent: 28 },
  { type: "Твёрдый пластик", percent: 20 },
  { type: "Резина", percent: 22 },
  { type: "Металл", percent: 18 },
  { type: "Стекло", percent: 12 },
];

export const GLOBAL_FACTS = {
  title: "Мусорные пятна в океанах",
  description:
    "Мусорные пятна в океанах и морях формируются из пластика и синтетических отходов, которые переносятся реками, ветром и морскими течениями. Со временем крупные фрагменты дробятся и превращаются в микропластик, усиливая риски для морской флоры и фауны.",
  bbcFact:
    "Научный факт: оценка исследований показывает, что десятки небольших фрагментов пластика могут с высокой вероятностью привести к гибели морских птиц.",
};

export const GALLERY_ITEMS = [
  {
    id: "flipflop",
    name: "Резиновый тапок",
    material: "Резина",
    reason: "Потерян отдыхающими, унесен приливом.",
    image: "assets/images/flip-flop.png",
    details: "Один из самых частых предметов на берегу: легкий, плавучий и долговечный.",
  },
  {
    id: "carpet",
    name: "Полиэтиленовый пакет",
    material: "Мягкий пластик",
    reason: "Найден на побережье, унесен ветром.",
    image: "assets/images/polyethilen_bag.png",
    details: "Крупногабаритный бытовой мусор медленно разлагается и удерживает частицы пластика.",
  },
  {
    id: "pet-bottle",
    name: "Пластиковая бутылка",
    material: "Твёрдый пластик",
    reason: "Выброшена мимо бака, попала в реку.",
    image: "assets/images/plastic_bottle.png",
    details: "ПЭТ-бутылка быстро переносится течением и распадается на микропластик.",
  },
  {
    id: "car-plate",
    name: "Автомобильный номер",
    material: "Металл",
    reason: "Смыт в реку, приплыл с Северной Двиной.",
    image: "assets/images/liscense_plate.png",
    details: "Показывает, что мусор может попадать в море из городской среды на большом расстоянии.",
  },
  {
    id: "toy",
    name: "Детская игрушка",
    material: "Твёрдый пластик",
    reason: "Потеряна на пляже, смыта водой.",
    image: "assets/images/kids_toy.png",
    details: "Яркие пластиковые предметы часто принимаются птицами за пищу.",
  },
];

export const GAME_BINS = [
  { id: "soft-plastic", label: "Мягкий пластик", emoji: "🧴", color: "#4dc4ff" },
  { id: "hard-plastic", label: "Твёрдый пластик", emoji: "♻️", color: "#60a5fa" },
  { id: "glass-metal", label: "Стекло/Металл", emoji: "🥫", color: "#10B981" },
  { id: "rubber", label: "Резина", emoji: "🧤", color: "#F59E0B" },
];

export const GAME_ITEMS = [
  {
    id: "game-bottle",
    name: "Пластиковая бутылка",
    material: "ПЭТ",
    bin: "hard-plastic",
    reason: "Выброшена мимо бака, попала в реку.",
    image: "assets/images/plastic_bottle.png",
    fact: "Пластиковая бутылка может разлагаться сотни лет.",
  },
  {
    id: "game-carpet",
    name: "Полиэтиленовый пакет",
    material: "Полиэтилен",
    bin: "soft-plastic",
    reason: "Унесен ветром, попал в воду.",
    image: "assets/images/polyethilen_bag.png",
    fact: "Пакеты часто принимаются животными за пищу.",
  },
  {
    id: "game-flipflop",
    name: "Резиновый тапок",
    material: "Резина",
    bin: "rubber",
    reason: "Потерян отдыхающими, унесен приливом.",
    image: "assets/images/flip-flop.png",
    fact: "Резина долго сохраняется в морской среде.",
  },
  {
    id: "game-toy",
    name: "Детская игрушка",
    material: "Пластик",
    bin: "hard-plastic",
    reason: "Потеряна на пляже, смыта водой.",
    image: "assets/images/kids_toy.png",
    fact: "Яркие пластиковые предметы часто принимаются птицами за пищу.",
  },
  {
    id: "game-plate",
    name: "Автомобильный номер",
    material: "Металл + пластик",
    bin: "glass-metal",
    reason: "Смыт в реку во время паводка.",
    image: "assets/images/liscense_plate.png",
    fact: "Паводки переносят крупный мусор на большие расстояния.",
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

