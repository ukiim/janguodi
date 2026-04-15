// ============================================================
// 네이버 스마트스토어 설정
// TODO: 스마트스토어 관리자 > 상품관리 에서 각 상품 ID를 확인 후 입력하세요.
//       상품 URL 예시: https://smartstore.naver.com/storename/products/1234567890
// ============================================================

export const STORE_BASE = "https://smartstore.naver.com/janguodi";

const PRODUCT_IDS: Record<string, string> = {
  "mulberry-jam": "TODO_PRODUCT_ID",
  "mulberry-juice": "TODO_PRODUCT_ID",
  "fresh-citrus": "TODO_PRODUCT_ID",
  "citrus-cheong": "TODO_PRODUCT_ID",
  "mulberry-vinegar": "TODO_PRODUCT_ID",
  "gift-set": "TODO_PRODUCT_ID",
};

function productUrl(key: string): string {
  const id = PRODUCT_IDS[key];
  if (!id || id === "TODO_PRODUCT_ID") return STORE_BASE;
  return `${STORE_BASE}/products/${id}`;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  storeUrl: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "수제 오디잼 (300g)",
    description:
      "농장에서 직접 수확한 오디로 만든 수제 잼. 설탕을 최소화하고 오디 본연의 달콤함을 살렸습니다.",
    price: 15000,
    image: "/images/product-mulberry-jam.jpg",
    storeUrl: productUrl("mulberry-jam"),
    badge: "인기",
  },
  {
    id: "2",
    name: "오디 원액 주스 (500ml)",
    description:
      "100% 오디 착즙 원액. 물이나 탄산수에 희석하여 시원하게 즐기세요. 안토시아닌이 풍부합니다.",
    price: 18000,
    image: "/images/product-mulberry-juice.jpg",
    storeUrl: productUrl("mulberry-juice"),
    badge: "인기",
  },
  {
    id: "3",
    name: "하우스 감귤 (3kg)",
    description:
      "김해장유 하우스에서 재배한 새콤달콤 감귤. 당도 높고 껍질이 얇아 먹기 편합니다.",
    price: 22000,
    image: "/images/product-fresh-citrus.jpg",
    storeUrl: productUrl("fresh-citrus"),
    badge: "제철",
  },
  {
    id: "4",
    name: "수제 감귤청 (500g)",
    description:
      "감귤을 꿀과 함께 숙성시킨 수제 감귤청. 따뜻한 물에 타서 감귤차로, 요거트 토핑으로 활용하세요.",
    price: 16000,
    image: "/images/product-citrus-cheong.jpg",
    storeUrl: productUrl("citrus-cheong"),
    badge: "NEW",
  },
  {
    id: "5",
    name: "오디 발효 식초 (375ml)",
    description:
      "오디를 자연 발효시켜 만든 과일 식초. 물에 희석하여 건강 음료로, 샐러드 드레싱으로 활용 가능합니다.",
    price: 20000,
    image: "/images/product-mulberry-vinegar.jpg",
    storeUrl: productUrl("mulberry-vinegar"),
  },
  {
    id: "6",
    name: "오디·감귤 선물세트",
    description:
      "오디잼 + 감귤청 + 오디 원액을 예쁜 선물 박스에 담았습니다. 명절·감사 선물로 인기 만점!",
    price: 45000,
    image: "/images/product-gift-set.jpg",
    storeUrl: productUrl("gift-set"),
    badge: "선물용",
  },
];
