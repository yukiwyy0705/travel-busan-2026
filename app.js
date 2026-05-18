let exchangeRate = null;
let overviewMap = null;
const dayMaps = {};
const dayMapMarkers = {};

// ── Uber 車費計算 ─────────────────────────────────────
const UBER = { base: 3300, perKm: 1050, walkThreshold: 0.45 };

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function uberFare(km) {
  if (km < UBER.walkThreshold) return 0;
  return Math.round(Math.max(UBER.base, UBER.base + (km - 1) * UBER.perKm) / 100) * 100;
}

function calcDayLegs(day) {
  const spots = day.spots;
  const legs = [];
  for (let i = 1; i < spots.length; i++) {
    const from = spots[i - 1];
    const to = spots[i];
    const km = haversineKm(from.lat, from.lng, to.lat, to.lng);
    const fare = uberFare(km);
    legs.push({ from: from.name, to: to.name, km, fare, walk: km < UBER.walkThreshold });
  }
  return legs;
}

function calcDayTransport(day) {
  return calcDayLegs(day).reduce((sum, leg) => sum + leg.fare, 0);
}

// ── 匯率 ──────────────────────────────────────────────
async function fetchExchangeRate() {
  try {
    const res = await fetch('https://open.exchangerate-api.com/v6/latest/KRW');
    const data = await res.json();
    exchangeRate = data.rates.HKD;
    const updated = new Date(data.time_last_update_utc).toLocaleString('zh-HK', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    document.getElementById('rate-display').textContent =
      `KRW 1 = HKD ${(exchangeRate * 100).toFixed(4)} （更新：${updated}）`;
    updateAllBudgets();
  } catch {
    document.getElementById('rate-display').textContent = '匯率載入失敗，使用估算匯率';
    exchangeRate = 0.0057;
    updateAllBudgets();
  }
}

function krwToHkd(krw) {
  if (!exchangeRate) return '--';
  return 'HK$' + (krw * exchangeRate).toFixed(1);
}

function formatKrw(krw) {
  return '₩' + krw.toLocaleString();
}

document.getElementById('krw-input').addEventListener('input', function () {
  const val = parseFloat(this.value) || 0;
  document.getElementById('hkd-output').textContent =
    exchangeRate ? 'HK$' + (val * exchangeRate).toFixed(2) : '讀取中...';
});

// ── 地圖 ──────────────────────────────────────────────
function createMarkerIcon(color, num, size = 32) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${color};
      border:3px solid white;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      box-shadow:0 2px 6px rgba(0,0,0,0.3);
      display:flex;align-items:center;justify-content:center;
    "><span style="
      transform:rotate(45deg);
      color:white;font-weight:700;
      font-size:${size < 28 ? 10 : 13}px;
      line-height:1;font-family:sans-serif;
    ">${num}</span></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size]
  });
}

function createHotelIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="
      background:#1a3a5c;color:white;
      border:3px solid white;border-radius:8px;
      padding:2px 6px;font-size:13px;
      box-shadow:0 2px 6px rgba(0,0,0,0.4);
      white-space:nowrap;font-weight:700;
    ">🏨 酒店</div>`,
    iconSize: [60, 28],
    iconAnchor: [30, 28],
    popupAnchor: [0, -30]
  });
}

function buildCostBadges(spot) {
  const parts = [];
  if (spot.budget.food > 0)   parts.push(`<span class="cost-badge food">🍽️ ${formatKrw(spot.budget.food)}</span>`);
  if (spot.budget.ticket > 0) parts.push(`<span class="cost-badge ticket">🎫 ${formatKrw(spot.budget.ticket)}</span>`);
  return parts.length ? `<div class="cost-badges">${parts.join('')}</div>` : '';
}

function buildPopup(spot) {
  return `<div class="popup-name">${SPOT_ICONS[spot.type] || '📍'} ${spot.name}</div>
<div class="popup-kr">${spot.nameKr}</div>
<div class="popup-desc">${spot.desc}</div>`;
}

function initOverviewMap() {
  overviewMap = L.map('overview-map', { zoomControl: true }).setView([35.12, 129.06], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(overviewMap);

  L.marker([HOTEL.lat, HOTEL.lng], { icon: createHotelIcon() })
    .addTo(overviewMap)
    .bindPopup(`<div class="popup-name">🏨 ${HOTEL.name}</div>
<div class="popup-kr">${HOTEL.nameKr}</div>
<div class="popup-desc"><a href="${HOTEL.url}" target="_blank">在 Google Maps 查看 ↗</a></div>`);

  ITINERARY.forEach(day => {
    day.spots.forEach((spot, i) => {
      L.marker([spot.lat, spot.lng], { icon: createMarkerIcon(day.color, i + 1) })
        .addTo(overviewMap)
        .bindPopup(buildPopup(spot));
    });
  });
}

function initDayMap(mapId, dayData) {
  const map = L.map(mapId, { zoomControl: true, scrollWheelZoom: true })
    .setView([dayData.spots[0].lat, dayData.spots[0].lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap', maxZoom: 19
  }).addTo(map);

  const bounds = [];
  const markers = [];
  dayData.spots.forEach((spot, i) => {
    bounds.push([spot.lat, spot.lng]);
    const marker = L.marker([spot.lat, spot.lng], { icon: createMarkerIcon(dayData.color, i + 1, 26) })
      .addTo(map)
      .bindPopup(buildPopup(spot));
    markers.push(marker);
  });

  if (bounds.length > 1) map.fitBounds(bounds, { padding: [20, 20] });
  dayMaps[dayData.day] = map;
  dayMapMarkers[dayData.day] = markers;
  return map;
}

// ── 行程卡片 ─────────────────────────────────────────
function renderDayCards() {
  const container = document.getElementById('days-container');

  ITINERARY.forEach((day, di) => {
    const transportKrw = calcDayTransport(day);
    const legs = calcDayLegs(day);
    const nonTransportTotal = Object.entries(day.summary)
      .filter(([k]) => k !== 'transport')
      .reduce((s, [, v]) => s + v, 0);
    const dayTotal = nonTransportTotal + transportKrw;

    const card = document.createElement('div');
    card.className = 'day-card';
    card.id = `day-${day.day}`;

    const header = document.createElement('div');
    header.className = 'day-header';
    header.style.background = day.color;
    header.innerHTML = `
      <div class="day-badge">${day.date}</div>
      <div>
        <div class="day-theme">${day.theme}</div>
        <div style="font-size:0.75rem;opacity:0.8;margin-top:2px">${day.dateLabel}</div>
      </div>
      <div class="day-budget-preview" id="day-preview-${day.day}">
        ${formatKrw(dayTotal)} · HK$--
      </div>`;
    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'day-body';

    // ── 時間軸 + 路程標籤 ──
    const timeline = document.createElement('div');
    timeline.className = 'timeline';

    day.spots.forEach((spot, si) => {
      // 景點 item
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-dot">${SPOT_ICONS[spot.type] || '📍'}</div>
        <div class="timeline-content">
          <div class="timeline-time">${spot.time}</div>
          <div class="timeline-name"><span class="spot-num" style="background:${day.color}">${si + 1}</span> ${spot.name}</div>
          <div class="timeline-name-kr">${spot.nameKr}</div>
          ${buildCostBadges(spot)}
          <div class="timeline-desc">${spot.desc}</div>
        </div>`;
      item.addEventListener('click', () => {
        timeline.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        const map = dayMaps[day.day];
        const markers = dayMapMarkers[day.day];
        if (map && markers && markers[si]) {
          map.flyTo([spot.lat, spot.lng], 16, { animate: true, duration: 0.8 });
          setTimeout(() => markers[si].openPopup(), 850);
          document.getElementById(`map-day-${day.day}`).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
      timeline.appendChild(item);

      // 路程 pill（景點之後，最後一個不加）
      if (si < day.spots.length - 1) {
        const leg = legs[si];
        const pill = document.createElement('div');
        pill.className = `transport-leg ${leg.walk ? 'walk' : 'uber'}`;
        if (leg.walk) {
          pill.innerHTML = `🚶 步行 ${(leg.km * 1000).toFixed(0)}m`;
        } else {
          pill.innerHTML = `<span class="leg-icon">🚗</span>Uber ${leg.km.toFixed(1)} km
            <span class="leg-fare" data-krw="${leg.fare}">${formatKrw(leg.fare)}</span>`;
        }
        timeline.appendChild(pill);
      }
    });

    body.appendChild(timeline);

    // ── 地圖 + 預算表 ──
    const rightWrap = document.createElement('div');
    rightWrap.className = 'day-map-wrap';

    const mapDiv = document.createElement('div');
    mapDiv.className = 'day-map';
    mapDiv.id = `map-day-${day.day}`;
    rightWrap.appendChild(mapDiv);

    const budgetCategories = [
      { key: 'transport', label: '🚗 Uber 交通', dynamic: transportKrw },
      { key: 'food',      label: '🍽️ 餐飲' },
      { key: 'ticket',    label: '🎫 門票' },
      { key: 'shopping',  label: '🛍️ 購物' },
      { key: 'hotel',     label: '🏨 住宿' }
    ];

    const table = document.createElement('table');
    table.className = 'budget-table';
    table.innerHTML = `<thead><tr><th>項目</th><th>KRW</th><th>HKD</th></tr></thead>`;
    const tbody = document.createElement('tbody');
    let rowsHtml = '';

    budgetCategories.forEach(cat => {
      const val = cat.dynamic !== undefined ? cat.dynamic : (day.summary[cat.key] || 0);
      if (val === 0) return;
      rowsHtml += `<tr>
        <td>${cat.label}</td>
        <td class="krw">${formatKrw(val)}</td>
        <td class="hkd" data-krw="${val}">${krwToHkd(val)}</td>
      </tr>`;
    });

    rowsHtml += `<tr class="total-row">
      <td>當日合計</td>
      <td class="krw">${formatKrw(dayTotal)}</td>
      <td class="hkd" data-krw="${dayTotal}">${krwToHkd(dayTotal)}</td>
    </tr>`;

    tbody.innerHTML = rowsHtml;
    table.appendChild(tbody);
    rightWrap.appendChild(table);

    // Uber 費率說明
    const note = document.createElement('div');
    note.className = 'uber-note';
    note.textContent = `起步 ₩3,300 · 每公里 ₩1,050（步行 < ${UBER.walkThreshold * 1000}m 免費）`;
    rightWrap.appendChild(note);

    body.appendChild(rightWrap);
    card.appendChild(body);
    container.appendChild(card);

    setTimeout(() => initDayMap(`map-day-${day.day}`, day), 0);
  });
}

// ── 總預算 ─────────────────────────────────────────
function renderTotalBudget() {
  const cats = { transport: 0, food: 0, ticket: 0, shopping: 0, hotel: 0 };
  ITINERARY.forEach(day => {
    cats.transport += calcDayTransport(day);
    ['food', 'ticket', 'shopping', 'hotel'].forEach(k => {
      cats[k] += day.summary[k] || 0;
    });
  });
  const grand = Object.values(cats).reduce((a, b) => a + b, 0);

  const catInfo = {
    transport: { icon: '🚗', name: 'Uber 交通' },
    food:      { icon: '🍽️', name: '餐飲' },
    ticket:    { icon: '🎫', name: '門票' },
    shopping:  { icon: '🛍️', name: '購物' },
    hotel:     { icon: '🏨', name: '住宿' }
  };

  const grid = document.getElementById('budget-cat-grid');
  grid.innerHTML = '';
  Object.keys(catInfo).forEach(k => {
    const div = document.createElement('div');
    div.className = 'summary-cat';
    div.innerHTML = `
      <span class="cat-icon">${catInfo[k].icon}</span>
      <div class="cat-name">${catInfo[k].name}</div>
      <div class="cat-krw">${formatKrw(cats[k])}</div>
      <div class="cat-hkd" data-krw="${cats[k]}">${krwToHkd(cats[k])}</div>`;
    grid.appendChild(div);
  });

  document.getElementById('grand-krw').textContent = formatKrw(grand);
  document.getElementById('grand-hkd').dataset.krw = grand;
  document.getElementById('grand-hkd').textContent = krwToHkd(grand);

  document.getElementById('hero-total-krw').textContent = formatKrw(grand);
  document.getElementById('hero-total-hkd').dataset.krw = grand;
  document.getElementById('hero-total-hkd').textContent = krwToHkd(grand);
}

// ── 更新所有 HKD 顯示 ───────────────────────────────
function updateAllBudgets() {
  document.querySelectorAll('[data-krw]').forEach(el => {
    const krw = parseFloat(el.dataset.krw);
    if (!isNaN(krw)) el.textContent = krwToHkd(krw);
  });

  ITINERARY.forEach(day => {
    const transportKrw = calcDayTransport(day);
    const nonTransport = Object.entries(day.summary)
      .filter(([k]) => k !== 'transport')
      .reduce((s, [, v]) => s + v, 0);
    const dayTotal = nonTransport + transportKrw;
    const el = document.getElementById(`day-preview-${day.day}`);
    if (el) el.textContent = `${formatKrw(dayTotal)} · ${krwToHkd(dayTotal)}`;
  });
}

// ── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderDayCards();
  renderTotalBudget();
  initOverviewMap();
  fetchExchangeRate();

  const sections = document.querySelectorAll('[data-section]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`nav a[href="#${e.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observer.observe(s));
});
