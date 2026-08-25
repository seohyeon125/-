// OpenWeatherMap API 키 (본인의 API Key로 변경해주세요)
const API_KEY = '5b979dab35aa6c1f4b76118a4878b66e';

// 픽셀 스타일 아이콘을 제공하는 무료 SVG API URL 기반 다양해진 메뉴 목록
const menuList = [
  // ==================== [한식] ====================
  { name: '김치찌개', weather: ['Clouds', 'Cold', 'General'], reason: '칼칼한 국물이 당길 때는 역시 김치찌개!', icon: 'https://api.iconify.design/pixelarticons:home.svg?color=%23d97706' },
  { name: '된장찌개', weather: ['Clouds', 'General'], reason: '구수하고 속이 편안해지는 한식의 정석!', icon: 'https://api.iconify.design/pixelarticons:home.svg?color=%23d97706' },
  { name: '삼겹살 & 파채', weather: ['Clouds', 'Rain', 'General'], reason: '지글지글 고기 구워 먹기 딱 좋은 날!', icon: 'https://api.iconify.design/pixelarticons:fire.svg?color=%23d97706' },
  { name: '제육볶음', weather: ['Clear', 'Clouds', 'General'], reason: '매콤달콤 밥도둑 제육 덮밥 한 그릇!', icon: 'https://api.iconify.design/pixelarticons:fire.svg?color=%23d97706' },
  { name: '비빔밥', weather: ['Clear', 'General'], reason: '신선한 나물과 고추장의 상큼한 조합!', icon: 'https://api.iconify.design/pixelarticons:heart.svg?color=%23d97706' },
  { name: '부침개 & 막걸리', weather: ['Rain', 'Drizzle'], reason: '빗소리와 부침개 익는 소리는 운명의 짝꿍!', icon: 'https://api.iconify.design/pixelarticons:cloud-rain.svg?color=%23d97706' },
  { name: '순대국밥', weather: ['Cold', 'Rain', 'Snow'], reason: '뜨끈한 국물에 다대기 풀어서 한 뚝배기!', icon: 'https://api.iconify.design/pixelarticons:coffee.svg?color=%23d97706' },
  { name: '냉면', weather: ['Hot', 'Clear'], reason: '가슴속까지 시원해지는 살얼음 육수!', icon: 'https://api.iconify.design/pixelarticons:zap.svg?color=%23d97706' },
  { name: '삼계탕', weather: ['Hot', 'Cold'], reason: '이열치열! 기운이 솟아나는 보양식!', icon: 'https://api.iconify.design/pixelarticons:trophy.svg?color=%23d97706' },
  { name: '갈비탕', weather: ['Cold', 'Snow'], reason: '진하게 우려낸 맑은 고기 국물!', icon: 'https://api.iconify.design/pixelarticons:coffee.svg?color=%23d97706' },

  // ==================== [중식] ====================
  { name: '짜장면', weather: ['Clear', 'Clouds', 'General'], reason: '언제 먹어도 실패 없는 단짠의 정석!', icon: 'https://api.iconify.design/pixelarticons:device-tablet.svg?color=%23d97706' },
  { name: '해물짬뽕', weather: ['Rain', 'Cold', 'Clouds'], reason: '얼큰하고 칼칼한 해물 국물로 스트레스 해소!', icon: 'https://api.iconify.design/pixelarticons:fire.svg?color=%23d97706' },
  { name: '찹쌀탕수육', weather: ['Clear', 'General'], reason: '겉은 바삭 속은 쫀득한 찍먹/부먹 요리!', icon: 'https://api.iconify.design/pixelarticons:star.svg?color=%23d97706' },
  { name: '마라탕', weather: ['Cold', 'Rain', 'General'], reason: '알싸하고 매콤한 얼얼함이 당기는 날!', icon: 'https://api.iconify.design/pixelarticons:fire.svg?color=%23d97706' },
  { name: '마라샹궈', weather: ['Clouds', 'General'], reason: '밥반찬으로도 안주로도 완벽한 매콤 볶음!', icon: 'https://api.iconify.design/pixelarticons:fire.svg?color=%23d97706' },
  { name: '볶음밥 & 짬뽕국물', weather: ['Clear', 'General'], reason: '고소한 밥알과 매콤한 국물의 환상 조합!', icon: 'https://api.iconify.design/pixelarticons:heart.svg?color=%23d97706' },
  { name: '꿔바로우', weather: ['Rain', 'Clouds'], reason: '새콤달콤한 소스가 어우러진 튀김 요리!', icon: 'https://api.iconify.design/pixelarticons:star.svg?color=%23d97706' },

  // ==================== [일식] ====================
  { name: '모듬 초밥', weather: ['Clear', 'General'], reason: '신선하고 깔끔하게 즐기는 신선한 일식!', icon: 'https://api.iconify.design/pixelarticons:heart.svg?color=%23d97706' },
  { name: '경양식/일식 돈카츠', weather: ['Clear', 'Clouds', 'General'], reason: '바삭바삭 소리까지 맛있는 겉바속촉 카츠!', icon: 'https://api.iconify.design/pixelarticons:trophy.svg?color=%23d97706' },
  { name: '돈코츠 라멘', weather: ['Rain', 'Cold', 'Snow'], reason: '진한 뽀얀 사골 육수에 차슈 한 점!', icon: 'https://api.iconify.design/pixelarticons:coffee.svg?color=%23d97706' },
  { name: '따뜻한 우동', weather: ['Rain', 'Snow', 'Cold'], reason: '오동통한 면발과 따뜻한 가쓰오부시 육수!', icon: 'https://api.iconify.design/pixelarticons:coffee.svg?color=%23d97706' },
  { name: '가츠동 (돈까스덮밥)', weather: ['Clouds', 'General'], reason: '달콤짭조름한 간장 소스와 부드러운 계란!', icon: 'https://api.iconify.design/pixelarticons:home.svg?color=%23d97706' },
  { name: '사케동 (연어덮밥)', weather: ['Clear', 'General'], reason: '입에서 부드럽게 녹아내리는 신선한 연어!', icon: 'https://api.iconify.design/pixelarticons:heart.svg?color=%23d97706' },
  { name: '냉모밀', weather: ['Hot', 'Clear'], reason: '시원한 쯔유에 찌릿하게 담가 먹는 메밀면!', icon: 'https://api.iconify.design/pixelarticons:zap.svg?color=%23d97706' },

  // ==================== [양식] ====================
  { name: '토마토/크림 파스타', weather: ['Clear', 'Clouds', 'General'], reason: '돌돌 말아 먹는 풍미 가득한 파스타!', icon: 'https://api.iconify.design/pixelarticons:heart.svg?color=%23d97706' },
  { name: '화덕 피자', weather: ['Clear', 'Clouds', 'General'], reason: '쭉쭉 늘어나는 치즈와 갓 구운 도우!', icon: 'https://api.iconify.design/pixelarticons:star.svg?color=%23d97706' },
  { name: '수제 육즙 버거', weather: ['Clear', 'General'], reason: '두꺼운 패티와 프렌치프라이의 완벽 조합!', icon: 'https://api.iconify.design/pixelarticons:device-tablet.svg?color=%23d97706' },
  { name: '소고기 스테이크', weather: ['Clear', 'General'], reason: '특별한 기분을 내고 싶은 날엔 스테이크!', icon: 'https://api.iconify.design/pixelarticons:trophy.svg?color=%23d97706' },
  { name: '리스토랑 샐러드', weather: ['Clear', 'Hot'], reason: '가볍고 건강하게 즐기는 상큼한 한 끼!', icon: 'https://api.iconify.design/pixelarticons:heart.svg?color=%23d97706' },

  // ==================== [분식 & 야식 & 디저트] ====================
  { name: '떡볶이 & 튀김', weather: ['Clouds', 'Rain', 'General'], reason: '매콤달콤한 양념에 튀김 찍어 먹는 재미!', icon: 'https://api.iconify.design/pixelarticons:star.svg?color=%23d97706' },
  { name: '크리스피 치킨', weather: ['Clouds', 'Clear', 'General'], reason: '오늘 밤은 치맥/치콜로 행복하게 마무리!', icon: 'https://api.iconify.design/pixelarticons:trophy.svg?color=%23d97706' },
  { name: '족발 & 보쌈', weather: ['Rain', 'Clouds', 'General'], reason: '쟁반막국수와 함께 싸먹는 야식의 왕!', icon: 'https://api.iconify.design/pixelarticons:fire.svg?color=%23d97706' },
  { name: '빙수', weather: ['Hot', 'Clear'], reason: '머리가 띵해질 정도로 달콤하고 시원함!', icon: 'https://api.iconify.design/pixelarticons:zap.svg?color=%23d97706' }
];

let currentWeatherCategory = 'General';

// DOM 요소
const weatherIcon = document.getElementById('weather-icon');
const weatherDesc = document.getElementById('weather-desc');
const tempDesc = document.getElementById('temp-desc');
const menuImg = document.getElementById('menu-img');
const menuName = document.getElementById('menu-name');
const recommendReason = document.getElementById('recommend-reason');
const recommendBtn = document.getElementById('recommend-btn');

// 1. 위치 기반 날씨 정보 불러오기
function fetchWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherData(latitude, longitude);
      },
      () => {
        weatherDesc.textContent = '위치 권한 없음 (기본: 서울)';
        getWeatherDataByCity('Seoul');
      }
    );
  } else {
    getWeatherDataByCity('Seoul');
  }
}

// 위도/경도로 날씨 API 호출
async function getWeatherData(lat, lon) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`);
    const data = await res.json();
    updateWeatherUI(data);
  } catch (err) {
    weatherDesc.textContent = '날씨 정보를 가져오지 못했어요';
  }
}

// 도시 이름으로 날씨 API 호출
async function getWeatherDataByCity(city) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`);
    const data = await res.json();
    updateWeatherUI(data);
  } catch (err) {
    weatherDesc.textContent = '날씨 불러오기 실패';
  }
}

// 날씨 UI 업데이트 및 카테고리 설정
function updateWeatherUI(data) {
  const mainWeather = data.weather[0].main;
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;

  tempDesc.textContent = `${temp}°C / ${data.name}`;
  weatherDesc.textContent = description;

  if (mainWeather === 'Rain' || mainWeather === 'Drizzle') {
    weatherIcon.textContent = '🌧️';
    currentWeatherCategory = 'Rain';
  } else if (mainWeather === 'Snow') {
    weatherIcon.textContent = '❄️';
    currentWeatherCategory = 'Snow';
  } else if (mainWeather === 'Clear') {
    weatherIcon.textContent = '☀️';
    currentWeatherCategory = temp > 26 ? 'Hot' : 'Clear';
  } else {
    weatherIcon.textContent = '☁️';
    currentWeatherCategory = temp < 8 ? 'Cold' : 'Clouds';
  }
}

// 2. 날씨 맞춤 메뉴 추천 함수
function recommendMenu() {
  const filteredMenu = menuList.filter(item => 
    item.weather.includes(currentWeatherCategory) || item.weather.includes('General')
  );

  const randomIndex = Math.floor(Math.random() * filteredMenu.length);
  const selected = filteredMenu[randomIndex];

  menuName.textContent = '주문 받는 중...';
  menuImg.style.transform = 'scale(0.8)';
  
  setTimeout(() => {
    menuImg.src = selected.icon;
    menuImg.style.transform = 'scale(1)';
    menuName.textContent = selected.name;
    recommendReason.textContent = selected.reason;
  }, 250);
}

// 이벤트 리스너 설정
recommendBtn.addEventListener('click', recommendMenu);

// 페이지 로드 시 날씨 정보 실행
fetchWeather();

// 3. 사용자 메뉴 추가 로직
toggleAddBtn.addEventListener('click', () => {
  addMenuForm.classList.toggle('hidden');
});

saveMenuBtn.addEventListener('click', () => {
  const nameVal = newMenuName.value.trim();
  const reasonVal = newMenuReason.value.trim();
  const weatherVal = newMenuWeather.value;

  if (!nameVal) {
    alert('메뉴 이름을 입력해주세요!');
    return;
  }

  const newMenuItem = {
    name: nameVal,
    reason: reasonVal || '사용자가 직접 추가한 맛있는 메뉴!',
    weather: [weatherVal],
    icon: 'https://api.iconify.design/pixelarticons:gift.svg?color=%23d97706' // 기본 픽셀 선물 상자 아이콘
  };

  // 기존 사용자 리스트에 저장 및 로컬스토리지 동기화
  customMenuList.push(newMenuItem);
  localStorage.setItem('myCustomMenus', JSON.stringify(customMenuList));
  
  // 전체 메뉴 리스트에 추가
  menuList.push(newMenuItem);

  alert(`'${nameVal}' 메뉴가 정상적으로 등록되었습니다!`);

  // 입력 필드 초기화 및 폼 닫기
  newMenuName.value = '';
  newMenuReason.value = '';
  addMenuForm.classList.add('hidden');
});

// 4. 모바일 및 브라우저 공유하기 기능
const shareBtn = document.getElementById('share-btn');
shareBtn.addEventListener('click', async () => {
  const shareData = {
    title: '오늘 뭐 먹지?',
    text: '오늘 날씨에 딱 맞는 메뉴를 추천해드릴게요!',
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {}
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('사이트 주소가 복사되었습니다!');
    } catch (err) {
      alert('주소 복사에 실패했습니다.');
    }
  }
});

// 이벤트 및 초기 실행
recommendBtn.addEventListener('click', recommendMenu);
fetchWeather();