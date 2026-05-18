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
    theme: '到達 · 松島 · 甘川',
    color: '#e74c3c',
    spots: [
      {
        time: '06:20',
        type: 'transport',
        name: '金海國際機場抵達',
        nameKr: '김해국제공항 도착',
        desc: '由香港出發 (01:50)，抵達金海機場。乘搭 BGL 輕軌至沙上站寄存大件行李',
        lat: 35.1795, lng: 128.9381,
        budget: { transport: 8000, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '07:15',
        type: 'transport',
        name: '沙上站 行李寄存',
        nameKr: '사상역 물품보관함',
        desc: '金海機場乘 BGL 輕軌（約 20 分鐘）抵沙上站，使用站內 coin locker 寄存大件行李（約 ₩4,000–6,000），輕裝直接出發遊覽',
        lat: 35.1481, lng: 128.9918,
        budget: { transport: 0, food: 0, ticket: 5000, shopping: 0 }
      },
      {
        time: '08:30',
        type: 'food',
        name: '水邊最高 豬肉湯飯',
        nameKr: '수변최고 돼지국밥',
        desc: '沙上站附近 24 小時營業的人氣豬肉湯飯，濃郁清甜湯底配白飯，第一餐暖胃之選',
        lat: 35.1455, lng: 128.9902,
        budget: { transport: 0, food: 8000, ticket: 0, shopping: 0 }
      },
      {
        time: '10:30',
        type: 'attraction',
        name: '松島海上纜車',
        nameKr: '송도해상케이블카',
        desc: '釜山最長海上纜車，可鳥瞰松島灣全景，透明玻璃底車廂刺激有趣，票價約 ₩15,000',
        lat: 35.0694, lng: 129.0109,
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
        lat: 35.0969, lng: 129.0103,
        budget: { transport: 0, food: 0, ticket: 2000, shopping: 10000 }
      },
      {
        time: '18:30',
        type: 'food',
        name: '扎嘎其市場 晚餐',
        nameKr: '자갈치시장',
        desc: '韓國最大水產市場，即買即食新鮮海鮮，炸物一條街熱鬧非凡，第一晚必到',
        lat: 35.0973, lng: 129.0246,
        budget: { transport: 0, food: 20000, ticket: 0, shopping: 0 }
      },
      {
        time: '20:30',
        type: 'transport',
        name: '沙上站 取回行李',
        nameKr: '사상역 물품보관함 수령',
        desc: '由扎嘎其市場乘地鐵至沙上站（사상역），取回早上寄存的大件行李',
        lat: 35.1481, lng: 128.9918,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '21:30',
        type: 'hotel',
        name: 'Elmomento Songdo 返回酒店',
        nameKr: '엘모멘토 송도 귀환',
        desc: '攜行李搭乘 Uber 返回松島酒店，結束第一天行程',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      }
    ],
    hotel: HOTEL,
    summary: { transport: 0, food: 48000, ticket: 22000, shopping: 10000, hotel: 234863 }
  },
  {
    day: 2,
    date: 'Day 2',
    dateLabel: '6月28日 (日)',
    theme: '南浦洞 · 影島 · 廣安里',
    color: '#3498db',
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
        desc: '廣安大橋正對面的美麗海灘，傍晚散步吹海風，等待橋燈亮起的黃金時刻',
        lat: 35.1531, lng: 129.1186,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '19:00',
        type: 'food',
        name: 'Nasari食堂 晚餐',
        nameKr: '나사리식당',
        desc: '廣安里人氣食堂，以韓式家庭料理著稱，새우장（醬油蝦）及各式小菜豐富，地鐵廣안站步行 13 分',
        lat: 35.1545, lng: 129.1190,
        budget: { transport: 0, food: 25000, ticket: 0, shopping: 0 }
      },
      {
        time: '21:00',
        type: 'attraction',
        name: '廣安大橋夜景',
        nameKr: '광안대교 야경',
        desc: '釜山最上鏡夜景地標，廣安大橋 LED 燈光倒映海面，從海灘漫步欣賞即可',
        lat: 35.1430, lng: 129.1085,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '22:00',
        type: 'hotel',
        name: 'Elmomento Songdo 返回酒店',
        nameKr: '엘모멘토 송도 귀환',
        desc: '搭乘 Uber 由廣安里返回松島酒店，結束充實的第二天行程',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      }
    ],
    hotel: HOTEL,
    summary: { transport: 0, food: 61000, ticket: 12000, shopping: 0, hotel: 234863 }
  },
  {
    day: 3,
    date: 'Day 3',
    dateLabel: '6月29日 (一)',
    theme: '海雲台 · 松亭 · 5大必食日',
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
  {
    day: 4,
    date: 'Day 4',
    dateLabel: '6月30日 (二)',
    theme: '廣安里 · 機張 · 西面',
    color: '#9b59b6',
    spots: [
      {
        time: '08:00',
        type: 'hotel',
        name: 'Elmomento Songdo 出發',
        nameKr: '엘모멘토 송도 출발',
        desc: '由松島酒店出發，前往廣安里享用早餐',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '09:00',
        type: 'cafe',
        name: 'Working Holiday 早餐',
        nameKr: '워킹홀리데이',
        desc: '廣安里人氣咖啡廳，09:00 開門，提供精緻早餐套餐及特調咖啡，悠閒開展新的一天',
        lat: 35.1535, lng: 129.1175,
        budget: { transport: 0, food: 8000, ticket: 0, shopping: 0 }
      },
      {
        time: '09:45',
        type: 'beach',
        name: '廣安里海水浴場 晨間散步',
        nameKr: '광안리해수욕장 아침 산책',
        desc: '早晨的廣安里沙灘人少清靜，廣안大橋倒映於平靜海面，是一天最美的時刻',
        lat: 35.1531, lng: 129.1186,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      },
      {
        time: '12:00',
        type: 'food',
        name: '機張市場 醬蟹 午餐',
        nameKr: '기장시장 간장게장',
        desc: '釜山必食「醬油醃蟹（간장게장）」，有「白飯小偷」之稱，鮮甜蟹肉配熱飯絕配，機張市場一帶多家名店',
        lat: 35.2448, lng: 129.2124,
        budget: { transport: 0, food: 40000, ticket: 0, shopping: 0 }
      },
      {
        time: '14:00',
        type: 'attraction',
        name: 'Skyline Luge 斜坡滑車',
        nameKr: '스카이라인 루지',
        desc: '刺激好玩的滑道滑車，沿山坡俯衝而下，全程海景相伴，機張海岸人氣體驗項目，約 ₩16,000',
        lat: 35.2219, lng: 129.2278,
        budget: { transport: 0, food: 0, ticket: 16000, shopping: 0 }
      },
      {
        time: '16:30',
        type: 'cafe',
        name: '田浦咖啡街 下午茶',
        nameKr: '전포카페거리',
        desc: '充滿個性咖啡廳的特色街道，各式網紅打卡咖啡廳林立，下午茶必到',
        lat: 35.1547, lng: 129.0597,
        budget: { transport: 0, food: 8000, ticket: 0, shopping: 0 }
      },
      {
        time: '18:30',
        type: 'area',
        name: '西面商圈',
        nameKr: '서면',
        desc: '釜山最繁華地下商圈，韓系服飾、美妝、小食一次滿足，西面地下街延伸數百公尺',
        lat: 35.1579, lng: 129.0596,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 20000 }
      },
      {
        time: '20:00',
        type: 'food',
        name: '山莊1988 晚餐',
        nameKr: '산장1988 서면본점',
        desc: '西面人氣韓式烤肉店，以特製秘製豬頸肉及各式燒烤聞名，西面站 6 號出口步行 3 分，17:00 開門',
        lat: 35.1555, lng: 129.0582,
        budget: { transport: 0, food: 35000, ticket: 0, shopping: 0 }
      },
      {
        time: '22:00',
        type: 'hotel',
        name: 'Elmomento Songdo 返回酒店',
        nameKr: '엘모멘토 송도 귀환',
        desc: '搭乘 Uber 由西面返回松島酒店，最後一晚好好休息',
        lat: HOTEL.lat, lng: HOTEL.lng,
        budget: { transport: 0, food: 0, ticket: 0, shopping: 0 }
      }
    ],
    hotel: HOTEL,
    summary: { transport: 0, food: 91000, ticket: 16000, shopping: 20000, hotel: 234863 }
  },
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
