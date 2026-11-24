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
    objective: "디자인 스토리로 호텔의 브랜드 가치 전달",
    hook: "부산의 자연·한국 전통에서 출발한 공간 스토리",
    design: "장 경계를 넘나드는 사진 콜라주와 가는 선으로 8장을 한 화면처럼 잇고, 회녹색 톤으로 해운대 바다와 한국 전통 소재를 하나의 무드로 묶음",
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
    objective: "글로벌 6K 캠페인 기부 참여 유도",
    hook: "'나 혼자만 레벨업' IP 협업, 캠페인을 '퀘스트'로 제시",
    design: "'나 혼자만 레벨업'의 게이트·시스템 창 비주얼을 재현해, 기부 캠페인을 작품 세계관 속 한 장면처럼 연출",
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
    objective: "시코르 단독 블룸 협업 컬렉션 판매",
    hook: "아이돌 멤버가 직접 만든 'MADE' 컬렉션",
    design: "화보 위에 브라우저 창 모양 프레임을 띄워 제품·발색 컷을 얹는 디지털 콜라주. 민트 프레임을 시리즈 공통 장치로 사용",
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
    objective: "캠핑 조명·스피커 판매",
    hook: "감성 캠핑 무드, 기간 한정 34% 할인",
    design: "어둠 속 불빛 하나를 주인공으로 세운 야간 연출과 세리프 영문 타이포로, 캠핑 용품을 프리미엄 라이프스타일로 표현",
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
    objective: "프라이빗 회원권 안내자료 신청",
    hook: "연간 10박 등 회원 혜택, 선착순 한정",
    design: "현무암 질감과 제주 바다·노을 실사를 프레임처럼 써서 하이엔드 휴양지 톤을 만들고, 혜택 정보는 작은 태그로 절제",
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
    objective: "일본 팝업스토어 방문 유도",
    hook: "발렌타인 '나에게 주는 선물' 무드, 팝업 기간 한정",
    design: "패션 매거진 표지 문법(대형 로고타입, 이슈 넘버)을 빌린 레이아웃과 구겨진 종이 질감 콜라주로 일본 현지 감성의 핑크 무드 연출",
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
    objective: "비전공자 대상 부트캠프 수강 신청",
    hook: "웹소설·밈 패러디로 비전공자의 공감 자극",
    design: "웹소설 표지풍 장식 타이포와 3D 캐릭터를 결합해, 밈 카피가 실제 웹소설 표지와 짤처럼 보이게 시각화",
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
    objective: "하이엔드 리조트 멤버십 가입 유도",
    hook: "서울 40분 거리의 북한산 프라이빗 공간",
    design: "북한산의 안개와 산세를 수묵화로 풀어 '고요한 휴식'을 시각화. 아치형 프레임으로 공간 사진을 창 너머 풍경처럼 연출",
    thumbnail: "images/works/hanwha-resort/thumb.jpg",
    images: ["images/works/hanwha-resort/landing-01.jpg"],
  },
  {
    brand: "락토핏",
    category: "Display Ads",
    type: "집행",
    objective: "올리브영 더블기획 세트 판매",
    hook: "50% 할인, 대한민국 1등 유산균",
    design: "할인율 '50'을 종이를 오려낸 듯한 거대한 입체 숫자로 세우고, 세 장을 할인율·올리브영 입점·선물 구성 소구별로 나눠 제작",
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
    objective: "공식 인스타그램으로 그룹 브랜드 친밀도 제고",
    hook: "캐릭터 '위비프렌즈'를 앞세운 친근한 소재",
    design: "픽셀 아트, 뉴스 화면, 휴대폰 화면처럼 콘텐츠마다 시각 포맷을 바꿔, 캐릭터를 매번 다른 세계에 넣는 연출",
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
    objective: "올리브영 할인 행사 판매",
    hook: "높은 할인율, '단 오늘 하루만' 기간 한정",
    design: "할인율을 젤리 질감의 3D 숫자로 만들고, 블러드오렌지 과즙 스플래시로 원료를 시각적으로 연결",
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
    objective: "추석 시즌 프로모션·신제품 판매",
    hook: "35% 할인, 15만원 초특가",
    design: "명절 상품은 전통 문양과 3D 꽃 오브젝트로 시즌감을, 신제품 가전은 실사 주방 연출과 필기체 'Super Steam'으로 감성 무드를 만들어 제품별 톤 분리",
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
    objective: "발렌타인 기프트 위크 판매",
    hook: "추가 쿠폰과 구매 금액별 사은품",
    design: "3D 하트·선물상자 오브젝트와 핑크 체크 패턴으로 발렌타인 무드를 만들고, 이벤트마다 같은 장치를 반복해 긴 페이지의 통일감 유지",
    thumbnail: "images/works/jmella/thumb.jpg",
    images: ["images/works/jmella/landing-01.jpg"],
  },
  {
    brand: "웅진씽크빅",
    category: "Display Ads",
    type: "집행",
    objective: "7일 무료체험 신청",
    hook: "0원 체험, 초등 입학·학습 습관 고민",
    design: "3D '0', 돋보기, 캡슐처럼 메시지를 대신하는 오브젝트를 하나씩 만들어 장마다 한 장면으로 압축",
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
    objective: "새학기 무료체험 신청",
    hook: "새학기 키성장 고민, 학부모 후기",
    design: "3D 캐릭터와 학교·운동장 배경으로 아이 눈높이의 밝은 세계를 만들고, 제품을 그 안에 자연스럽게 배치",
    thumbnail: "images/works/ikisuuk/thumb.webp",
    images: ["images/works/ikisuuk/landing-01.webp"],
  },
  {
    brand: "고혼진",
    category: "Landing Page",
    type: "집행",
    objective: "중년 여성 안티에이징 크림 구매",
    hook: "중년 여성 1등, 주름·기미 개선, 실제 고객 후기",
    design: "붉은 꽃잎 속에 크림 용기를 합성한 키 비주얼과 나비 소품으로, 중년 타깃에 맞는 화사하고 고급스러운 인상 연출",
    thumbnail: "images/works/kohonjin/thumb.jpg",
    images: ["images/works/kohonjin/landing-01.jpg"],
  },
  {
    brand: "아이클타임",
    category: "Landing Page",
    type: "집행",
    objective: "키성장 건강기능식품 구매",
    hook: "'2개월 공짜', 누적 고객 79만 명·재구매율 95%",
    design: "보라·노랑 체크 패턴과 3D 시계·스마일 오브젝트로 '지금이 타이밍'을 시각화하고, 모델 컷과 수치를 카드로 정리",
    thumbnail: "images/works/iclltime/thumb.jpg",
    images: ["images/works/iclltime/landing-01.jpg"],
  },
  {
    brand: "관절보궁",
    category: "Landing Page",
    type: "집행",
    objective: "중장년 관절 건강식품 이벤트 구매",
    hook: "300명 선착순 혜택, 누적 판매 700만 개",
    design: "붉은 무대 커튼, 스포트라이트, 금색 리본으로 이벤트 무대를 연출해 제품을 고급 선물세트처럼 표현",
    thumbnail: "images/works/joint-bogung/thumb.jpg",
    images: ["images/works/joint-bogung/landing-01.jpg"],
  },
  {
    brand: "트와터치",
    category: "Landing Page",
    type: "집행",
    objective: "자사몰 신년 단독 세트 판매",
    hook: "최대 30% 할인, 자사몰 한정 사은품·무료배송",
    design: "스노우볼과 하트 풍선, 네온 그리드 배경으로 Y2K 무드를 만들어 신년 단독 세트를 '선물' 이미지로 연출",
    thumbnail: "images/works/twatouch/thumb.jpg",
    images: ["images/works/twatouch/landing-01.jpg"],
  },
  {
    brand: "포에버의원",
    category: "Landing Page",
    type: "집행",
    objective: "명동점 오픈 기념 실리프팅 상담·예약",
    hook: "첫 방문 4.5만 원, 비수술·짧은 회복",
    design: "베이지·브라운 톤과 세리프 영문 타이포로 고급 의원 무드를 만들고, 시술 전후 이미지는 AI로 생성해 실제 환자 사진 없이 효과를 시각화",
    thumbnail: "images/works/forever-clinic/thumb.jpg",
    images: ["images/works/forever-clinic/landing-01.jpg"],
  },
];
