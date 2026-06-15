import React, { useState } from 'react';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const RESULTS = [
  { group:"A", date:"11 июня", home:"Мексика",    hf:"🇲🇽", away:"ЮАР",        af:"🇿🇦", hs:2, as_:0 },
  { group:"A", date:"11 июня", home:"Ю. Корея",   hf:"🇰🇷", away:"Чехия",      af:"🇨🇿", hs:2, as_:1 },
  { group:"B", date:"12 июня", home:"Канада",     hf:"🇨🇦", away:"Босния",     af:"🇧🇦", hs:1, as_:1 },
  { group:"B", date:"13 июня", home:"Катар",      hf:"🇶🇦", away:"Швейцария",  af:"🇨🇭", hs:1, as_:1 },
  { group:"C", date:"13 июня", home:"Бразилия",   hf:"🇧🇷", away:"Марокко",    af:"🇲🇦", hs:1, as_:1 },
  { group:"C", date:"13 июня", home:"Гаити",      hf:"🇭🇹", away:"Шотландия",  af:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", hs:0, as_:1 },
  { group:"D", date:"13 июня", home:"США",         hf:"🇺🇸", away:"Парагвай",   af:"🇵🇾", hs:4, as_:1 },
  { group:"D", date:"14 июня", home:"Австралия",  hf:"🇦🇺", away:"Турция",     af:"🇹🇷", hs:2, as_:0 },
  { group:"E", date:"14 июня", home:"Германия",   hf:"🇩🇪", away:"Кюрасао",    af:"🇨🇼", hs:7, as_:1 },
  { group:"E", date:"15 июня", home:"Кот-д'Ив.", hf:"🇨🇮", away:"Эквадор",    af:"🇪🇨", hs:1, as_:0 },
  { group:"F", date:"14 июня", home:"Нидерланды", hf:"🇳🇱", away:"Япония",     af:"🇯🇵", hs:2, as_:2 },
  { group:"F", date:"15 июня", home:"Швеция",     hf:"🇸🇪", away:"Тунис",      af:"🇹🇳", hs:5, as_:1 },
];

const PREDICTIONS = [
  {
    id:1, group:"H", date:"15.06", time:"19:00", today:true,
    home:"Испания",      hf:"🇪🇸", hFifa:1,
    away:"Кабо-Верде",  af:"🇨🇻", aFifa:75,
    venue:"Атланта",
    p1:84, x:11, p2:5, o25:77, o35:52,
    bestBet:"П1 + ТБ 2.5", score:"3:0",
    formation:"4-3-3 vs 5-4-1",
    keyDuel:"Ямаль vs. левый фланг Кабо-Верде",
    analysis:"Испания — абсолютный фаворит. Ламин Ямаль, Педри и дуэт Мората-Торрес создают подавляющее атакующее преимущество. Кабо-Верде построят низкий блок 5-4-1, рассчитывая на контратаки. Против скоростного давления Испании это не поможет: ожидается 65%+ владения, 15+ ударов, xG выше 3.0. Флангами Ямаль и Куэста разрежут оборону соперника в нескольких эпизодах уже в первом тайме.",
  },
  {
    id:2, group:"G", date:"15.06", time:"22:00", today:true,
    home:"Бельгия",      hf:"🇧🇪", hFifa:5,
    away:"Египет",       af:"🇪🇬", aFifa:34,
    venue:"Сиэтл",
    p1:52, x:27, p2:21, o25:54, o35:29,
    bestBet:"П1", score:"2:1",
    formation:"4-3-3 vs 4-3-3",
    keyDuel:"Де Брюйне vs. египетский блок в центре",
    analysis:"Де Брюйне — мозг и мотор бельгийской атаки. Опенда и Тилеманс добавляют глубины. «Красные дьяволы» строят игру через быстрые треугольники и вертикальные передачи. Египет ставит всё на Салаха: без его голевых эпизодов атакующий потенциал команды резко снижается. Ожидается открытый матч с шансами с обеих сторон — Египет не закроется полностью, будет искать Салаха за спинами защитников.",
  },
  {
    id:3, group:"H", date:"16.06", time:"04:00", today:false,
    home:"Сауд. Аравия", hf:"🇸🇦", hFifa:56,
    away:"Уругвай",      af:"🇺🇾", aFifa:14,
    venue:"Майами",
    p1:25, x:31, p2:44, o25:41, o35:17,
    bestBet:"П2", score:"0:2",
    formation:"4-4-2 vs 4-3-3",
    keyDuel:"Нуньес vs. центральный блок Саудовской Аравии",
    analysis:"Уругвай нового поколения — Вальверде, Нуньес, Бентанкур. Саудиты умеют удивлять (Аргентина 2022), но против тактически организованного Уругвая это сложнее. Ожидается прагматичный матч с низким темпом. «Небесно-голубые» контролируют центр, реализуют один из стандартов или шансов Нуньеса. Саудиты будут ждать своей контратаки — и, возможно, создадут 1-2 момента, но не реализуют.",
  },
  {
    id:4, group:"G", date:"16.06", time:"07:00", today:false,
    home:"Иран",         hf:"🇮🇷", hFifa:23,
    away:"Н. Зеландия",  af:"🇳🇿", aFifa:91,
    venue:"Лос-Анджелес",
    p1:57, x:26, p2:17, o25:39, o35:16,
    bestBet:"П1 + ТМ 3.0", score:"2:0",
    formation:"4-2-3-1 vs 4-4-2",
    keyDuel:"Азмун vs. центрбек Новой Зеландии",
    analysis:"Иран — хорошо организованная команда с чёткой структурой 4-2-3-1. Используют компактный оборонительный блок и быстрые вертикальные контратаки через Азмуна. Новая Зеландия дебютирует на ЧМ и представляет слабейшую конфедерацию ОФК. Разрыв в классе будет очевиден — но иранцы не забивают много: победа на минимуме голов с надёжной «сухой» игрой сзади.",
  },
  {
    id:5, group:"I", date:"17.06", time:"01:00", today:false,
    home:"Франция",      hf:"🇫🇷", hFifa:2,
    away:"Сенегал",      af:"🇸🇳", aFifa:20,
    venue:"Нью-Джерси",
    p1:53, x:27, p2:20, o25:49, o35:23,
    bestBet:"П1 / Обе забьют", score:"2:1",
    formation:"4-2-3-1 vs 4-3-3",
    keyDuel:"Мбаппе vs. Калиду Кулибали",
    analysis:"Мбаппе против физической мощи сенегальцев — ключевая интрига группы I. Франция в 4-2-3-1 с Камавингой и Чуамени в «двойке» создаёт пространство для Мбаппе. Сенегал — чемпион АФКОН, физически одна из сильнейших команд турнира. Иллиман Нтиай в воротах надёжен, Кулибали закрывает зону. Ожидается открытый матч с голами с обеих сторон — Франция возьмёт своё в ключевом эпизоде.",
  },
  {
    id:6, group:"I", date:"17.06", time:"04:00", today:false,
    home:"Ирак",         hf:"🇮🇶", hFifa:66,
    away:"Норвегия",     af:"🇳🇴", aFifa:18,
    venue:"Бостон",
    p1:18, x:22, p2:60, o25:64, o35:41,
    bestBet:"П2 + ТБ 2.5", score:"0:3",
    formation:"4-2-3-1 vs 4-3-3",
    keyDuel:"Хааланд vs. оборонительный блок Ирака",
    analysis:"ХААЛАНД. Один игрок меняет всю матрицу прогноза. Норвегия с Хааландом, Эдегааром и Нтойе Дуа — разрушительная атакующая машина. Команда Хальфредссона строит игру через прямолинейный физический футбол с высоким прессингом и подачами на Хааланда. У Ирака нет ресурса для противостояния. Форвард «Манчестер Сити» имеет высокие шансы открыть личный голевой счёт на турнире именно здесь.",
  },
  {
    id:7, group:"J", date:"17.06", time:"07:00", today:false,
    home:"Аргентина",    hf:"🇦🇷", hFifa:3,
    away:"Алжир",        af:"🇩🇿", aFifa:36,
    venue:"Канзас-Сити",
    p1:67, x:20, p2:13, o25:62, o35:36,
    bestBet:"П1 + ТБ 2.5", score:"3:1",
    formation:"4-4-2 ромб vs 4-3-3",
    keyDuel:"Месси vs. Беллали",
    analysis:"Действующие чемпионы мира. Месси, Альварес, Мак-Аллистер, де Пауль. Скалони сохраняет 4-4-2 с ромбом в центре — схему, дающую Месси пространство в финальной трети. Алжир опасен через Беллали и его нестандартные ходы. Однако ресурс и опыт чемпионов слишком высоки: Аргентина должна выиграть ярко, пусть и не без проблем.",
  },
  {
    id:8, group:"J", date:"17.06", time:"10:00", today:false,
    home:"Австрия",      hf:"🇦🇹", hFifa:25,
    away:"Иордания",     af:"🇯🇴", aFifa:87,
    venue:"Санта-Клара",
    p1:74, x:17, p2:9, o25:67, o35:40,
    bestBet:"П1 + ТБ 2.5", score:"3:0",
    formation:"4-3-3 vs 4-4-2",
    keyDuel:"Сабитцер vs. центр поля Иордании",
    analysis:"Австрия Ральфа Рангника — тактически безупречная команда Европы. Геген-прессинг высокой интенсивности, быстрые транзиции, Алаба/Сабитцер/Лаймер — мощное ядро. Иордания дебютирует на ЧМ — классовый разрыв колоссальный. Австрийцы будут давить с первых минут и реализуют хотя бы три из своих многочисленных моментов.",
  },
  {
    id:9, group:"K", date:"17.06", time:"23:00", today:false,
    home:"Португалия",   hf:"🇵🇹", hFifa:7,
    away:"ДР Конго",     af:"🇨🇩", aFifa:55,
    venue:"Хьюстон",
    p1:78, x:14, p2:8, o25:70, o35:44,
    bestBet:"П1 + ТБ 2.5", score:"3:1",
    formation:"4-3-3 vs 4-2-3-1",
    keyDuel:"Жуан Феликс vs. оборона ДР Конго",
    analysis:"Вероятно, последний ЧМ Роналду. Жуан Феликс, Бруно Фернандеш, Руи Карвалью — исключительный кадровый ресурс. Португалия агрессивно владеет мячом через 4-3-3, создавая большой объём моментов. ДР Конго физически мощна, умеет прессинговать, способна на сенсацию — но Португалии достаточно реализовать свои стандарты, чтобы набрать 3 очка.",
  },
  {
    id:10, group:"L", date:"18.06", time:"02:00", today:false,
    home:"Англия",       hf:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", hFifa:4,
    away:"Хорватия",     af:"🇭🇷", aFifa:10,
    venue:"Бостон",
    p1:47, x:29, p2:24, o25:47, o35:20,
    bestBet:"П1 / Обе забьют", score:"2:1",
    formation:"4-2-3-1 vs 4-2-3-1",
    keyDuel:"Беллингем vs. Модрич",
    analysis:"Кейн, Беллингем, Сака — атакующая элита. Хорватия с Модричем (скорее всего, последний ЧМ) по-прежнему организована и опасна со стандартов. Матч напоминает полуфинал-2018. Ожидается осторожный старт и рост напряжения — Англия возьмёт своё за счёт командной глубины, но Хорватия создаст как минимум один реальный момент.",
  },
  {
    id:11, group:"L", date:"18.06", time:"05:00", today:false,
    home:"Гана",         hf:"🇬🇭", hFifa:65,
    away:"Панама",       af:"🇵🇦", aFifa:47,
    venue:"Ванкувер",
    p1:44, x:30, p2:26, o25:46, o35:19,
    bestBet:"Обе забьют", score:"2:1",
    formation:"4-3-3 vs 4-4-2",
    keyDuel:"Кудус (Гана) vs. физический блок Панамы",
    analysis:"Матч двух команд второго плана внутри группы с Англией и Хорватией. Гана технически сильнее, Панама организована в КОНКАКАФ-стиле — низкий блок, высокие мячи. Кудус способен вскрыть эту оборону индивидуально. Ожидается результативный матч с небольшой суммой голов, в котором обе команды заработают по голу.",
  },
  {
    id:12, group:"K", date:"18.06", time:"08:00", today:false,
    home:"Узбекистан",   hf:"🇺🇿", hFifa:73,
    away:"Колумбия",     af:"🇨🇴", aFifa:16,
    venue:"Оклахома-Сити",
    p1:19, x:27, p2:54, o25:52, o35:25,
    bestBet:"П2", score:"0:2",
    formation:"4-2-3-1 vs 4-4-2",
    keyDuel:"Луис Диас vs. оборона Узбекистана",
    analysis:"Дебют Узбекистана на ЧМ против опытной Колумбии с Луисом Диасом во главе атаки. Колумбия — серьёзная южноамериканская сборная, прошедшая жёсткий отбор КОНМЕБОЛ. Узбекистан — сильнейшая команда ЦА, но классовый разрыв в данном матче велик. Ожидается уверенная победа Колумбии, которая вскроет оборону соперника во втором тайме.",
  },
];

const GROUPS = {
  A: [
    { name:"Мексика",    f:"🇲🇽", pld:1, w:1, d:0, l:0, gf:2, ga:0, pts:3 },
    { name:"Ю. Корея",   f:"🇰🇷", pld:1, w:1, d:0, l:0, gf:2, ga:1, pts:3 },
    { name:"Чехия",      f:"🇨🇿", pld:1, w:0, d:0, l:1, gf:1, ga:2, pts:0 },
    { name:"ЮАР",        f:"🇿🇦", pld:1, w:0, d:0, l:1, gf:0, ga:2, pts:0 },
  ],
  B: [
    { name:"Канада",      f:"🇨🇦", pld:1, w:0, d:1, l:0, gf:1, ga:1, pts:1 },
    { name:"Босния",      f:"🇧🇦", pld:1, w:0, d:1, l:0, gf:1, ga:1, pts:1 },
    { name:"Катар",       f:"🇶🇦", pld:1, w:0, d:1, l:0, gf:1, ga:1, pts:1 },
    { name:"Швейцария",   f:"🇨🇭", pld:1, w:0, d:1, l:0, gf:1, ga:1, pts:1 },
  ],
  C: [
    { name:"Шотландия",  f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", pld:1, w:1, d:0, l:0, gf:1, ga:0, pts:3 },
    { name:"Бразилия",   f:"🇧🇷", pld:1, w:0, d:1, l:0, gf:1, ga:1, pts:1 },
    { name:"Марокко",    f:"🇲🇦", pld:1, w:0, d:1, l:0, gf:1, ga:1, pts:1 },
    { name:"Гаити",      f:"🇭🇹", pld:1, w:0, d:0, l:1, gf:0, ga:1, pts:0 },
  ],
  D: [
    { name:"США",         f:"🇺🇸", pld:1, w:1, d:0, l:0, gf:4, ga:1, pts:3 },
    { name:"Австралия",  f:"🇦🇺", pld:1, w:1, d:0, l:0, gf:2, ga:0, pts:3 },
    { name:"Парагвай",   f:"🇵🇾", pld:1, w:0, d:0, l:1, gf:1, ga:4, pts:0 },
    { name:"Турция",     f:"🇹🇷", pld:1, w:0, d:0, l:1, gf:0, ga:2, pts:0 },
  ],
  E: [
    { name:"Германия",   f:"🇩🇪", pld:1, w:1, d:0, l:0, gf:7, ga:1, pts:3 },
    { name:"Кот-д'Ив.", f:"🇨🇮", pld:1, w:1, d:0, l:0, gf:1, ga:0, pts:3 },
    { name:"Эквадор",    f:"🇪🇨", pld:1, w:0, d:0, l:1, gf:0, ga:1, pts:0 },
    { name:"Кюрасао",    f:"🇨🇼", pld:1, w:0, d:0, l:1, gf:1, ga:7, pts:0 },
  ],
  F: [
    { name:"Швеция",     f:"🇸🇪", pld:1, w:1, d:0, l:0, gf:5, ga:1, pts:3 },
    { name:"Нидерланды", f:"🇳🇱", pld:1, w:0, d:1, l:0, gf:2, ga:2, pts:1 },
    { name:"Япония",     f:"🇯🇵", pld:1, w:0, d:1, l:0, gf:2, ga:2, pts:1 },
    { name:"Тунис",      f:"🇹🇳", pld:1, w:0, d:0, l:1, gf:1, ga:5, pts:0 },
  ],
  G: [
    { name:"Бельгия",    f:"🇧🇪", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Египет",     f:"🇪🇬", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Иран",       f:"🇮🇷", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Н. Зеланд.", f:"🇳🇿", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
  ],
  H: [
    { name:"Испания",    f:"🇪🇸", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Уругвай",    f:"🇺🇾", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Сауд. Ар.", f:"🇸🇦", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Кабо-Верде", f:"🇨🇻", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
  ],
  I: [
    { name:"Франция",    f:"🇫🇷", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Сенегал",    f:"🇸🇳", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Норвегия",   f:"🇳🇴", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Ирак",       f:"🇮🇶", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
  ],
  J: [
    { name:"Аргентина",  f:"🇦🇷", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Австрия",    f:"🇦🇹", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Алжир",      f:"🇩🇿", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Иордания",   f:"🇯🇴", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
  ],
  K: [
    { name:"Португалия", f:"🇵🇹", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Колумбия",   f:"🇨🇴", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"ДР Конго",   f:"🇨🇩", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Узбекистан", f:"🇺🇿", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
  ],
  L: [
    { name:"Англия",     f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Хорватия",   f:"🇭🇷", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Гана",       f:"🇬🇭", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
    { name:"Панама",     f:"🇵🇦", pld:0, w:0, d:0, l:0, gf:0, ga:0, pts:0 },
  ],
};

const GR_COLORS = {
  A:"#c0392b", B:"#e67e22", C:"#f1c40f", D:"#27ae60",
  E:"#2980b9", F:"#8e44ad", G:"#16a085", H:"#d35400",
  I:"#e74c3c", J:"#1abc9c", K:"#2ecc71", L:"#3498db",
};

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function Badge({ children, style = {} }) {
  return (
    <span style={{
      display:"inline-block", borderRadius:4, padding:"1px 7px",
      fontSize:11, fontWeight:700, letterSpacing:0.3, ...style
    }}>
      {children}
    </span>
  );
}

function GBadge({ letter }) {
  const bg = GR_COLORS[letter] || "#888";
  return <Badge style={{ background:bg, color:"#fff" }}>GR {letter}</Badge>;
}

function ProbBar({ p1, x, p2, home, away }) {
  const seg = (pct, bg, txt, align, radius) => (
    <div style={{
      width:`${pct}%`, background:bg, color:txt,
      display:"flex", alignItems:"center",
      justifyContent: align === "l" ? "flex-start" : align === "r" ? "flex-end" : "center",
      padding:"0 8px", fontSize:13, fontWeight:700, minWidth:28,
      borderRadius: radius, lineHeight:1,
    }}>
      {pct}%
    </div>
  );
  return (
    <div style={{ marginTop:10 }}>
      <div style={{ display:"flex", height:30, borderRadius:6, overflow:"hidden", gap:1 }}>
        {seg(p1, "var(--color-background-success)", "var(--color-text-success)", "l", "6px 0 0 6px")}
        {seg(x,  "var(--color-background-warning)", "var(--color-text-warning)", "c", "0")}
        {seg(p2, "var(--color-background-danger)",  "var(--color-text-danger)",  "r", "0 6px 6px 0")}
      </div>
      <div style={{
        display:"flex", justifyContent:"space-between",
        fontSize:10, marginTop:3, color:"var(--color-text-secondary)", padding:"0 2px",
      }}>
        <span>П1 · {home}</span>
        <span>Ничья</span>
        <span>П2 · {away}</span>
      </div>
    </div>
  );
}

function TotalChip({ label, pct, hi }) {
  const color = hi ? "var(--color-background-info)" : "var(--color-background-secondary)";
  const tc    = hi ? "var(--color-text-info)" : "var(--color-text-secondary)";
  return (
    <div style={{
      background:color, color:tc,
      borderRadius:6, padding:"4px 9px", fontSize:12,
    }}>
      {label} <strong style={{ color: hi ? "var(--color-text-info)" : "var(--color-text-primary)" }}>{pct}%</strong>
    </div>
  );
}

function MatchCard({ m, expanded, onToggle }) {
  const bigFav = m.p1 >= 65 || m.p2 >= 65;
  const border = m.today
    ? "1.5px solid var(--color-border-danger)"
    : "0.5px solid var(--color-border-secondary)";

  return (
    <div style={{
      border, borderRadius:12,
      padding:"14px 16px", marginBottom:10,
      background:"var(--color-background-primary)",
    }}>
      {/* Top row */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <div style={{ display:"flex", gap:5, alignItems:"center" }}>
          <GBadge letter={m.group} />
          {m.today && <Badge style={{ background:"#c0392b", color:"#fff" }}>СЕГОДНЯ</Badge>}
          {bigFav && <Badge style={{ background:"var(--color-background-success)", color:"var(--color-text-success)" }}>Явный фаворит</Badge>}
        </div>
        <span style={{ fontSize:11, color:"var(--color-text-secondary)" }}>
          {m.date} · {m.time} МСК · {m.venue}
        </span>
      </div>

      {/* Teams */}
      <div style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"space-between", marginBottom:4 }}>
        <div style={{ flex:1, display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:32 }}>{m.hf}</span>
          <div>
            <div style={{ fontWeight:500, fontSize:15 }}>{m.home}</div>
            <div style={{ fontSize:10, color:"var(--color-text-secondary)" }}>FIFA #{m.hFifa}</div>
          </div>
        </div>
        <div style={{
          fontWeight:700, fontSize:11, padding:"5px 10px",
          border:"0.5px solid var(--color-border-tertiary)",
          borderRadius:6, color:"var(--color-text-secondary)",
        }}>VS</div>
        <div style={{ flex:1, display:"flex", alignItems:"center", gap:8, justifyContent:"flex-end", textAlign:"right" }}>
          <div>
            <div style={{ fontWeight:500, fontSize:15 }}>{m.away}</div>
            <div style={{ fontSize:10, color:"var(--color-text-secondary)" }}>FIFA #{m.aFifa}</div>
          </div>
          <span style={{ fontSize:32 }}>{m.af}</span>
        </div>
      </div>

      {/* Prob bar */}
      <ProbBar p1={m.p1} x={m.x} p2={m.p2} home={m.home} away={m.away} />

      {/* Chips */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:10 }}>
        <TotalChip label="ТБ 2.5:" pct={m.o25} hi={m.o25 >= 55} />
        <TotalChip label="ТБ 3.5:" pct={m.o35} hi={m.o35 >= 45} />
        <Badge style={{ background:"var(--color-background-success)", color:"var(--color-text-success)", padding:"4px 9px", fontSize:12 }}>
          Топ: {m.bestBet}
        </Badge>
        <Badge style={{ background:"var(--color-background-info)", color:"var(--color-text-info)", padding:"4px 9px", fontSize:12 }}>
          Счёт: {m.score}
        </Badge>
      </div>

      {/* Toggle */}
      <button
        onClick={onToggle}
        style={{
          marginTop:10, width:"100%", padding:"6px 0",
          border:"0.5px solid var(--color-border-tertiary)", borderRadius:6,
          background:"transparent", cursor:"pointer", fontSize:12,
          color:"var(--color-text-secondary)",
        }}
      >
        {expanded ? "▲ Скрыть тактический разбор" : "▼ Тактический разбор & ключевое противостояние"}
      </button>

      {expanded && (
        <div style={{
          marginTop:8, padding:"12px 14px",
          background:"var(--color-background-secondary)",
          borderRadius:8,
          borderLeft:"3px solid var(--color-border-info)",
        }}>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:8 }}>
            <span style={{ fontSize:12, color:"var(--color-text-secondary)" }}>
              <strong>Схемы:</strong> {m.formation}
            </span>
            <span style={{ fontSize:12, color:"var(--color-text-secondary)" }}>
              <strong>Ключевой дуэль:</strong> {m.keyDuel}
            </span>
          </div>
          <p style={{ fontSize:13, lineHeight:1.75, margin:0, color:"var(--color-text-primary)" }}>
            {m.analysis}
          </p>
        </div>
      )}
    </div>
  );
}

function ResultCard({ r }) {
  const diff = r.hs - r.as_;
  const col  = diff > 0 ? "var(--color-text-success)" : diff < 0 ? "var(--color-text-danger)" : "var(--color-text-warning)";
  return (
    <div style={{
      border:"0.5px solid var(--color-border-tertiary)",
      borderRadius:8, padding:"8px 12px",
      background:"var(--color-background-primary)",
      display:"flex", alignItems:"center", gap:8,
    }}>
      <GBadge letter={r.group} />
      <span style={{ fontSize:11, color:"var(--color-text-secondary)", minWidth:48 }}>{r.date}</span>
      <span style={{ fontSize:20 }}>{r.hf}</span>
      <span style={{ fontWeight:700, fontSize:15, minWidth:36, textAlign:"center", color:col }}>
        {r.hs}:{r.as_}
      </span>
      <span style={{ fontSize:20 }}>{r.af}</span>
      <span style={{ fontSize:12, color:"var(--color-text-secondary)", flex:1, marginLeft:4 }}>
        {r.home} — {r.away}
      </span>
    </div>
  );
}

function GroupTable({ letter, teams }) {
  const bg = GR_COLORS[letter] || "#888";
  const sorted = [...teams].sort((a,b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const gdA = a.gf - a.ga, gdB = b.gf - b.ga;
    if (gdB !== gdA) return gdB - gdA;
    return b.gf - a.gf;
  });
  return (
    <div style={{
      border:"0.5px solid var(--color-border-tertiary)",
      borderRadius:10, overflow:"hidden",
      background:"var(--color-background-primary)",
    }}>
      <div style={{ background:bg, color:"#fff", padding:"5px 12px", fontWeight:700, fontSize:13 }}>
        Группа {letter}
      </div>
      <table style={{ width:"100%", fontSize:12, borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ borderBottom:"0.5px solid var(--color-border-tertiary)" }}>
            {["", "","Команда","И","Г","О"].map((h,i) => (
              <th key={i} style={{
                padding:"4px 6px",
                textAlign: i === 2 ? "left" : "center",
                color:"var(--color-text-secondary)", fontWeight:500,
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((t,i) => (
            <tr key={t.name} style={{
              borderBottom: i < sorted.length-1 ? "0.5px solid var(--color-border-tertiary)" : "none",
              background: i < 2 && t.pld > 0 ? "var(--color-background-success)" : "transparent",
            }}>
              <td style={{ padding:"5px 6px", textAlign:"center", color:"var(--color-text-secondary)", fontSize:11 }}>{i+1}</td>
              <td style={{ padding:"5px 2px", textAlign:"center", fontSize:18 }}>{t.f}</td>
              <td style={{ padding:"5px 6px", fontWeight: i < 2 && t.pld > 0 ? 500 : 400 }}>{t.name}</td>
              <td style={{ padding:"5px 6px", textAlign:"center", color:"var(--color-text-secondary)" }}>{t.pld}</td>
              <td style={{ padding:"5px 6px", textAlign:"center", color:"var(--color-text-secondary)" }}>{t.gf}:{t.ga}</td>
              <td style={{ padding:"5px 6px", textAlign:"center", fontWeight:700,
                color: t.pts > 0 ? "var(--color-text-success)" : "var(--color-text-primary)" }}>
                {t.pts}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab]           = useState("predictions");
  const [expanded, setExpanded] = useState(null);
  const [grpFilter, setGrpFilter] = useState("ALL");

  const toggle = (id) => setExpanded(expanded === id ? null : id);

  const todayPreds   = PREDICTIONS.filter(m => m.today);
  const upcomPreds   = PREDICTIONS.filter(m => !m.today);
  const filteredPreds = grpFilter === "ALL"
    ? PREDICTIONS
    : PREDICTIONS.filter(m => m.group === grpFilter);

  const TAB_STYLE = (active) => ({
    padding:"8px 18px", border:"none", cursor:"pointer",
    borderRadius:20, fontSize:13, fontWeight: active ? 600 : 400,
    background: active ? "var(--color-background-info)" : "transparent",
    color: active ? "var(--color-text-info)" : "var(--color-text-secondary)",
    transition:"all .15s",
  });

  return (
    <div style={{ fontFamily:"var(--font-sans)", maxWidth:760, margin:"0 auto", padding:"0 0 2rem" }}>
      {/* Header */}
      <div style={{
        padding:"16px 0 12px",
        borderBottom:"0.5px solid var(--color-border-tertiary)",
        marginBottom:16,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
          <span style={{ fontSize:28 }}>🏆</span>
          <div>
            <div style={{ fontWeight:500, fontSize:18 }}>
              Аналитика ЧМ-2026
            </div>
            <div style={{ fontSize:12, color:"var(--color-text-secondary)" }}>
              48 сборных · 12 групп · США / Канада / Мексика · 11 июня – 19 июля
            </div>
          </div>
          <div style={{ marginLeft:"auto", textAlign:"right" }}>
            <Badge style={{ background:"var(--color-background-danger)", color:"var(--color-text-danger)", padding:"3px 10px" }}>
              LIVE · 1-й тур
            </Badge>
            <div style={{ fontSize:11, color:"var(--color-text-secondary)", marginTop:3 }}>
              15 июня 2026
            </div>
          </div>
        </div>
        {/* Quick stats */}
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:8 }}>
          {[
            ["Сыграно", RESULTS.length],
            ["Голов забито", RESULTS.reduce((s,r)=>s+r.hs+r.as_,0)],
            ["Ср. голов/матч", (RESULTS.reduce((s,r)=>s+r.hs+r.as_,0)/RESULTS.length).toFixed(1)],
            ["Прогнозов", PREDICTIONS.length],
          ].map(([label,val]) => (
            <div key={label} style={{
              background:"var(--color-background-secondary)",
              borderRadius:8, padding:"5px 12px",
              fontSize:12, color:"var(--color-text-secondary)",
            }}>
              {label}: <strong style={{ color:"var(--color-text-primary)" }}>{val}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:4, marginBottom:16, padding:"0 2px" }}>
        {[["predictions","Прогнозы"],["results","Результаты"],["groups","Группы"]].map(([key,label]) => (
          <button key={key} style={TAB_STYLE(tab===key)} onClick={()=>setTab(key)}>
            {label}
          </button>
        ))}
      </div>

      {/* Predictions tab */}
      {tab === "predictions" && (
        <div>
          {/* Group filter */}
          <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:14 }}>
            {["ALL","G","H","I","J","K","L"].map(g => (
              <button key={g} onClick={()=>setGrpFilter(g)} style={{
                padding:"3px 10px", border:"0.5px solid",
                borderColor: grpFilter===g ? (GR_COLORS[g]||"var(--color-border-primary)") : "var(--color-border-tertiary)",
                borderRadius:12, cursor:"pointer",
                background: grpFilter===g ? (GR_COLORS[g]||"var(--color-border-primary)") : "transparent",
                color: grpFilter===g ? "#fff" : "var(--color-text-secondary)",
                fontSize:12,
              }}>
                {g === "ALL" ? "Все" : `Гр. ${g}`}
              </button>
            ))}
          </div>

          {/* Today section */}
          {grpFilter === "ALL" && (
            <>
              <div style={{ fontSize:12, fontWeight:600, color:"var(--color-text-danger)", marginBottom:8, letterSpacing:0.3 }}>
                СЕГОДНЯ · 15 ИЮНЯ
              </div>
              {todayPreds.map(m => (
                <MatchCard key={m.id} m={m} expanded={expanded===m.id} onToggle={()=>toggle(m.id)} />
              ))}
              <div style={{ fontSize:12, fontWeight:600, color:"var(--color-text-secondary)", margin:"16px 0 8px", letterSpacing:0.3 }}>
                ПРЕДСТОЯЩИЕ МАТЧИ · 16–18 ИЮНЯ
              </div>
            </>
          )}

          {(grpFilter === "ALL" ? upcomPreds : filteredPreds).map(m => (
            <MatchCard key={m.id} m={m} expanded={expanded===m.id} onToggle={()=>toggle(m.id)} />
          ))}
        </div>
      )}

      {/* Results tab */}
      {tab === "results" && (
        <div>
          <div style={{ fontSize:12, fontWeight:600, color:"var(--color-text-secondary)", marginBottom:10, letterSpacing:0.3 }}>
            СЫГРАННЫЕ МАТЧИ · ТУРЫ 1 (11–15 ИЮНЯ) · ГРУППЫ A–F
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {RESULTS.map((r,i) => <ResultCard key={i} r={r} />)}
          </div>
          <div style={{
            marginTop:12, padding:"10px 14px",
            background:"var(--color-background-secondary)",
            borderRadius:8, fontSize:12, color:"var(--color-text-secondary)",
          }}>
            Группы G–L стартуют 15–17 июня. Матчи 2-го тура — 18–21 июня. Финальный тур — 24–28 июня.
          </div>
        </div>
      )}

      {/* Groups tab */}
      {tab === "groups" && (
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",
          gap:12,
        }}>
          {Object.entries(GROUPS).map(([letter, teams]) => (
            <GroupTable key={letter} letter={letter} teams={teams} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{
        marginTop:20, padding:"10px 0",
        borderTop:"0.5px solid var(--color-border-tertiary)",
        fontSize:11, color:"var(--color-text-secondary)",
      }}>
        Модель учитывает: рейтинг FIFA, последние результаты, личные встречи, тактические профили. Вероятности П1/X/П2 — прогнозные, не букмекерские котировки.
      </div>
    </div>
  );
}
