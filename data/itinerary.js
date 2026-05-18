const TRIP = {
  outbound: { date: '2026-06-27', from: 'HKG', to: 'PUS', dep: '01:50', arr: '06:20' },
  inbound:  { date: '2026-07-01', from: 'PUS', to: 'HKG', dep: '21:50', arr: '00:15+1' }
};

const HOTEL = {
  name: 'Elmomento Songdo',
  nameKr: '엘모멘토 송도',
  lat: 35.0766008,
  lng: 129.023866,
  url: 'https://maps.app.goo.gl/XyrVeutMmWcJLpSr8'
};

const ITINERARY = [
  {
    day: 1,
    date: 'Day 1',
    dateLabel: '6月27日 (六)',
    theme: '抵釜 · 松島',
    color: '#e74c3c',
    spots: [
      {
        time: '06:20',
        type: 'transport',
        name: '金海國際機場抵達',
        nameKr: '김해국제공항 도착',
        desc: '由香港出發 (01:50)，抵達金海機場。乘搭機場巴士或地鐵前往松島酒店',
        lat: 35.1795, lng: 128.9381,
        budget: { transport: 8000, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '09:00',
        type: 'hotel',
        name: 'Elmomento Songdo 放行李',
        nameKr: '엘모멘토 송도',
        desc: '酒店 Check-in（或先寄存行李），梳洗休息。酒店位於松島海灘旁',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '10:30',
        type: 'beach',
        name: '松島海水浴場',
        nameKr: '송도해수욕장',
        desc: '釜山最古老的海水浴場，酒店步行可達，早上人少，環境清幽',
        lat: 35.0735, lng: 129.0165,
        budget: { transport: 0, food: 8000, ticket: 0, shopping: 0 }
      },
      {
        time: '12:30',
        type: 'attraction',
        name: '松島天空步道',
        nameKr: '송도해상케이블카',
        desc: '松島海上纜車，可鳥瞰整個松島灣，票價約 KRW 15,000',
        lat: 35.0694, lng: 129.0109,
        budget: { transport: 0, food: 0, ticket: 15000, shopping: 0 }
      },
      {
        time: '15:00',
        type: 'area',
        name: '南浦洞 · 光復路',
        nameKr: '남포동 · 광복로',
        desc: '購物街及街頭小食集中地，逛逛補充能量',
        lat: 35.0972, lng: 129.0263,
        budget: { transport: 2500, food: 15000, ticket: 0, shopping: 20000 }
      },
      {
        time: '18:30',
        type: 'food',
        name: '扎嘎其市場晚餐',
        nameKr: '자갈치시장',
        desc: '韓國最大水產市場，即買即食新鮮海鮮，第一晚必到',
        lat: 35.0973, lng: 129.0246,
        budget: { transport: 1500, food: 30000, ticket: 0, shopping: 0 }
      },
      {
        time: '21:00',
        type: 'hotel',
        name: 'Elmomento Songdo 返回酒店',
        nameKr: '엘모멘토 송도 귀환',
        desc: '搭乘 Uber 由扎嘎其市場返回松島酒店，結束第一天行程',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      }
    ],
    hotel: HOTEL,
    summary: { transport: 0, food: 53000, ticket: 15000, shopping: 20000, hotel: 234863 }
  },
  {
    day: 2,
    date: 'Day 2',
    dateLabel: '6月28日 (日)',
    theme: '甘川文化村 · BIFF 廣場',
    color: '#3498db',
    spots: [
      {
        time: '09:00',
        type: 'hotel',
        name: 'Elmomento Songdo 出發',
        nameKr: '엘모멘토 송도 출발',
        desc: '由松島酒店出發，前往今日第一站甘川文化村',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '09:30',
        type: 'attraction',
        name: '甘川文化村',
        nameKr: '감천문화마을',
        desc: '韓國最美山坡村落，五彩斑斕的房屋，有「韓國馬丘比丘」之稱',
        lat: 35.0969, lng: 129.0103,
        budget: { transport: 2000, food: 0, ticket: 2000, shopping: 10000 }
      },
      {
        time: '12:00',
        type: 'food',
        name: '土城洞午餐',
        nameKr: '토성동',
        desc: '甘川附近的在地食堂，享用傳統韓式定食',
        lat: 35.1000, lng: 129.0150,
        budget: { transport: 0, food: 12000, ticket: 0, shopping: 0 }
      },
      {
        time: '14:00',
        type: 'attraction',
        name: '龍頭山公園 · 釜山塔',
        nameKr: '용두산공원 · 부산타워',
        desc: '登釜山塔俯瞰全市及港口，塔高 120m，門票 KRW 12,000',
        lat: 35.1006, lng: 129.0315,
        budget: { transport: 1500, food: 0, ticket: 12000, shopping: 0 }
      },
      {
        time: '15:30',
        type: 'area',
        name: 'BIFF 廣場',
        nameKr: 'BIFF광장',
        desc: '釜山國際電影節舉辦地，有明星手印及街頭小食攤',
        lat: 35.0975, lng: 129.0274,
        budget: { transport: 0, food: 8000, ticket: 0, shopping: 0 }
      },
      {
        time: '17:00',
        type: 'attraction',
        name: '影島大橋',
        nameKr: '영도대교',
        desc: '釜山歷史名橋，每日下午 2 時開橋儀式',
        lat: 35.0958, lng: 129.0300,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '19:00',
        type: 'food',
        name: '釜平夜市',
        nameKr: '부평깡통시장 야시장',
        desc: '釜平罐頭市場夜市，各式街頭美食一次過試齊',
        lat: 35.1003, lng: 129.0290,
        budget: { transport: 1500, food: 25000, ticket: 0, shopping: 8000 }
      },
      {
        time: '21:30',
        type: 'hotel',
        name: 'Elmomento Songdo 返回酒店',
        nameKr: '엘모멘토 송도 귀환',
        desc: '搭乘 Uber 由釜平夜市返回松島酒店，結束充實的第二天行程',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      }
    ],
    hotel: HOTEL,
    summary: { transport: 0, food: 45000, ticket: 14000, shopping: 18000, hotel: 234863 }
  },
  {
    day: 3,
    date: 'Day 3',
    dateLabel: '6月29日 (一)',
    theme: '海雲台 · 美食之旅',
    color: '#2ecc71',
    spots: [
      {
        time: '07:30',
        type: 'hotel',
        name: 'Elmomento Songdo 出發',
        nameKr: '엘모멘토 송도 출발',
        desc: '由松島酒店出發，前往海雲台享用早餐',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '08:00',
        type: 'food',
        name: '奶奶河蜆湯早餐',
        nameKr: '할매재첩국',
        desc: '海雲台在地老字號，清甜河蜆湯配白飯，鮮味十足，是海雲台人每天早晨的美味開始',
        lat: 35.1518615, lng: 129.1163713,
        budget: { transport: 0, food: 10000, ticket: 0, shopping: 0 }
      },
      {
        time: '09:30',
        type: 'beach',
        name: '海雲台海水浴場',
        nameKr: '해운대해수욕장',
        desc: '韓國最著名海灘，白色沙灘綿延 1.5km，夏季人氣最旺',
        lat: 35.1587, lng: 129.1604,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '11:00',
        type: 'attraction',
        name: '冬柏島',
        nameKr: '동백섬',
        desc: '海雲台旁的半島公園，APEC 峰會場地，沿岸步道景色優美',
        lat: 35.1543, lng: 129.1573,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '12:30',
        type: 'food',
        name: '화륵 韓牛漢堡排午餐',
        nameKr: '화륵',
        desc: '海雲台人氣韓牛漢堡排專門店，採用頂級韓牛製作多汁嫩滑的漢堡排，配特製醬汁，必食',
        lat: 35.1571861, lng: 129.1217643,
        budget: { transport: 0, food: 25000, ticket: 0, shopping: 0 }
      },
      {
        time: '14:30',
        type: 'attraction',
        name: '海雲台 Blueline Park',
        nameKr: '해운대 블루라인파크',
        desc: '沿釜山海岸線行駛的觀光小火車，途經青沙浦、松亭等海灘，景色絕美，強烈推薦',
        lat: 35.1600, lng: 129.1900,
        budget: { transport: 0, food: 0, ticket: 15000, shopping: 0 }
      },
      {
        time: '16:30',
        type: 'cafe',
        name: 'Coralani 松亭下午茶',
        nameKr: '코라라니',
        desc: '松亭海灘旁的人氣咖啡廳，提供精緻甜品及特調飲品，坐擁無敵海景，是 Blueline Park 終點站旁的必到打卡地',
        lat: 35.1824072, lng: 129.2088791,
        budget: { transport: 0, food: 18000, ticket: 0, shopping: 0 }
      },
      {
        time: '19:00',
        type: 'food',
        name: '거대갈비 巨大排骨晚餐',
        nameKr: '거대갈비 본점',
        desc: '以超大份量韓牛烤排骨聞名全釜山，肉質鮮嫩多汁，份量驚人，位於 Dalmaji 海岸線，是海雲台一帶最具特色的燒烤名店',
        lat: 35.1615085, lng: 129.1668928,
        budget: { transport: 0, food: 50000, ticket: 0, shopping: 0 }
      },
      {
        time: '21:30',
        type: 'hotel',
        name: 'Elmomento Songdo 返回酒店',
        nameKr: '엘모멘토 송도 귀환',
        desc: '搭乘 Uber 由 Dalmaji 返回松島酒店，結束海雲台美食之旅',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      }
    ],
    hotel: HOTEL,
    summary: { transport: 0, food: 103000, ticket: 15000, shopping: 0, hotel: 234863 }
  },
  {
    day: 4,
    date: 'Day 4',
    dateLabel: '6月30日 (二)',
    theme: '梵魚寺 · 機張醬蟹',
    color: '#9b59b6',
    spots: [
      {
        time: '08:00',
        type: 'hotel',
        name: 'Elmomento Songdo 出發',
        nameKr: '엘모멘토 송도 출발',
        desc: '由松島酒店出發，前往金井山梵魚寺',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '08:30',
        type: 'temple',
        name: '梵魚寺',
        nameKr: '범어사',
        desc: '韓國三大名剎之一，金井山中的千年古寺，寧靜莊嚴',
        lat: 35.2800, lng: 129.0596,
        budget: { transport: 4000, food: 0, ticket: 1500, shopping: 0 }
      },
      {
        time: '10:30',
        type: 'attraction',
        name: '金井山城健行',
        nameKr: '금정산성',
        desc: '梵魚寺上方的古代山城遺址，可健行觀景，鳥瞰釜山市區',
        lat: 35.2850, lng: 129.0580,
        budget: { transport: 0, food: 8000, ticket: 0, shopping: 0 }
      },
      {
        time: '13:00',
        type: 'area',
        name: '西面商圈',
        nameKr: '서면',
        desc: '釜山最繁華商圈，午餐後逛街，地鐵西面站附近',
        lat: 35.1579, lng: 129.0596,
        budget: { transport: 3000, food: 15000, ticket: 0, shopping: 20000 }
      },
      {
        time: '16:00',
        type: 'cafe',
        name: '田浦咖啡街',
        nameKr: '전포카페거리',
        desc: '充滿特色咖啡店的街道，下午茶必到',
        lat: 35.1547, lng: 129.0597,
        budget: { transport: 0, food: 10000, ticket: 0, shopping: 0 }
      },
      {
        time: '18:30',
        type: 'food',
        name: '機張市場醬蟹',
        nameKr: '기장시장 간장게장',
        desc: '釜山必食「醬油醃蟹」，有「白飯小偷」之稱，提前預約較穩陣',
        lat: 35.2448, lng: 129.2124,
        budget: { transport: 5000, food: 50000, ticket: 0, shopping: 0 }
      },
      {
        time: '21:00',
        type: 'hotel',
        name: 'Elmomento Songdo 返回酒店',
        nameKr: '엘모멘토 송도 귀환',
        desc: '搭乘 Uber 由機張返回松島酒店，機張距酒店約 25 km，預計車程 35 分鐘',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      }
    ],
    hotel: HOTEL,
    summary: { transport: 0, food: 83000, ticket: 1500, shopping: 20000, hotel: 234863 }
  },
  {
    day: 5,
    date: 'Day 5',
    dateLabel: '7月1日 (三)',
    theme: '太宗台 · 歸港',
    color: '#f39c12',
    spots: [
      {
        time: '08:30',
        type: 'hotel',
        name: 'Elmomento Songdo Check-out',
        nameKr: '엘모멘토 송도 체크아웃',
        desc: '11:00 前完成退房，行李寄存於酒店，輕裝出發遊覽太宗台',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '09:00',
        type: 'attraction',
        name: '太宗台公園',
        nameKr: '태종대',
        desc: '釜山最南端懸崖景點，可遠眺對馬島，乘 Danubi 小火車遊園',
        lat: 35.0435, lng: 129.0854,
        budget: { transport: 3000, food: 0, ticket: 3000, shopping: 0 }
      },
      {
        time: '11:00',
        type: 'cafe',
        name: 'THRILL ON THE MUG 懸崖咖啡廳',
        nameKr: '스릴온더머그',
        desc: '影島海邊超人氣咖啡廳，坐擁釜山港灣絕美海景，離港前最後一杯咖啡，飲品約 KRW 6,000–8,000',
        lat: 35.0599892, lng: 129.071508,
        budget: { transport: 0, food: 8000, ticket: 0, shopping: 0 }
      },
      {
        time: '13:00',
        type: 'hotel',
        name: 'Elmomento Songdo 取回行李',
        nameKr: '엘모멘토 송도 짐 수령',
        desc: '返回松島酒店取回寄存行李，再前往南浦洞購物',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '13:30',
        type: 'shopping',
        name: '南浦洞手信採購',
        nameKr: '남포동 기념품',
        desc: '最後購買手信：零食、護膚品、泡麵，準備回港',
        lat: 35.0972, lng: 129.0263,
        budget: { transport: 1500, food: 10000, ticket: 0, shopping: 40000 }
      },
      {
        time: '18:30',
        type: 'transport',
        name: '前往金海國際機場',
        nameKr: '김해국제공항 출발',
        desc: '乘搭地鐵或機場巴士前往機場，航班 21:50 起飛回香港 (00:15+1)',
        lat: 35.1795, lng: 128.9381,
        budget: { transport: 8000, food: 15000, ticket: 0, shopping: 0 }
      }
    ],
    hotel: null,
    summary: { transport: 0, food: 33000, ticket: 3000, shopping: 40000, hotel: 0 }
  }
];

const SPOT_ICONS = {
  transport: '✈️',
  area: '🏙️',
  cafe: '☕',
  food: '🍽️',
  beach: '🏖️',
  attraction: '📍',
  temple: '⛩️',
  shopping: '🛍️',
  hotel: '🏨'
};
