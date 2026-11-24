/*
  작업 목록
  - 여기 적은 순서대로 갤러리에 나옵니다.
  - 작업 하나 = 중괄호 { } 한 덩어리. 덩어리와 덩어리 사이에는 쉼표(,)를 넣습니다.

  항목 설명
  brand      브랜드 이름 (필수)
  title      작업 이름 (선택) 같은 브랜드 작업이 여러 개일 때 구분용. 예: "봄 프로모션"
  category   카테고리 (필수) 영문으로 적습니다. 예: "Display Ads", "Social Media", "Landing Page". 새 이름을 쓰면 필터 버튼이 자동으로 생깁니다.
             ("Landing Page"는 긴 이미지를 세로로 보여주는 방식으로 열립니다.)
  year       연도 (선택) 숫자로 적습니다. 예: 2025
  type       "집행" 또는 "제안" (필수) "제안"이면 'PT 시안' 표시가 붙습니다.
  objective  목표 (선택) 이 작업이 해야 했던 일. 예: "올리브영 기획세트 판매 유도"
  hook       소구 (선택) 무엇으로 누르게 했는지. 예: "50% 할인, 1등 유산균 신뢰"
  design     디자인 (선택) 그걸 화면에서 어떻게 풀었는지. 한두 문장.
             (작업 창에 Objective / Hook / Design으로 나옵니다. 비워둔 항목은 나오지 않습니다.)
  thumbnail  썸네일 이미지 경로 (선택) 800×800px 권장. 비워두면 images 첫 장을 정사각형으로 잘라 씁니다.
             (원본은 크고 무거워서, 썸네일은 800×800px로 줄인 사본 thumb.webp를 따로 두는 걸 기본으로 합니다.)
  crop       썸네일을 자르는 기준 (선택) "top", "center", "bottom" 중 하나.
             비워두면 랜딩페이지는 위쪽, 나머지는 가운데를 기준으로 자릅니다. (4:5 피드 이미지는 위아래 10%씩 잘림)
  images     이미지 경로 목록 (필수) 광고·소셜 미디어는 여러 장, 랜딩은 보통 1장.
  layout     보여주는 방식 (선택) "panorama"로 적으면 이미지를 틈 없이 가로로 이어 붙여 옆으로 넘겨 봅니다.
             슬라이드끼리 그림이 이어지는 캐러셀 콘텐츠에 씁니다.

  이미지 파일이 없거나 경로가 틀리면 그 자리는 회색 상자로 보입니다.
*/

// 경력 시작 연월. 상단 숫자 줄의 경력 연수를 이 날짜부터 자동으로 계산합니다.
const CAREER_START = "2020-01";

// 필터 버튼 순서. 여기 없는 카테고리는 맨 뒤에 붙습니다.
const CATEGORY_ORDER = ["Display Ads", "Social Media", "Landing Page"];

const WORKS = [
  {
    brand: "반얀트리",
    category: "Social Media",
    type: "집행",
    objective: "반얀트리 해운대 부산의 디자인 철학을 소개하는 인스타그램 캐러셀",
    hook: "부산의 자연과 한국 전통에서 출발한 공간 이야기로 끝까지 넘겨보게 만드는 브랜드 스토리",
    design: "8장을 한 장면처럼 이어지게 설계해 장을 넘길 때마다 사진과 선이 다음 장으로 연결되도록 구성. 회녹색 톤과 세리프 타이포로 럭셔리 톤 유지",
    layout: "panorama",
    thumbnail: "images/works/banyan-tree/thumb.webp",
    images: [
      "images/works/banyan-tree/social-01.webp",
      "images/works/banyan-tree/social-02.webp",
      "images/works/banyan-tree/social-03.webp",
      "images/works/banyan-tree/social-04.webp",
      "images/works/banyan-tree/social-05.webp",
      "images/works/banyan-tree/social-06.webp",
      "images/works/banyan-tree/social-07.webp",
      "images/works/banyan-tree/social-08.webp",
    ],
  },
  {
    brand: "월드비전",
    category: "Social Media",
    type: "집행",
    objective: "글로벌 6K 캠페인 참가 신청 유도",
    hook: "'나 혼자만 레벨업' 협업. 캠페인을 작품 속 '퀘스트'로 제시해 참여를 게임처럼 느끼게 함",
    design: "작품 속 시스템 창 UI를 차용해 6장을 하나의 게이트 공간으로 연결. 마지막 장의 참여 버튼까지 이야기가 이어지도록 구성",
    layout: "panorama",
    thumbnail: "images/works/world-vision/thumb.webp",
    images: [
      "images/works/world-vision/social-01.jpg",
      "images/works/world-vision/social-02.jpg",
      "images/works/world-vision/social-03.jpg",
      "images/works/world-vision/social-04.jpg",
      "images/works/world-vision/social-05.jpg",
      "images/works/world-vision/social-06.jpg",
    ],
  },
  {
    brand: "시코르",
    category: "Display Ads",
    type: "집행",
    objective: "시코르 × 블룸 협업 메이크업 컬렉션 판매 유도",
    hook: "아이돌 멤버가 직접 만든 'MADE' 컬렉션(아일릿 윤아, 써니, 노지선)과 시코르 단독 협업",
    design: "모델 화보를 크게 쓰고 브라우저 창 모양 프레임에 제품·발색 컷을 띄워 디지털 무드 연출. 세 장을 같은 레이아웃과 민트 프레임으로 통일하고 모델과 제품만 바꿔 시리즈로 구성",
    thumbnail: "images/works/chicor/thumb.webp",
    images: [
      "images/works/chicor/display-01.webp",
      "images/works/chicor/display-02.webp",
      "images/works/chicor/display-03.webp",
    ],
  },
  {
    brand: "쿠디",
    category: "Display Ads",
    type: "집행",
    objective: "캠핑용 캔들라이트·스피커 제품 판매 유도",
    hook: "감성 캠핑 무드와 핵심 스펙(360° 서라운드, IP67 방수, 31시간 재생, 8단 밝기), 기간한정 34% 할인",
    design: "어두운 배경에 조명 불빛을 주인공으로 두고 세리프 영문 타이포로 프리미엄 캠핑 무드 연출. 스펙은 얇은 선과 원형 라벨로 절제해 배치",
    thumbnail: "images/works/coody/thumb.webp",
    images: [
      "images/works/coody/display-01.jpg",
      "images/works/coody/display-02.jpg",
      "images/works/coody/display-03.jpg",
    ],
  },
  {
    brand: "오레브 제주",
    category: "Display Ads",
    type: "집행",
    objective: "JW 메리어트 제주 프라이빗 회원권 안내자료 신청 유도",
    hook: "연간 10박, 골프 50%, 선착순 한정 혜택과 최상위 휴양 이미지",
    design: "현무암·바다·노을 등 제주 실사를 크게 쓰고 세리프 로고타입으로 하이엔드 톤 유지. 혜택은 작은 태그로 절제해 배치",
    thumbnail: "images/works/oreve-jeju/thumb.webp",
    images: [
      "images/works/oreve-jeju/display-01.jpg",
      "images/works/oreve-jeju/display-02.webp",
      "images/works/oreve-jeju/display-03.webp",
    ],
  },
  {
    brand: "페어라이어",
    category: "Social Media",
    type: "집행",
    crop: "top",
    objective: "일본 알펜 그룹 팝업스토어 기간 중 26 SPRING 골프웨어 컬렉션 홍보",
    hook: "발렌타인 시즌 '나에게 주는 선물' 무드와 핑크 블러썸 스타일링, 팝업 기간 한정",
    design: "패션 매거진 표지 구성으로 시작해 아이템 소개, 필드 화보로 이어지는 3장 흐름. 일본어 카피와 핑크 포인트 컬러로 현지 시즌 무드를 맞추고 브랜드 로고타입을 주인공으로 배치",
    thumbnail: "images/works/fairliar/thumb.webp",
    images: [
      "images/works/fairliar/social-01.webp",
      "images/works/fairliar/social-02.jpg",
      "images/works/fairliar/social-03.webp",
    ],
  },
  {
    brand: "멀티캠퍼스",
    category: "Display Ads",
    type: "집행",
    objective: "멀티잇 부트캠프(프론트엔드·데이터) 수강 신청 유도",
    hook: "웹소설·밈 패러디('초특급 개발 능력자', '이.왜.진?', '취업이되')로 비전공자의 공감과 호기심 자극",
    design: "웹소설 표지풍 타이포와 3D 캐릭터를 결합해 교육 광고의 딱딱함을 덜고, 하단 CTA 바는 세 장 모두 통일",
    thumbnail: "images/works/multicampus/thumb.webp",
    images: [
      "images/works/multicampus/display-01.jpg",
      "images/works/multicampus/display-02.jpg",
      "images/works/multicampus/display-03.jpg",
    ],
  },
  {
    brand: "한화호텔앤드리조트",
    category: "Landing Page",
    type: "집행",
    objective: "하이엔드 프라이빗 리조트 ANTO 멤버십 소개와 가입 유도",
    hook: "서울에서 40분, 북한산 자연 속 프라이빗 공간과 멤버십 혜택",
    design: "수묵화 같은 안개·산 이미지와 아치형 프레임으로 고요한 톤 연출. 멤버십 혜택은 아이콘 그리드로 정리",
    thumbnail: "images/works/hanwha-resort/thumb.jpg",
    images: ["images/works/hanwha-resort/landing-01.jpg"],
  },
  {
    brand: "락토핏",
    category: "Display Ads",
    type: "집행",
    objective: "올리브영 락토핏 골드 더블기획 세트 판매 유도",
    hook: "50% 할인, '대한민국 1등 유산균' 신뢰, 올영 PICK",
    design: "50을 거대한 입체 숫자로 세워 할인율이 먼저 읽히게 구성. 세 장을 할인율·올리브영 입점·선물 구성으로 나눠 각기 다른 소구로 제작",
    thumbnail: "images/works/lactofit/thumb.webp",
    images: [
      "images/works/lactofit/display-01.jpg",
      "images/works/lactofit/display-02.jpg",
      "images/works/lactofit/display-03.jpg",
    ],
  },
  {
    brand: "우리금융그룹",
    category: "Social Media",
    type: "집행",
    objective: "그룹 공식 인스타그램 채널 콘텐츠",
    hook: "댄스 챌린지, 모델 생일 축하, 뉴스 형식 등 캐릭터를 앞세운 친근한 소재로 관심과 참여 유도",
    design: "콘텐츠마다 포맷(챌린지, 픽셀 아트, 뉴스 화면)을 달리해 금융 브랜드의 딱딱함을 덜고 캐릭터 세계관 유지",
    thumbnail: "images/works/woori-financial/thumb.webp",
    images: [
      "images/works/woori-financial/social-01.jpg",
      "images/works/woori-financial/social-02.webp",
      "images/works/woori-financial/social-03.jpg",
    ],
  },
  {
    brand: "스키니랩",
    category: "Display Ads",
    type: "집행",
    objective: "모로실 다이어트 올리브영 할인 행사 판매 유도",
    hook: "78%, 최대 30% 할인율과 '단 오늘 하루만' 기간 한정",
    design: "할인 숫자를 입체 젤리 질감으로 크게 세워 제품보다 먼저 읽히게 구성. 블러드오렌지 원료 이미지로 제품 특징 연결",
    thumbnail: "images/works/skinnylab/thumb.webp",
    images: [
      "images/works/skinnylab/display-01.webp",
      "images/works/skinnylab/display-02.webp",
    ],
  },
  {
    brand: "락앤락",
    category: "Display Ads",
    type: "집행",
    objective: "추석 시즌 프로모션과 신제품 판매 유도",
    hook: "35% 할인, 15만원 초특가 가격 혜택",
    design: "한가위는 전통 문양과 꽃 오브젝트로 시즌감을, 스팀프라이어는 실사 주방 연출로 라이프스타일 감성을 강조해 제품별로 톤을 다르게 설계",
    thumbnail: "images/works/locknlock/thumb.webp",
    images: [
      "images/works/locknlock/display-01.webp",
      "images/works/locknlock/display-02.webp",
    ],
  },
  {
    brand: "제이멜라",
    category: "Landing Page",
    type: "집행",
    objective: "발렌타인 기프트 위크 기간 판매 유도",
    hook: "20% 추가 쿠폰, 로맨틱 세트 사은품, 구매 금액별 누적 사은품",
    design: "핑크 하트와 선물상자 3D 연출로 시즌 무드를 만들고, 이벤트 4개를 번호 섹션으로 나눠 혜택이 순서대로 읽히게 구성",
    thumbnail: "images/works/jmella/thumb.jpg",
    images: ["images/works/jmella/landing-01.jpg"],
  },
  {
    brand: "웅진씽크빅",
    category: "Display Ads",
    type: "집행",
    objective: "스마트올 올백 7일 무료체험 신청 유도",
    hook: "'0원' 체험, 초등 입학 준비 고민, 방문선생님 밀착관리",
    design: "학부모의 고민을 헤드라인으로 세우고, 0·돋보기·캡슐 같은 오브젝트 하나에 메시지를 압축",
    thumbnail: "images/works/woongjin-thinkbig/thumb.webp",
    images: [
      "images/works/woongjin-thinkbig/display-01.jpg",
      "images/works/woongjin-thinkbig/display-02.jpg",
      "images/works/woongjin-thinkbig/display-03.jpg",
    ],
  },
  {
    brand: "아이키쑤욱",
    category: "Landing Page",
    type: "집행",
    objective: "새학기 키성장 건강기능식품 무료체험 신청 유도",
    hook: "새학기 키성장 고민, 기능성 원료와 6년근 홍삼, 학부모 후기",
    design: "3D 캐릭터와 제품 연출로 친근함을 주고, 학부모의 고민에서 해결까지 체크포인트 흐름으로 구성",
    thumbnail: "images/works/ikisuuk/thumb.webp",
    images: ["images/works/ikisuuk/landing-01.webp"],
  },
  {
    brand: "고혼진",
    category: "Landing Page",
    type: "집행",
    objective: "중년 여성 대상 안티에이징 크림 구매 유도",
    hook: "'중년 여성 1등 화장품', 주름·기미 개선 효과, 특허 성분의 타사 대비 3배 흡수, 61세 고객 후기",
    design: "붉은 꽃과 크림 용기를 합성한 키 비주얼로 고급감을 주고, 고민 → 성분 → 후기 순으로 신뢰를 쌓는 구조로 구성. 수치와 핵심 문구는 빨간 강조로 빠르게 읽히게",
    thumbnail: "images/works/kohonjin/thumb.jpg",
    images: ["images/works/kohonjin/landing-01.jpg"],
  },
  {
    brand: "아이클타임",
    category: "Landing Page",
    type: "집행",
    objective: "키성장 건강기능식품 구매 유도",
    hook: "'2개월 공짜' 혜택, 키성장 1등·누적 고객 79만명·재구매율 95% 신뢰 지표, 학부모 후기",
    design: "보라·노랑 대비와 시계 오브젝트로 '지금이 타이밍'이라는 긴급성을 만들고, 모델과 수치로 신뢰 구간 구성",
    thumbnail: "images/works/iclltime/thumb.jpg",
    images: ["images/works/iclltime/landing-01.jpg"],
  },
  {
    brand: "트와터치",
    category: "Landing Page",
    type: "집행",
    objective: "자사몰 신년 단독 HAPPY SET 판매 유도",
    hook: "최대 30% 할인, 사은품 0원, 자사몰 한정 무료배송",
    design: "스노우볼과 하트 오브젝트, 그리드 배경으로 Y2K 무드 연출. 세트별 가격 카드로 비교가 쉽게 구성",
    thumbnail: "images/works/twatouch/thumb.jpg",
    images: ["images/works/twatouch/landing-01.jpg"],
  },
  {
    brand: "락토핏",
    category: "Landing Page",
    type: "집행",
    objective: "가정의 달 선물세트 판매 유도",
    hook: "기간 특가 할인, 선물세트 구매 시 용돈봉투 증정, 호텔 숙박권 추첨",
    design: "카네이션과 선물상자로 시즌감을 만들고, 혜택 3가지를 편지봉투 아이콘으로 한눈에 정리",
    thumbnail: "images/works/lactofit/landing-thumb.jpg",
    images: ["images/works/lactofit/landing-01.jpg"],
  },
];
