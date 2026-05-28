const TRIP = {
  outbound: { date: '2026-06-27', from: 'HKG', to: 'ICN', arr: '01:35' },
  inbound:  { date: '2026-07-01', from: 'PUS', to: 'HKG', dep: '21:50', arr: '00:15+1' }
};

const HOTEL = {
  name: 'Elmomento Songdo',
  nameKr: '엘모멘토 송도',
  lat: 35.0766008,
  lng: 129.023866,
  url: 'https://maps.app.goo.gl/XyrVeutMmWcJLpSr8'
};

const HOTEL_INCHEON = {
  name: '仁川 Sky Stay Hotel',
  nameKr: '인천 스카이스테이 호텔',
  lat: 37.4738,
  lng: 126.4800
};

const ITINERARY = [
  // ─────────────────────────────────────────────
  // Day 1 · 6月27日 · 首爾
  // ─────────────────────────────────────────────
  {
    day: 1,
    date: 'Day 1',
    dateLabel: '6月27日 (六)',
    theme: '仁川抵達 · 首爾半日 · KTX',
    color: '#e74c3c',
    spots: [
      {
        time: '01:35',
        type: 'transport',
        name: '仁川國際機場抵達',
        nameKr: '인천국제공항 도착',
        desc: '由香港出發，深夜抵達仁川國際機場。辦理入境手續後乘的士前往機場附近酒店短暫休息',
        lat: 37.4602, lng: 126.4407,
        budget: { transport: 20000, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '02:30',
        type: 'hotel',
        name: '仁川 Sky Stay Hotel 入住',
        nameKr: '인천 스카이스테이 호텔 체크인',
        desc: '仁川機場附近酒店，短暫休息至早上 11:00 退房',
        lat: HOTEL_INCHEON.lat, lng: HOTEL_INCHEON.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '11:00',
        type: 'hotel',
        name: '仁川 Sky Stay Hotel 退房',
        nameKr: '인천 스카이스테이 호텔 체크아웃',
        desc: '11:00 前完成退房，步行至 AREX 仁川機場站，準備進入首爾市區',
        lat: HOTEL_INCHEON.lat, lng: HOTEL_INCHEON.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '12:00',
        type: 'transport',
        name: 'AREX 機鐵 · 仁川→首爾',
        nameKr: 'AREX 공항철도 직통열차',
        desc: '乘搭 AREX 直達列車（約 43 分鐘）前往首爾站，車費約 ₩9,500',
        lat: 37.5547, lng: 126.9706,
        budget: { transport: 9500, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '13:30',
        type: 'food',
        name: '明洞午餐',
        nameKr: '명동 점심',
        desc: '首爾最熱鬧商業街，街頭小食豐富（炸雞、海鮮煎餅、起司年糕），感受首爾市場活力',
        lat: 37.5636, lng: 126.9869,
        budget: { transport: 0, food: 15000, ticket: 0, shopping: 0 }
      },
      {
        time: '15:00',
        type: 'attraction',
        name: '景福宮',
        nameKr: '경복궁',
        desc: '朝鮮王朝最大皇宮，可穿韓服入場拍照，門票 ₩3,000；附近有光化門廣場及北村韓屋村',
        lat: 37.5796, lng: 126.9770,
        budget: { transport: 0, food: 0, ticket: 3000, shopping: 0 }
      },
      {
        time: '17:00',
        type: 'area',
        name: '弘大商圈',
        nameKr: '홍대',
        desc: '首爾年輕潮流聖地，街頭表演、個性小店、韓系美妝一條龍，感受首爾最真實的活力',
        lat: 37.5563, lng: 126.9241,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '19:00',
        type: 'transport',
        name: '首爾站 KTX 出發 → 釜山',
        nameKr: '서울역 KTX 부산행 출발',
        desc: 'KTX 高鐵由首爾站出發，全程約 2 小時 30 分鐘抵達釜山站，車費約 ₩59,800',
        lat: 37.5547, lng: 126.9706,
        budget: { transport: 59800, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '21:30',
        type: 'transport',
        name: '釜山站抵達',
        nameKr: '부산역 도착',
        desc: 'KTX 抵達釜山站，乘搭 Uber 或地鐵前往松島酒店辦理入住',
        lat: 35.1152, lng: 129.0390,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '22:15',
        type: 'hotel',
        name: 'Elmomento Songdo Check-in',
        nameKr: '엘모멘토 송도 체크인',
        desc: '抵達松島酒店辦理入住，結束首日行程，明天開始正式遊覽釜山',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      }
    ],
    hotel: HOTEL,
    summary: { transport: 89300, food: 15000, ticket: 3000, shopping: 0, hotel: 100000 }
  },

  // ─────────────────────────────────────────────
  // Day 2 · 6月28日 · 釜山（松島 + 甘川）
  // ─────────────────────────────────────────────
  {
    day: 2,
    date: 'Day 2',
    dateLabel: '6月28日 (日)',
    theme: '松島 · 甘川 · 扎嘎其',
    color: '#3498db',
    spots: [
      {
        time: '08:30',
        type: 'hotel',
        name: 'Elmomento Songdo 出發',
        nameKr: '엘모멘토 송도 출발',
        desc: '由松島酒店出發，開始第一個完整釜山遊覽日',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '09:00',
        type: 'food',
        name: '水邊最高 豬肉湯飯',
        nameKr: '수변최고 돼지국밥',
        desc: '沙上站附近 24 小時營業人氣豬肉湯飯，濃郁清甜湯底配白飯，釜山式早餐首選',
        lat: 35.1455, lng: 128.9902,
        budget: { transport: 0, food: 8000, ticket: 0, shopping: 0 }
      },
      {
        time: '10:30',
        type: 'attraction',
        name: '松島海上纜車',
        nameKr: '송도해상케이블카',
        desc: '釜山最長海上纜車，可鳥瞰松島灣全景，透明玻璃底車廂刺激有趣，票價約 ₩15,000',
        lat: 35.0795, lng: 129.0178,
        budget: { transport: 0, food: 0, ticket: 15000, shopping: 0 }
      },
      {
        time: '12:30',
        type: 'food',
        name: '海底貝殼王國 午餐',
        nameKr: '해저패각왕국',
        desc: '松島纜車附近的新鮮海鮮燒烤店，現買現烤貝殼海產，價格實惠，深受本地人喜愛',
        lat: 35.0726, lng: 129.0188,
        budget: { transport: 0, food: 20000, ticket: 0, shopping: 0 }
      },
      {
        time: '14:00',
        type: 'attraction',
        name: '松島天空步道',
        nameKr: '송도 스카이워크',
        desc: '松島海岸透明玻璃棧道，腳下就是大海，俯瞰松島灣壯麗景色，免費入場',
        lat: 35.0731, lng: 129.0198,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '15:30',
        type: 'attraction',
        name: '甘川文化村',
        nameKr: '감천문화마을',
        desc: '韓國最美山坡村落，五彩斑斕的房屋，有「韓國馬丘比丘」之稱，打卡必到',
        lat: 35.0963, lng: 129.0088,
        budget: { transport: 0, food: 0, ticket: 2000, shopping: 10000 }
      },
      {
        time: '18:30',
        type: 'food',
        name: '扎嘎其市場 晚餐',
        nameKr: '자갈치시장',
        desc: '韓國最大水產市場，即買即食新鮮海鮮，炸物一條街熱鬧非凡，釜山第一晚必到',
        lat: 35.0973, lng: 129.0246,
        budget: { transport: 0, food: 20000, ticket: 0, shopping: 0 }
      },
      {
        time: '20:30',
        type: 'hotel',
        name: 'Elmomento Songdo 返回酒店',
        nameKr: '엘모멘토 송도 귀환',
        desc: '由扎嘎其市場乘搭 Uber 返回松島酒店，結束釜山第一天行程',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      }
    ],
    hotel: HOTEL,
    summary: { transport: 0, food: 48000, ticket: 17000, shopping: 10000, hotel: 234863 }
  },

  // ─────────────────────────────────────────────
  // Day 3 · 6月29日 · 釜山（南浦洞 + 影島 + 廣安里）
  // ─────────────────────────────────────────────
  {
    day: 3,
    date: 'Day 3',
    dateLabel: '6月29日 (一)',
    theme: '南浦洞 · 影島 · 廣安里',
    color: '#2ecc71',
    spots: [
      {
        time: '08:00',
        type: 'hotel',
        name: 'Elmomento Songdo 出發',
        nameKr: '엘모멘토 송도 출발',
        desc: '由松島酒店出發，前往南浦洞享用早餐',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '09:00',
        type: 'food',
        name: '國際市場 韓式早餐',
        nameKr: '국제시장 아침',
        desc: '南浦洞旁釜山最大傳統市場，早市熱鬧，尋找在地早點：魚板、떡볶이、 순대，感受釜山市井生活',
        lat: 35.0993, lng: 129.0289,
        budget: { transport: 0, food: 8000, ticket: 0, shopping: 0 }
      },
      {
        time: '10:00',
        type: 'attraction',
        name: '龍頭山公園 · 釜山塔',
        nameKr: '용두산공원 · 부산타워',
        desc: '登釜山塔俯瞰全市及港口，塔高 120m，360° 全景觀景台，門票 ₩12,000',
        lat: 35.1006, lng: 129.0315,
        budget: { transport: 0, food: 0, ticket: 12000, shopping: 0 }
      },
      {
        time: '11:30',
        type: 'area',
        name: 'BIFF 廣場',
        nameKr: 'BIFF광장',
        desc: '釜山國際電影節舉辦地，有明星手印及街頭小食攤，씨앗호떡（烤芝麻糖餅）必試',
        lat: 35.0975, lng: 129.0274,
        budget: { transport: 0, food: 5000, ticket: 0, shopping: 0 }
      },
      {
        time: '13:00',
        type: 'food',
        name: '南浦洞 밀면 午餐',
        nameKr: '남포동 밀면',
        desc: '釜山獨家特色冷麵「밀면」，以小麥粉製作，口感爽滑彈牙，夏日消暑首選，南浦洞一帶多家在地老字號',
        lat: 35.0990, lng: 129.0258,
        budget: { transport: 0, food: 13000, ticket: 0, shopping: 0 }
      },
      {
        time: '14:30',
        type: 'attraction',
        name: '影島大橋',
        nameKr: '영도대교',
        desc: '釜山歷史名橋，韓國唯一可升降的開合橋，每日下午 2 時舉行開橋儀式',
        lat: 35.0958, lng: 129.0300,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '15:30',
        type: 'cafe',
        name: 'THRILL ON THE MUG 下午茶 ⭐',
        nameKr: '스릴온더머그',
        desc: '影島海邊超人氣懸崖咖啡廳，坐擁釜山港灣絕美海景，大片落地玻璃面向大海，飲品約 ₩8,000–10,000',
        lat: 35.0599892, lng: 129.071508,
        budget: { transport: 0, food: 10000, ticket: 0, shopping: 0 }
      },
      {
        time: '17:30',
        type: 'beach',
        name: '廣安里海水浴場',
        nameKr: '광안리해수욕장',
        desc: '廣안大橋正對面的美麗海灘，傍晚散步吹海風，等待橋燈亮起的黃金時刻',
        lat: 35.1531, lng: 129.1186,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '19:00',
        type: 'food',
        name: 'Nasari食堂 晚餐',
        nameKr: '나사리식당',
        desc: '廣안里人氣食堂，以韓式家庭料理著稱，새우장（醬油蝦）及各式小菜豐富，地鐵廣안站步行 13 分',
        lat: 35.1529, lng: 129.1193,
        budget: { transport: 0, food: 25000, ticket: 0, shopping: 0 }
      },
      {
        time: '21:00',
        type: 'attraction',
        name: '廣안大橋夜景',
        nameKr: '광안대교 야경',
        desc: '釜山最上鏡夜景地標，廣안大橋 LED 燈光倒映海面，從海灘漫步欣賞即可',
        lat: 35.1430, lng: 129.1085,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '22:00',
        type: 'hotel',
        name: 'Elmomento Songdo 返回酒店',
        nameKr: '엘모멘토 송도 귀환',
        desc: '搭乘 Uber 由廣안里返回松島酒店，結束充實的第三天行程',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      }
    ],
    hotel: HOTEL,
    summary: { transport: 0, food: 61000, ticket: 12000, shopping: 0, hotel: 234863 }
  },

  // ─────────────────────────────────────────────
  // Day 4 · 6月30日 · 釜山（海雲台 + 松亭）
  // ─────────────────────────────────────────────
  {
    day: 4,
    date: 'Day 4',
    dateLabel: '6月30日 (二)',
    theme: '海雲台 · 松亭 · 5大必食日',
    color: '#9b59b6',
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
        name: '奶奶河蜆湯 早餐 ⭐',
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
        desc: '韓國最著名海灘，白色沙灘綿延 1.5km，夏季人氣最旺，早上清靜，沙灘散步最佳時機',
        lat: 35.1587, lng: 129.1604,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '11:00',
        type: 'attraction',
        name: '冬柏島',
        nameKr: '동백섬',
        desc: '海雲台旁的半島公園，APEC 峰會場地，沿岸步道景色優美，可遠眺 마린시티 摩天大廈群',
        lat: 35.1543, lng: 129.1573,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '12:30',
        type: 'food',
        name: '화륵 韓牛漢堡排 午餐 ⭐',
        nameKr: '화륵',
        desc: '海雲台人氣韓牛漢堡排專門店，採用頂級韓牛製作多汁嫩滑的漢堡排，配特製醬汁，必食',
        lat: 35.1571861, lng: 129.1217643,
        budget: { transport: 0, food: 25000, ticket: 0, shopping: 0 }
      },
      {
        time: '14:30',
        type: 'attraction',
        name: '海岸列車 Blueline Park',
        nameKr: '해운대 블루라인파크',
        desc: '沿釜山海岸線行駛的觀光小火車，途經청사포、松亭等海灘，部分路段懸空於海面上方，景色絕美',
        lat: 35.1600, lng: 129.1900,
        budget: { transport: 0, food: 0, ticket: 18000, shopping: 0 }
      },
      {
        time: '16:30',
        type: 'cafe',
        name: 'Coralani 下午茶 ⭐',
        nameKr: '코라라니',
        desc: '松亭海灘旁的人氣咖啡廳，提供精緻甜品及特調飲品，坐擁無敵海景，是 Blueline Park 終點站旁的必到打卡地',
        lat: 35.1824072, lng: 129.2088791,
        budget: { transport: 0, food: 18000, ticket: 0, shopping: 0 }
      },
      {
        time: '19:00',
        type: 'food',
        name: '거대갈비 巨大排骨 晚餐 ⭐',
        nameKr: '거대갈비 본점',
        desc: '以超大份量韓牛烤排骨聞名全釜山，肉質鮮嫩多汁，份量驚人，位於 Dalmaji 海岸線，是海雲台一帶最具特色的燒烤名店',
        lat: 35.1615085, lng: 129.1668928,
        budget: { transport: 0, food: 50000, ticket: 0, shopping: 0 }
      },
      {
        time: '21:00',
        type: 'hotel',
        name: 'Elmomento Songdo 返回酒店',
        nameKr: '엘모멘토 송도 귀환',
        desc: '搭乘 Uber 由 Dalmaji 返回松島酒店，結束海雲台美食之旅',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      }
    ],
    hotel: HOTEL,
    summary: { transport: 0, food: 103000, ticket: 18000, shopping: 0, hotel: 234863 }
  },

  // ─────────────────────────────────────────────
  // Day 5 · 7月1日 · 釜山（手信採購 + 歸港）
  // ─────────────────────────────────────────────
  {
    day: 5,
    date: 'Day 5',
    dateLabel: '7月1日 (三)',
    theme: '手信採購 · 歸港',
    color: '#f39c12',
    spots: [
      {
        time: '08:30',
        type: 'hotel',
        name: 'Elmomento Songdo Check-out',
        nameKr: '엘모멘토 송도 체크아웃',
        desc: '11:00 前完成退房，行李寄存於酒店，輕裝出發作最後遊覽',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '09:00',
        type: 'food',
        name: '松島早餐',
        nameKr: '송도 아침식사',
        desc: '酒店附近的在地早餐，輕鬆享用最後一頓釜山早點，迎接回港前的最後一天',
        lat: 35.0735, lng: 129.0165,
        budget: { transport: 0, food: 8000, ticket: 0, shopping: 0 }
      },
      {
        time: '10:30',
        type: 'shopping',
        name: '南浦洞手信採購',
        nameKr: '남포동 기념품',
        desc: '購買手信：零食（辣炒年糕片、海苔、堅果）、護膚品、泡麵，光復路 Olive Young 護膚品必掃',
        lat: 35.0972, lng: 129.0263,
        budget: { transport: 0, food: 10000, ticket: 0, shopping: 40000 }
      },
      {
        time: '12:30',
        type: 'food',
        name: '南浦洞午餐',
        nameKr: '남포동 점심',
        desc: '釜山最後一頓午餐，可選擇在地韓食或快餐，為回程做好準備',
        lat: 35.0975, lng: 129.0275,
        budget: { transport: 0, food: 15000, ticket: 0, shopping: 0 }
      },
      {
        time: '15:00',
        type: 'shopping',
        name: 'Olive Young 廣안里 / 남포洞',
        nameKr: '올리브영',
        desc: '韓國最大美妝連鎖，最後補購護膚品、面膜、彩妝手信，退稅記得留收據',
        lat: 35.0975, lng: 129.0270,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 10000 }
      },
      {
        time: '17:30',
        type: 'hotel',
        name: 'Elmomento Songdo 取回行李',
        nameKr: '엘모멘토 송도 짐 수령',
        desc: '返回松島酒店取回 Check-out 後寄存的行李，準備前往機場',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '18:30',
        type: 'transport',
        name: '前往金海國際機場',
        nameKr: '김해국제공항 출발',
        desc: '由松島酒店乘搭機場巴士或 Uber 前往機場，航班 21:50 起飛回香港 (00:15+1)',
        lat: 35.1795, lng: 128.9381,
        budget: { transport: 8000, food: 0, ticket: 0, shopping: 0 }
      }
    ],
    hotel: null,
    summary: { transport: 0, food: 33000, ticket: 0, shopping: 50000, hotel: 0 }
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
