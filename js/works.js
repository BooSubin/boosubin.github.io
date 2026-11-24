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
  role       맡은 역할 (선택)
  summary    한 줄 설명 (선택)
  thumbnail  썸네일 이미지 경로 (선택) 800×800px 권장. 비워두면 images 첫 장을 정사각형으로 잘라 씁니다.
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
    layout: "panorama",
    images: [
      "images/works/banyan-tree/social-01.jpg",
      "images/works/banyan-tree/social-02.jpg",
      "images/works/banyan-tree/social-03.jpg",
      "images/works/banyan-tree/social-04.jpg",
      "images/works/banyan-tree/social-05.jpg",
      "images/works/banyan-tree/social-06.jpg",
      "images/works/banyan-tree/social-07.jpg",
      "images/works/banyan-tree/social-08.jpg",
    ],
  },
  {
    brand: "월드비전",
    category: "Social Media",
    type: "집행",
    layout: "panorama",
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
    brand: "우리금융그룹",
    category: "Social Media",
    type: "집행",
    images: [
      "images/works/woori-financial/social-01.jpg",
      "images/works/woori-financial/social-02.jpg",
      "images/works/woori-financial/social-03.jpg",
    ],
  },
  {
    brand: "스키니랩",
    category: "Display Ads",
    type: "집행",
    images: [
      "images/works/skinnylab/display-01.webp",
      "images/works/skinnylab/display-02.webp",
    ],
  },
  {
    brand: "락토핏",
    category: "Display Ads",
    type: "집행",
    images: [
      "images/works/lactofit/display-01.jpg",
      "images/works/lactofit/display-02.jpg",
      "images/works/lactofit/display-03.jpg",
    ],
  },
];
