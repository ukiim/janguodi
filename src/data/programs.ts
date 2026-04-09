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
    slug: "rice-farming",
    title: "논농사 체험",
    subtitle: "모내기부터 수확까지, 쌀이 되는 과정을 직접 체험",
    description:
      "봄에는 모내기, 가을에는 벼 수확까지 쌀이 식탁에 오르기까지의 전 과정을 직접 경험합니다. 논에 들어가 모를 심고, 벼가 자라는 과정을 관찰하며, 수확한 쌀로 떡을 만들어 봅니다. 자연의 순환과 농부의 수고를 몸소 느낄 수 있는 프로그램입니다.",
    image: "/images/rice-farming.svg",
    duration: "3시간",
    capacity: "20~40명",
    target: "초등학생 이상",
    season: "봄 (4~6월) / 가을 (9~10월)",
    highlights: [
      "직접 논에 들어가 모내기 체험",
      "벼의 성장 과정 관찰 학습",
      "수확한 쌀로 전통 떡 만들기",
      "농촌 생태계 이해 교육",
    ],
    schedule: [
      { time: "09:30", activity: "집합 및 오리엔테이션" },
      { time: "10:00", activity: "논농사 이론 교육" },
      { time: "10:30", activity: "모내기/수확 체험" },
      { time: "11:30", activity: "떡 만들기 체험" },
      { time: "12:00", activity: "시식 및 마무리" },
    ],
    reviews: [
      {
        name: "김○○",
        content:
          "아이들이 직접 논에 들어가서 모를 심으니 정말 즐거워했어요. 밥 한 그릇의 소중함을 알게 된 것 같습니다.",
        rating: 5,
      },
      {
        name: "이○○",
        content:
          "도시에서는 할 수 없는 경험이라 정말 값진 시간이었습니다. 떡도 맛있었어요!",
        rating: 5,
      },
      {
        name: "박○○",
        content:
          "단체로 참여했는데 진행이 매끄럽고, 아이들 눈높이에 맞춰 설명해 주셔서 좋았습니다.",
        rating: 4,
      },
    ],
    faq: [
      {
        question: "준비물은 무엇인가요?",
        answer:
          "여벌 옷, 장화(또는 물에 들어갈 수 있는 신발), 수건, 모자, 선크림을 준비해 주세요. 장화는 현장에서 대여도 가능합니다.",
      },
      {
        question: "우천 시에도 진행되나요?",
        answer:
          "가벼운 비는 우비를 입고 진행합니다. 폭우 시에는 실내 대체 프로그램(쌀 요리 체험)으로 전환됩니다.",
      },
      {
        question: "주차가 가능한가요?",
        answer:
          "네, 체험장 앞에 무료 주차장이 마련되어 있습니다. 대형버스 주차도 가능합니다.",
      },
    ],
  },
  {
    slug: "vegetable-garden",
    title: "텃밭 가꾸기 체험",
    subtitle: "씨앗부터 수확까지, 나만의 텃밭 만들기",
    description:
      "계절 채소의 씨앗을 뿌리고 모종을 심어 직접 키워보는 프로그램입니다. 흙을 만지고 물을 주며 식물이 자라는 과정을 관찰합니다. 수확한 채소로 건강한 요리도 만들어 봅니다.",
    image: "/images/vegetable-garden.svg",
    duration: "2시간 30분",
    capacity: "15~30명",
    target: "유아(5세) 이상",
    season: "봄~가을 (4~10월)",
    highlights: [
      "계절 채소 심기 및 수확",
      "유기농 텃밭 관리 방법 학습",
      "수확한 채소로 건강 요리 만들기",
      "식물 성장 관찰 일지 작성",
    ],
    schedule: [
      { time: "10:00", activity: "집합 및 안전 교육" },
      { time: "10:20", activity: "텃밭 이론 및 계절 채소 소개" },
      { time: "10:50", activity: "씨앗 심기 / 모종 심기 체험" },
      { time: "11:30", activity: "수확 체험 및 요리 활동" },
      { time: "12:10", activity: "시식 및 정리" },
    ],
    reviews: [
      {
        name: "정○○",
        content:
          "우리 아이가 채소를 싫어했는데, 직접 키운 상추는 잘 먹더라고요! 감사합니다.",
        rating: 5,
      },
      {
        name: "최○○",
        content:
          "가족 체험으로 참여했는데 어른들도 재미있었어요. 흙 냄새가 좋았습니다.",
        rating: 5,
      },
    ],
    faq: [
      {
        question: "어린이만 참여 가능한가요?",
        answer:
          "아닙니다. 가족, 친구, 단체 등 누구나 참여 가능합니다. 성인 프로그램도 운영합니다.",
      },
      {
        question: "수확한 채소를 가져갈 수 있나요?",
        answer:
          "네, 직접 수확한 채소는 포장하여 가져가실 수 있습니다.",
      },
    ],
  },
  {
    slug: "traditional-crafts",
    title: "전통 공예 체험",
    subtitle: "자연 재료로 만드는 전통 공예품",
    description:
      "짚풀, 나무, 천연 염료 등 자연에서 얻은 재료로 전통 공예품을 만들어 봅니다. 새끼줄 꼬기, 천연 염색, 도자기 빚기 등 다양한 활동을 통해 선조들의 지혜를 체험합니다.",
    image: "/images/traditional-crafts.svg",
    duration: "2시간",
    capacity: "10~25명",
    target: "초등학생 이상",
    season: "연중 운영",
    highlights: [
      "짚풀 공예 (새끼줄, 짚신 만들기)",
      "천연 염색 체험",
      "전통 도자기 빚기",
      "완성 작품 가져가기",
    ],
    schedule: [
      { time: "14:00", activity: "집합 및 프로그램 소개" },
      { time: "14:15", activity: "전통 공예 역사 이야기" },
      { time: "14:30", activity: "공예 체험 활동" },
      { time: "15:30", activity: "작품 완성 및 감상" },
      { time: "15:50", activity: "정리 및 기념 촬영" },
    ],
    reviews: [
      {
        name: "한○○",
        content:
          "천연 염색이 이렇게 예쁜 색이 나오는지 몰랐어요. 아이들이 자기 작품에 정말 뿌듯해했습니다.",
        rating: 5,
      },
      {
        name: "송○○",
        content:
          "외국인 친구와 함께 참여했는데 한국 전통문화를 체험할 수 있어서 좋았습니다.",
        rating: 4,
      },
    ],
    faq: [
      {
        question: "만든 작품은 바로 가져갈 수 있나요?",
        answer:
          "짚풀 공예와 천연 염색은 바로 가져갈 수 있습니다. 도자기는 건조 및 소성 과정이 필요하여 2주 후 수령 또는 택배 발송됩니다.",
      },
      {
        question: "재료비가 별도인가요?",
        answer:
          "아닙니다. 모든 재료비는 체험비에 포함되어 있습니다.",
      },
    ],
  },
  {
    slug: "insect-ecology",
    title: "곤충 생태 탐험",
    subtitle: "자연 속 작은 친구들을 만나는 생태 체험",
    description:
      "농촌의 논밭과 숲에서 다양한 곤충을 관찰하고, 곤충의 생태와 역할을 배우는 프로그램입니다. 곤충 채집, 관찰, 표본 만들기 등 체험 활동을 통해 생태계의 소중함을 느낍니다.",
    image: "/images/insect-ecology.svg",
    duration: "2시간 30분",
    capacity: "15~30명",
    target: "유아(6세) 이상",
    season: "여름 (6~8월)",
    highlights: [
      "논밭/숲 곤충 채집 체험",
      "곤충 관찰 및 생태 학습",
      "곤충 표본 만들기",
      "생태계 먹이사슬 교육",
    ],
    schedule: [
      { time: "09:30", activity: "집합 및 안전 교육" },
      { time: "10:00", activity: "곤충 생태 이론 학습" },
      { time: "10:30", activity: "야외 곤충 채집 활동" },
      { time: "11:15", activity: "곤충 관찰 및 표본 만들기" },
      { time: "11:50", activity: "정리 및 마무리" },
    ],
    reviews: [
      {
        name: "윤○○",
        content:
          "아들이 곤충을 좋아해서 참여했는데, 전문 강사님의 설명이 정말 알차고 재미있었습니다.",
        rating: 5,
      },
    ],
    faq: [
      {
        question: "곤충이 무서운 아이도 참여할 수 있나요?",
        answer:
          "네, 강사가 단계적으로 접근하도록 안내하며, 관찰 위주의 활동도 있어 무서워하는 아이도 자연스럽게 참여할 수 있습니다.",
      },
    ],
  },
];
