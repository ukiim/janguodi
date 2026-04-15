export interface Program {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
  capacity: string;
  target: string;
  season: string;
  highlights: string[];
  schedule: { time: string; activity: string }[];
  reviews: { name: string; content: string; rating: number }[];
  faq: { question: string; answer: string }[];
}

export const programs: Program[] = [
  {
    slug: "mulberry-picking",
    title: "오디 수확 체험",
    subtitle: "탐스러운 오디를 직접 따고, 잼과 주스도 만들어요",
    description:
      "김해장유의 넓은 오디 농장에서 잘 익은 오디를 직접 수확하는 체험입니다. 보랏빛으로 물든 오디를 하나씩 따면서 자연의 달콤함을 느끼고, 수확한 오디로 잼과 주스를 만들어 시음합니다. 오디의 영양 성분과 뽕나무의 역사도 함께 배워보세요.",
    image: "/images/mulberry-picking.jpg",
    duration: "2시간 30분",
    capacity: "20~40명",
    target: "유아(5세) 이상",
    season: "여름 (6~7월)",
    highlights: [
      "잘 익은 오디 직접 수확 체험",
      "오디잼 & 오디주스 만들기",
      "뽕나무와 오디의 영양 이야기",
      "수확한 오디 1팩 가져가기",
    ],
    schedule: [
      { time: "09:30", activity: "집합 및 오리엔테이션" },
      { time: "10:00", activity: "오디 농장 이야기 & 뽕나무 관찰" },
      { time: "10:30", activity: "오디 수확 체험" },
      { time: "11:15", activity: "오디잼 & 주스 만들기" },
      { time: "11:50", activity: "시식 및 마무리" },
    ],
    reviews: [
      {
        name: "김○○",
        content:
          "아이들이 오디를 처음 따보는데 너무 신기해했어요. 입 주변이 보라색으로 물들었지만 행복한 표정이었습니다!",
        rating: 5,
      },
      {
        name: "이○○",
        content:
          "직접 만든 오디잼이 시중 제품보다 훨씬 맛있었어요. 집에 가져가서 빵에 발라 먹었습니다.",
        rating: 5,
      },
      {
        name: "박○○",
        content:
          "단체로 방문했는데 진행이 체계적이고, 아이들 눈높이에 맞춘 설명이 좋았습니다.",
        rating: 4,
      },
    ],
    faq: [
      {
        question: "준비물은 무엇인가요?",
        answer:
          "오디즙이 묻을 수 있으니 어두운 색 옷을 입어주세요. 모자, 선크림, 편한 신발을 준비하시면 됩니다. 수확용 바구니와 장갑은 현장에서 제공됩니다.",
      },
      {
        question: "우천 시에도 진행되나요?",
        answer:
          "가벼운 비는 우비를 입고 진행합니다. 폭우 시에는 실내에서 오디잼·오디떡 만들기 체험으로 전환됩니다.",
      },
      {
        question: "주차가 가능한가요?",
        answer:
          "네, 농장 앞에 무료 주차장이 마련되어 있습니다. 대형버스 주차도 가능합니다.",
      },
    ],
  },
  {
    slug: "citrus-picking",
    title: "감귤 수확 체험",
    subtitle: "새콤달콤한 감귤을 직접 따고 맛보는 체험",
    description:
      "하우스 감귤 농장에서 노랗게 익은 감귤을 직접 수확하는 체험입니다. 감귤나무 사이를 걸으며 가장 맛있는 감귤을 골라 따고, 신선한 감귤로 주스와 청을 만들어봅니다. 감귤의 품종과 재배 과정도 함께 배우는 유익한 시간입니다.",
    image: "/images/citrus-picking.jpg",
    duration: "2시간",
    capacity: "20~40명",
    target: "유아(4세) 이상",
    season: "겨울~봄 (11~3월)",
    highlights: [
      "하우스 감귤 직접 수확 체험",
      "감귤청 & 감귤주스 만들기",
      "감귤 품종별 비교 시식",
      "수확한 감귤 1kg 가져가기",
    ],
    schedule: [
      { time: "10:00", activity: "집합 및 안전 교육" },
      { time: "10:20", activity: "감귤 재배 이야기 & 품종 소개" },
      { time: "10:40", activity: "감귤 수확 체험" },
      { time: "11:20", activity: "감귤청 & 주스 만들기" },
      { time: "11:50", activity: "시식 및 정리" },
    ],
    reviews: [
      {
        name: "정○○",
        content:
          "겨울에 따뜻한 하우스 안에서 감귤 따기 체험을 하니 너무 좋았어요. 아이들이 감귤을 현장에서 바로 까먹으며 즐거워했습니다.",
        rating: 5,
      },
      {
        name: "최○○",
        content:
          "감귤청 만들기가 생각보다 간단한데 정말 맛있었어요. 집에서도 만들어 먹으려고요!",
        rating: 5,
      },
    ],
    faq: [
      {
        question: "하우스 안이 더운가요?",
        answer:
          "하우스 내부는 따뜻하지만 덥지 않습니다. 겨울에는 겉옷을 벗을 수 있도록 가볍게 레이어드해서 오시면 편합니다.",
      },
      {
        question: "감귤을 얼마나 가져갈 수 있나요?",
        answer:
          "체험비에 1kg(약 8~10개)이 포함되어 있으며, 추가 구매도 현장에서 가능합니다.",
      },
    ],
  },
  {
    slug: "mulberry-jam-class",
    title: "오디잼 & 오디떡 만들기",
    subtitle: "수확한 오디로 맛있는 간식을 직접 만들어요",
    description:
      "갓 수확한 신선한 오디를 활용하여 오디잼, 오디떡, 오디 쿠키 등 다양한 간식을 만들어보는 체험입니다. 천연 재료만 사용하여 건강하고 맛있는 간식을 직접 조리하며, 완성된 제품은 예쁘게 포장하여 가져갈 수 있습니다.",
    image: "/images/mulberry-jam.jpg",
    duration: "1시간 30분",
    capacity: "10~25명",
    target: "초등학생 이상",
    season: "여름 (6~8월)",
    highlights: [
      "오디잼 직접 끓이기 체험",
      "오디 송편 / 오디 쿠키 만들기",
      "예쁜 병에 담아 포장하기",
      "완성품 가져가기",
    ],
    schedule: [
      { time: "14:00", activity: "집합 및 프로그램 소개" },
      { time: "14:15", activity: "오디 손질 및 재료 준비" },
      { time: "14:30", activity: "오디잼 만들기 체험" },
      { time: "15:00", activity: "오디떡 or 쿠키 만들기" },
      { time: "15:20", activity: "포장 및 시식, 기념 촬영" },
    ],
    reviews: [
      {
        name: "한○○",
        content:
          "아이와 함께 잼을 만들었는데 생각보다 쉽고 재미있었어요. 예쁜 병에 포장해주셔서 선물로도 딱이에요!",
        rating: 5,
      },
      {
        name: "송○○",
        content:
          "오디떡이 정말 맛있었습니다. 보라색이 예쁘고, 천연 색소라 안심이 돼요.",
        rating: 4,
      },
    ],
    faq: [
      {
        question: "만든 제품은 얼마나 보관 가능한가요?",
        answer:
          "오디잼은 냉장 보관 시 약 2주, 오디떡은 당일 드시는 것을 권장합니다. 잼 보관법은 체험 중 안내드립니다.",
      },
      {
        question: "재료비가 별도인가요?",
        answer:
          "아닙니다. 모든 재료비와 포장 용기는 체험비에 포함되어 있습니다.",
      },
    ],
  },
  {
    slug: "farm-nature-tour",
    title: "농장 생태 탐방",
    subtitle: "뽕나무 숲과 감귤 하우스를 누비는 자연 탐험",
    description:
      "김해장유 농장 일대를 돌아보며 뽕나무 숲, 감귤 하우스, 텃밭 등 농장 생태를 탐방하는 프로그램입니다. 계절별로 다른 농작물과 곤충, 새들을 관찰하고, 농촌 생태계의 순환을 직접 체험합니다. 누에와 나비의 한살이도 배워볼 수 있습니다.",
    image: "/images/farm-nature.jpg",
    duration: "2시간",
    capacity: "15~30명",
    target: "유아(5세) 이상",
    season: "연중 운영",
    highlights: [
      "뽕나무 숲 산책 & 생태 관찰",
      "감귤 하우스 견학",
      "누에·나비 한살이 학습",
      "계절별 농작물 관찰 및 간식 시식",
    ],
    schedule: [
      { time: "09:30", activity: "집합 및 안전 교육" },
      { time: "10:00", activity: "뽕나무 숲 탐방 & 생태 이야기" },
      { time: "10:30", activity: "감귤 하우스 견학" },
      { time: "11:00", activity: "누에 관찰 & 텃밭 체험" },
      { time: "11:30", activity: "간식 시식 및 마무리" },
    ],
    reviews: [
      {
        name: "윤○○",
        content:
          "아들이 누에를 처음 보고 신기해했어요. 뽕잎 먹는 모습을 관찰하는데 어른인 저도 재미있었습니다.",
        rating: 5,
      },
    ],
    faq: [
      {
        question: "유모차 이용이 가능한가요?",
        answer:
          "농장 내 주요 길은 정비되어 있어 유모차 이동이 가능합니다. 다만 일부 흙길 구간은 보행을 권장드립니다.",
      },
    ],
  },
];
