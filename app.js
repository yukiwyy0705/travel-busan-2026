let exchangeRate = null;
let overviewMap = null;
const dayMaps = {};
const dayMapMarkers = {};

// ── Google Sheets 資料來源 ────────────────────────────
const SHEETS_ID = '1_m9K0y_d-0oc_w1LwWZcpw8EicysazTbh3c65fxaUCY';
const SHEETS_URL = `https://docs.google.com/spreadsheets/d/${SHEETS_ID}/export?format=csv`;
// 填入 Google Apps Script Web App URL（留空則僅本地更新）
const APPS_SCRIPT_URL = 'https://script.google.com/macros/library/d/1Wltj7HSkcjVVdrdwxzUCpLgWGLZvIfDsOfOe-YDUAB3meH5YlOEsnI39/3';
// 填入 Kakao Maps JavaScript App Key（https://developers.kakao.com）
const KAKAO_KEY = '01a827394b6ee32b9d7c68dd0f331172';

function loadKakaoSdk() {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps && window.kakao.maps.Map) { resolve(); return; }
    if (window.kakao && window.kakao.maps) { kakao.maps.load(resolve); return; }
    if (!KAKAO_KEY) { reject(new Error('未設定 KAKAO_KEY')); return; }
    const s = document.createElement('script');
    s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false`;
    s.onload = () => {
      if (window.kakao && window.kakao.maps) {
        kakao.maps.load(resolve);
      } else {
        reject(new Error('Kakao SDK 物件未掛載到 window，請檢查 App Key 與已註冊網域'));
      }
    };
    s.onerror = () => reject(new Error('Kakao SDK script 載入失敗（CORS/網域未註冊/key 錯誤）'));
    document.head.appendChild(s);
  });
}

const TYPE_ZH = {
  '交通': 'transport', '景點': 'attraction', '餐廳': 'food',
  '咖啡廳': 'cafe', '海灘': 'beach', '酒店': 'hotel',
  '購物': 'shopping', '區域': 'area', '寺廟': 'temple'
};

function parseCSV(text) {
  const rows = [];
  for (const rawLine of text.split('\n')) {
    const line = rawLine.replace(/\r$/, '');
    if (!line.trim()) continue;
    const cols = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
        else inQ = !inQ;
      } else if (ch === ',' && !inQ) {
        cols.push(cur); cur = '';
      } else {
        cur += ch;
      }
    }
    cols.push(cur);
    rows.push(cols);
  }
  return rows;
}

const DAY_COLORS = { 1: '#e74c3c', 2: '#3498db', 3: '#2ecc71', 4: '#9b59b6', 5: '#f39c12' };

function parseCoordsFromGoogleMaps(url) {
  if (!url) return { lat: 0, lng: 0 };
  // @lat,lng,zoom format (address bar / long share link)
  let m = url.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
  // !3dLAT!4dLNG format (embedded in data= param)
  m = url.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
  if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
  // q=lat,lng format
  m = url.match(/[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
  return { lat: 0, lng: 0 };
}

function csvToItinerary(csv) {
  const rows = parseCSV(csv);
  if (rows.length < 2) return null;

  const headers = rows[0].map(h => h.trim());
  const get = (row, name) => {
    const i = headers.indexOf(name);
    return i >= 0 ? (row[i] || '').trim() : '';
  };

  const dayMap = {};
  for (let ri = 1; ri < rows.length; ri++) {
    const row = rows[ri];
    if (row.every(c => !c.trim())) continue;

    const dayNum = parseInt(get(row, '天'));
    if (isNaN(dayNum) || dayNum < 1) continue;

    if (!dayMap[dayNum]) {
      dayMap[dayNum] = {
        day: dayNum,
        date: `Day ${dayNum}`,
        dateLabel: get(row, '日期'),
        theme: get(row, '主題'),
        color: DAY_COLORS[dayNum] || '#3498db',
        spots: [],
        hotel: HOTEL,
        summary: { transport: 0, food: 0, ticket: 0, shopping: 0, hotel: dayNum < 5 ? 234863 : 0 }
      };
    }

    const typeZh = get(row, '類型');
    const food    = parseInt(get(row, '餐飲費₩'))  || 0;
    const ticket  = parseInt(get(row, '門票費₩'))  || 0;
    const shopping = parseInt(get(row, '購物費₩')) || 0;
    const { lat, lng } = parseCoordsFromGoogleMaps(get(row, 'Google Map 連結'));

    dayMap[dayNum].spots.push({
      rowIndex: ri + 1,
      time:    get(row, '時間'),
      type:    TYPE_ZH[typeZh] || typeZh || 'attraction',
      typeZh:  typeZh,
      name:    get(row, '地點名稱'),
      nameKr:  get(row, '韓文名稱'),
      desc:    get(row, '描述'),
      mapUrl:  get(row, 'Google Map 連結'),
      lat,
      lng,
      budget:  { transport: 0, food, ticket, shopping }
    });

    dayMap[dayNum].summary.food     += food;
    dayMap[dayNum].summary.ticket   += ticket;
    dayMap[dayNum].summary.shopping += shopping;
  }

  const result = Object.values(dayMap).sort((a, b) => a.day - b.day);
  return result.length ? result : null;
}

async function fetchFromSheets() {
  const res = await fetch(SHEETS_URL);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const csv = await res.text();
  return csvToItinerary(csv);
}

function setSourceBadge(state) {
  const el = document.getElementById('data-source-badge');
  if (!el) return;
  if (state === 'loading') {
    el.textContent = '⏳ 同步中...';
    el.className = 'data-badge loading';
  } else if (state === 'sheets') {
    el.textContent = '✅ Google Sheets';
    el.className = 'data-badge sheets';
    el.title = '資料從 Google Sheets 即時載入';
  } else {
    el.textContent = '📋 本地資料';
    el.className = 'data-badge local';
    el.title = '無法連接 Sheets，使用內置資料';
  }
}

// ── Uber 車費計算 ─────────────────────────────────────
const UBER = { base: 4800, perKm: 1100, walkThreshold: 0.45 };

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

// ── 地圖（Kakao Maps）──────────────────────────────────
function buildCostBadges(spot) {
  const parts = [];
  if (spot.budget.food > 0)   parts.push(`<span class="cost-badge food">🍽️ ${formatKrw(spot.budget.food)}</span>`);
  if (spot.budget.ticket > 0) parts.push(`<span class="cost-badge ticket">🎫 ${formatKrw(spot.budget.ticket)}</span>`);
  return parts.length ? `<div class="cost-badges">${parts.join('')}</div>` : '';
}

function kakaoMapLink(name, lat, lng) {
  return `https://map.kakao.com/link/map/${encodeURIComponent(name)},${lat},${lng}`;
}

function buildPopup(spot) {
  const url = kakaoMapLink(spot.nameKr || spot.name, spot.lat, spot.lng);
  return `<a class="popup-name popup-link" href="${url}" target="_blank" rel="noopener">${SPOT_ICONS[spot.type] || '📍'} ${spot.name} ↗</a>
<div class="popup-kr">${spot.nameKr}</div>
<div class="popup-desc">${spot.desc}</div>`;
}

function showKakaoPopup(map, latlng, html) {
  if (map._popup) map._popup.setMap(null);
  const wrap = document.createElement('div');
  wrap.className = 'kakao-popup-wrapper';
  wrap.innerHTML = `<div class="kakao-popup-close">×</div><div class="kakao-popup-content">${html}</div>`;
  const popup = new kakao.maps.CustomOverlay({
    position: latlng,
    content: wrap,
    xAnchor: 0.5,
    yAnchor: 1.25,
    zIndex: 1000
  });
  wrap.querySelector('.kakao-popup-close').addEventListener('click', () => popup.setMap(null));
  popup.setMap(map);
  map._popup = popup;
}

function addNumberedMarker(map, lat, lng, color, num, size, popupContent) {
  const el = document.createElement('div');
  el.style.cssText = `
    width:${size}px;height:${size}px;
    background:${color};
    border:3px solid white;
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    box-shadow:0 2px 6px rgba(0,0,0,0.3);
    display:flex;align-items:center;justify-content:center;
    cursor:pointer;`;
  const inner = document.createElement('span');
  inner.style.cssText = `
    transform:rotate(45deg);
    color:white;font-weight:700;
    font-size:${size < 28 ? 10 : 13}px;
    line-height:1;font-family:sans-serif;`;
  inner.textContent = num;
  el.appendChild(inner);

  const latlng = new kakao.maps.LatLng(lat, lng);
  el.addEventListener('click', e => {
    e.stopPropagation();
    showKakaoPopup(map, latlng, popupContent);
  });
  const overlay = new kakao.maps.CustomOverlay({
    position: latlng,
    content: el,
    xAnchor: 0.5,
    yAnchor: 1
  });
  overlay.setMap(map);
  return { overlay, latlng, el };
}

function addHotelMarker(map, lat, lng, popupContent) {
  const el = document.createElement('div');
  el.style.cssText = `
    background:#1a3a5c;color:white;
    border:3px solid white;border-radius:8px;
    padding:2px 6px;font-size:13px;
    box-shadow:0 2px 6px rgba(0,0,0,0.4);
    white-space:nowrap;font-weight:700;cursor:pointer;`;
  el.textContent = '🏨 酒店';
  const latlng = new kakao.maps.LatLng(lat, lng);
  el.addEventListener('click', e => {
    e.stopPropagation();
    showKakaoPopup(map, latlng, popupContent);
  });
  new kakao.maps.CustomOverlay({
    position: latlng,
    content: el,
    xAnchor: 0.5,
    yAnchor: 1
  }).setMap(map);
}

function initOverviewMap() {
  const container = document.getElementById('overview-map');
  if (!container || !window.kakao || !kakao.maps || !kakao.maps.Map) return;
  container.innerHTML = '';
  overviewMap = new kakao.maps.Map(container, {
    center: new kakao.maps.LatLng(35.12, 129.06),
    level: 8
  });

  addHotelMarker(overviewMap, HOTEL.lat, HOTEL.lng,
    `<a class="popup-name popup-link" href="${kakaoMapLink(HOTEL.nameKr || HOTEL.name, HOTEL.lat, HOTEL.lng)}" target="_blank" rel="noopener">🏨 ${HOTEL.name} ↗</a>
<div class="popup-kr">${HOTEL.nameKr}</div>
<div class="popup-desc">點擊名稱可在 Kakao Map 開啟地點</div>`);

  ITINERARY.forEach(day => {
    day.spots.forEach((spot, i) => {
      addNumberedMarker(overviewMap, spot.lat, spot.lng, day.color, i + 1, 32, buildPopup(spot));
    });
  });
}

function initDayMap(mapId, dayData) {
  const container = document.getElementById(mapId);
  if (!container || !window.kakao || !kakao.maps || !kakao.maps.Map) return null;
  container.innerHTML = '';

  const first = dayData.spots[0];
  const map = new kakao.maps.Map(container, {
    center: new kakao.maps.LatLng(first.lat, first.lng),
    level: 5
  });

  const markers = [];
  const bounds = new kakao.maps.LatLngBounds();
  dayData.spots.forEach((spot, i) => {
    bounds.extend(new kakao.maps.LatLng(spot.lat, spot.lng));
    markers.push(addNumberedMarker(map, spot.lat, spot.lng, dayData.color, i + 1, 26, buildPopup(spot)));
  });

  if (dayData.spots.length > 1) map.setBounds(bounds, 20, 20, 20, 20);
  dayMaps[dayData.day] = map;
  dayMapMarkers[dayData.day] = markers;
  return map;
}

// ── 地圖圖例 ──────────────────────────────────────────
function renderMapLegend() {
  const legend = document.getElementById('map-legend');
  if (!legend) return;
  legend.innerHTML = '';
  ITINERARY.forEach(day => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `<div class="legend-dot" style="background:${day.color}"></div>${day.date}：${day.theme}`;
    legend.appendChild(item);
  });
}

// ── 行程卡片 ─────────────────────────────────────────
function renderDayCards() {
  const container = document.getElementById('days-container');
  container.innerHTML = '';

  ITINERARY.forEach((day, di) => {
    const transportKrw = calcDayTransport(day);
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
      </div>
      <div class="edit-btn-area" id="edit-btn-area-${day.day}">
        <button class="edit-btn" onclick="toggleDayEdit(${day.day})">✏️ 編輯</button>
      </div>`;
    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'day-body';

    const timeline = document.createElement('div');
    timeline.className = 'timeline';
    timeline.id = `timeline-day-${day.day}`;

    renderTimelineNormalContent(day, timeline);

    body.appendChild(timeline);

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
    tbody.id = `budget-tbody-${day.day}`;
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

    const note = document.createElement('div');
    note.className = 'uber-note';
    note.textContent = `起步 ₩4,800 · 每公里 ₩1,100（步行 < ${UBER.walkThreshold * 1000}m 免費）`;
    rightWrap.appendChild(note);

    body.appendChild(rightWrap);
    card.appendChild(body);
    container.appendChild(card);

    setTimeout(() => initDayMap(`map-day-${day.day}`, day), 0);
  });
}

// ── 編輯模式 ─────────────────────────────────────────
const editStates = {};
let dragSrcIdx = null;

function updateEditBtn(dayNum, isEditing) {
  const area = document.getElementById(`edit-btn-area-${dayNum}`);
  if (!area) return;
  if (isEditing) {
    area.innerHTML = `
      <button class="edit-save-btn" onclick="applyAndSaveDayEdit(${dayNum})">✅ 確定</button>
      <button class="edit-cancel-btn" onclick="cancelDayEdit(${dayNum})">❌ 取消</button>`;
  } else {
    area.innerHTML = `<button class="edit-btn" onclick="toggleDayEdit(${dayNum})">✏️ 編輯</button>`;
  }
}

function toggleDayEdit(dayNum) {
  const day = ITINERARY.find(d => d.day === dayNum);
  if (!day) return;
  editStates[dayNum] = {
    active: true,
    pendingSpots: day.spots.map(s => ({ ...s, budget: { ...s.budget } }))
  };
  renderTimelineForDay(dayNum, true);
  updateEditBtn(dayNum, true);
}

function cancelDayEdit(dayNum) {
  editStates[dayNum] = { active: false };
  renderTimelineForDay(dayNum, false);
  updateEditBtn(dayNum, false);
}

function renderTimelineForDay(dayNum, editMode) {
  const timelineEl = document.getElementById(`timeline-day-${dayNum}`);
  if (!timelineEl) return;
  const day = ITINERARY.find(d => d.day === dayNum);
  if (!day) return;
  timelineEl.innerHTML = '';
  if (editMode) {
    renderTimelineEditContent(day, dayNum, timelineEl);
  } else {
    renderTimelineNormalContent(day, timelineEl);
    updateDayBudgetTable(dayNum);
  }
}

function renderTimelineNormalContent(day, timelineEl) {
  const legs = calcDayLegs(day);
  day.spots.forEach((spot, si) => {
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
      timelineEl.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      const map = dayMaps[day.day];
      const markers = dayMapMarkers[day.day];
      if (map && markers && markers[si]) {
        map.setLevel(3, { anchor: markers[si].latlng, animate: true });
        map.panTo(markers[si].latlng);
        setTimeout(() => markers[si].el.click(), 500);
        document.getElementById(`map-day-${day.day}`).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
    timelineEl.appendChild(item);
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
      timelineEl.appendChild(pill);
    }
  });
}

function renderTimelineEditContent(day, dayNum, timelineEl) {
  const spots = editStates[dayNum].pendingSpots;
  spots.forEach((spot, si) => {
    const item = document.createElement('div');
    item.className = 'timeline-item edit-mode';
    item.draggable = true;
    item.dataset.si = si;
    item.innerHTML = `
      <div class="drag-handle" title="拖拉調換順序">⠿</div>
      <div class="timeline-dot">${SPOT_ICONS[spot.type] || '📍'}</div>
      <div class="timeline-content">
        <div class="timeline-name">
          <span class="spot-num" style="background:${day.color}">${si + 1}</span>
          ${spot.name}
        </div>
        <div class="timeline-name-kr">${spot.nameKr}</div>
        <div class="edit-fields">
          <div class="edit-row-inline">
            <label>⏰ 時間</label>
            <input type="text" class="edit-time" value="${(spot.time || '').replace(/"/g,'&quot;')}" placeholder="例如：09:30">
          </div>
          <textarea class="edit-desc" rows="2">${spot.desc.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</textarea>
          <div class="edit-costs">
            <div class="edit-cost-field">
              <label>🍽️ 餐飲₩</label>
              <input type="number" class="edit-food" value="${spot.budget.food}" min="0" step="1000">
            </div>
            <div class="edit-cost-field">
              <label>🎫 門票₩</label>
              <input type="number" class="edit-ticket" value="${spot.budget.ticket}" min="0" step="1000">
            </div>
            <div class="edit-cost-field">
              <label>🛍️ 購物₩</label>
              <input type="number" class="edit-shopping" value="${spot.budget.shopping}" min="0" step="1000">
            </div>
          </div>
        </div>
      </div>`;
    item.addEventListener('dragstart', e => {
      dragSrcIdx = si;
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      timelineEl.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('drag-over'));
    });
    item.addEventListener('dragover', e => {
      e.preventDefault();
      if (dragSrcIdx !== si) item.classList.add('drag-over');
    });
    item.addEventListener('dragleave', () => item.classList.remove('drag-over'));
    item.addEventListener('drop', e => {
      e.preventDefault();
      item.classList.remove('drag-over');
      if (dragSrcIdx === null || dragSrcIdx === si) return;
      collectEditValues(dayNum);
      const pending = editStates[dayNum].pendingSpots;
      const [moved] = pending.splice(dragSrcIdx, 1);
      pending.splice(si, 0, moved);
      dragSrcIdx = null;
      timelineEl.innerHTML = '';
      renderTimelineEditContent(day, dayNum, timelineEl);
    });
    timelineEl.appendChild(item);
  });
}

function collectEditValues(dayNum) {
  const timelineEl = document.getElementById(`timeline-day-${dayNum}`);
  if (!timelineEl || !editStates[dayNum]?.active) return;
  const items = timelineEl.querySelectorAll('.timeline-item.edit-mode');
  items.forEach((item, i) => {
    const spot = editStates[dayNum].pendingSpots[i];
    if (!spot) return;
    spot.time            = item.querySelector('.edit-time').value.trim();
    spot.desc            = item.querySelector('.edit-desc').value;
    spot.budget.food     = parseInt(item.querySelector('.edit-food').value)     || 0;
    spot.budget.ticket   = parseInt(item.querySelector('.edit-ticket').value)   || 0;
    spot.budget.shopping = parseInt(item.querySelector('.edit-shopping').value) || 0;
  });
}

async function applyAndSaveDayEdit(dayNum) {
  collectEditValues(dayNum);
  const state = editStates[dayNum];
  if (!state?.active) return;
  const day = ITINERARY.find(d => d.day === dayNum);
  if (!day) return;

  const prevOrder = day.spots.map(s => s.name);
  day.spots           = state.pendingSpots;
  day.summary.food     = day.spots.reduce((s, sp) => s + sp.budget.food,     0);
  day.summary.ticket   = day.spots.reduce((s, sp) => s + sp.budget.ticket,   0);
  day.summary.shopping = day.spots.reduce((s, sp) => s + sp.budget.shopping, 0);

  editStates[dayNum] = { active: false };
  renderTimelineForDay(dayNum, false);
  updateEditBtn(dayNum, false);

  const transportKrw = calcDayTransport(day);
  const nonTransport  = Object.entries(day.summary).filter(([k]) => k !== 'transport').reduce((s, [, v]) => s + v, 0);
  const dayTotal = nonTransport + transportKrw;
  const previewEl = document.getElementById(`day-preview-${day.day}`);
  if (previewEl) previewEl.textContent = `${formatKrw(dayTotal)} · ${krwToHkd(dayTotal)}`;

  renderTotalBudget();

  const orderChanged = prevOrder.some((n, i) => n !== day.spots[i]?.name);
  if (orderChanged) {
    initDayMap(`map-day-${day.day}`, day);
    initOverviewMap();
  }

  if (APPS_SCRIPT_URL) {
    await syncDayToSheet(day.spots);
  } else {
    showSyncToast('✅ 已更新（未設定 Apps Script，僅本地生效）');
  }
}

function updateDayBudgetTable(dayNum) {
  const tbody = document.getElementById(`budget-tbody-${dayNum}`);
  if (!tbody) return;
  const day = ITINERARY.find(d => d.day === dayNum);
  if (!day) return;
  const transportKrw = calcDayTransport(day);
  const nonTransportTotal = Object.entries(day.summary).filter(([k]) => k !== 'transport').reduce((s, [, v]) => s + v, 0);
  const dayTotal = nonTransportTotal + transportKrw;
  const cats = [
    { key: 'transport', label: '🚗 Uber 交通', dynamic: transportKrw },
    { key: 'food',      label: '🍽️ 餐飲' },
    { key: 'ticket',    label: '🎫 門票' },
    { key: 'shopping',  label: '🛍️ 購物' },
    { key: 'hotel',     label: '🏨 住宿' }
  ];
  let html = '';
  cats.forEach(cat => {
    const val = cat.dynamic !== undefined ? cat.dynamic : (day.summary[cat.key] || 0);
    if (val === 0) return;
    html += `<tr><td>${cat.label}</td><td class="krw">${formatKrw(val)}</td><td class="hkd" data-krw="${val}">${krwToHkd(val)}</td></tr>`;
  });
  html += `<tr class="total-row"><td>當日合計</td><td class="krw">${formatKrw(dayTotal)}</td><td class="hkd" data-krw="${dayTotal}">${krwToHkd(dayTotal)}</td></tr>`;
  tbody.innerHTML = html;
}

async function syncDayToSheet(spots) {
  if (!spots.length || spots.some(s => !s.rowIndex)) {
    showSyncToast('⚠️ 本地資料無法同步 Google Sheet');
    return;
  }
  // 拿出當日所有「原始 Sheet 行號」並排序成固定的行槽
  const rowSlots = spots.map(s => s.rowIndex).sort((a, b) => a - b);
  // 將目前（可能已重新排序的）spot 順序寫入這些行槽
  const updates = spots.map((spot, i) => ({
    row:      rowSlots[i],
    time:     spot.time || '',
    typeZh:   spot.typeZh || '',
    name:     spot.name || '',
    nameKr:   spot.nameKr || '',
    desc:     spot.desc || '',
    mapUrl:   spot.mapUrl || '',
    food:     spot.budget.food,
    ticket:   spot.budget.ticket,
    shopping: spot.budget.shopping
  }));
  try {
    const url = `${APPS_SCRIPT_URL}?data=${encodeURIComponent(JSON.stringify({ updates }))}`;
    await fetch(url, { mode: 'no-cors' });
    showSyncToast('✅ 已同步至 Google Sheet');
  } catch {
    showSyncToast('❌ 同步失敗，請檢查網路連線');
  }
}

function showSyncToast(msg) {
  let t = document.getElementById('sync-toast');
  if (!t) { t = document.createElement('div'); t.id = 'sync-toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = 'sync-toast show';
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), 3000);
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

// ── 全頁渲染 ──────────────────────────────────────────
function renderAll() {
  renderMapLegend();
  renderDayCards();
  renderTotalBudget();
  initOverviewMap();
  fetchExchangeRate();
}

// ── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  setSourceBadge('loading');

  try {
    const sheetsData = await fetchFromSheets();
    if (sheetsData) {
      ITINERARY.splice(0, ITINERARY.length, ...sheetsData);
      setSourceBadge('sheets');
    } else {
      setSourceBadge('local');
    }
  } catch (e) {
    console.warn('Google Sheets 載入失敗，使用本地資料：', e.message);
    setSourceBadge('local');
  }

  try {
    await loadKakaoSdk();
  } catch (e) {
    console.error('Kakao Maps SDK 載入失敗：', e);
    const ov = document.getElementById('overview-map');
    if (ov) ov.innerHTML = `<div style="padding:2rem;text-align:center;color:#c0392b;background:#fff5f5;border:1px solid #f5b7b1;border-radius:8px;">⚠️ Kakao 地圖載入失敗<br><small style="color:#666">${e.message}<br>請開瀏覽器 DevTools Console 查看詳細錯誤</small></div>`;
  }

  renderAll();

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
