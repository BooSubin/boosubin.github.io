/*
  작업 목록
  - 여기 적은 순서대로 갤러리에 나옵니다.
  - 작업 하나 = 중괄호 { } 한 덩어리. 덩어리와 덩어리 사이에는 쉼표(,)를 넣습니다.

  항목 설명
  brand      브랜드 이름 (필수)
  title      작업 이름 (선택) 같은 브랜드 작업이 여러 개일 때 구분용. 예: "봄 프로모션"
  category   카테고리 (필수) 영문으로 적습니다. 예: "Banner", "Landing Page". 새 이름을 쓰면 필터 버튼이 자동으로 생깁니다.
             ("Landing Page"는 긴 이미지를 세로로 보여주는 방식으로 열립니다.)
  year       연도 (필수) 숫자로 적습니다. 예: 2025
  type       "집행" 또는 "제안" (필수) "제안"이면 'PT 시안' 표시가 붙습니다.
  role       맡은 역할 (선택)
  summary    한 줄 설명 (선택)
  thumbnail  썸네일 이미지 경로 (선택) 800×800px 권장. 비워두면 images 첫 장의 윗부분을 씁니다.
  images     이미지 경로 목록 (필수) 배너는 여러 장, 랜딩은 보통 1장.

  지금 들어 있는 항목은 화면 확인용 가짜 데이터입니다.
  이미지 파일이 아직 없어서 회색 상자로 보입니다.
*/

// 경력 시작 연월. 상단 숫자 줄의 경력 연수를 이 날짜부터 자동으로 계산합니다.
const CAREER_START = "2020-01";

const WORKS = [
  {
    brand: "브랜드 A",
    category: "Banner",
    year: 2025,
    type: "집행",
    role: "배너 디자인 전담",
    summary: "시즌 프로모션 온라인 광고 배너",
    images: [
      "images/works/brand-a/banner-01.jpg",
      "images/works/brand-a/banner-02.jpg",
      "images/works/brand-a/banner-03.jpg",
      "images/works/brand-a/banner-04.jpg",
      "images/works/brand-a/banner-05.jpg",
      "images/works/brand-a/banner-06.jpg",
    ],
  },
  {
    brand: "브랜드 B",
    title: "신제품 출시",
    category: "Landing Page",
    year: 2025,
    type: "집행",
    role: "랜딩페이지 디자인",
    summary: "신제품 출시 이벤트 랜딩페이지",
    images: ["images/works/brand-b/landing-01.jpg"],
  },
  {
    brand: "브랜드 C",
    category: "Banner",
    year: 2024,
    type: "집행",
    role: "배너 디자인 전담",
    images: [
      "images/works/brand-c/banner-01.jpg",
      "images/works/brand-c/banner-02.jpg",
      "images/works/brand-c/banner-03.jpg",
      "images/works/brand-c/banner-04.jpg",
      "images/works/brand-c/banner-05.jpg",
      "images/works/brand-c/banner-06.jpg",
    ],
  },
  {
    brand: "브랜드 D",
    category: "Banner",
    year: 2024,
    type: "제안",
    role: "제안 시안 디자인",
    summary: "브랜드 캠페인 PT 배너 시안",
    images: [
      "images/works/brand-d/banner-01.jpg",
      "images/works/brand-d/banner-02.jpg",
      "images/works/brand-d/banner-03.jpg",
      "images/works/brand-d/banner-04.jpg",
    ],
  },
  {
    brand: "브랜드 E",
    title: "회원 가입 이벤트",
    category: "Landing Page",
    year: 2024,
    type: "제안",
    role: "랜딩페이지 디자인",
    images: ["images/works/brand-e/landing-01.jpg"],
  },
  {
    brand: "브랜드 B",
    category: "Banner",
    year: 2023,
    type: "집행",
    images: [
      "images/works/brand-b/banner-01.jpg",
      "images/works/brand-b/banner-02.jpg",
      "images/works/brand-b/banner-03.jpg",
      "images/works/brand-b/banner-04.jpg",
      "images/works/brand-b/banner-05.jpg",
      "images/works/brand-b/banner-06.jpg",
    ],
  },
];
