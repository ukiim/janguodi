// ============================================================
// 네이버 스마트스토어 설정
// TODO: 스마트스토어 관리자 > 상품관리 에서 각 상품 ID를 확인 후 입력하세요.
//       상품 URL 예시: https://smartstore.naver.com/storename/products/1234567890
// ============================================================

export const STORE_BASE = "https://smartstore.naver.com/lifeinsedu";

const PRODUCT_IDS: Record<string, string> = {
  rice: "TODO_PRODUCT_ID",
  handkerchief: "TODO_PRODUCT_ID",
  "straw-kit": "TODO_PRODUCT_ID",
  vegetables: "TODO_PRODUCT_ID",
  honey: "TODO_PRODUCT_ID",
  "insect-kit": "TODO_PRODUCT_ID",
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
    name: "유기농 쌀 (5kg)",
    description:
      "체험 농장에서 직접 재배한 친환경 유기농 쌀. 갓 도정한 신선한 쌀을 만나보세요.",
    price: 25000,
    image: "/images/product-rice.svg",
    storeUrl: productUrl("rice"),
    badge: "인기",
  },
  {
    id: "2",
    name: "천연 염색 손수건 세트",
    description:
      "체험 프로그램에서 사용하는 천연 염료로 물들인 손수건 3장 세트입니다.",
    price: 18000,
    image: "/images/product-handkerchief.svg",
    storeUrl: productUrl("handkerchief"),
  },
  {
    id: "3",
    name: "전통 짚공예 키트",
    description:
      "집에서도 즐기는 짚풀 공예! 재료와 설명서가 포함된 DIY 키트입니다.",
    price: 15000,
    image: "/images/product-straw-kit.svg",
    storeUrl: productUrl("straw-kit"),
    badge: "NEW",
  },
  {
    id: "4",
    name: "유기농 채소 꾸러미",
    description:
      "계절 채소를 엄선하여 담은 유기농 채소 꾸러미. 주 1회 정기배송도 가능합니다.",
    price: 30000,
    image: "/images/product-vegetables.svg",
    storeUrl: productUrl("vegetables"),
  },
  {
    id: "5",
    name: "꿀 (500g)",
    description:
      "체험 농장 인근 양봉장에서 채취한 100% 순수 천연 꿀입니다.",
    price: 22000,
    image: "/images/product-honey.svg",
    storeUrl: productUrl("honey"),
    badge: "인기",
  },
  {
    id: "6",
    name: "곤충 관찰 키트",
    description:
      "돋보기, 채집통, 관찰 일지가 포함된 어린이 곤충 탐험 키트입니다.",
    price: 12000,
    image: "/images/product-insect-kit.svg",
    storeUrl: productUrl("insect-kit"),
    badge: "NEW",
  },
];
