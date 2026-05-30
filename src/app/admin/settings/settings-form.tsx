"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveSettings } from "./actions";
import type { SiteSettings } from "@/lib/site-settings";
import { BigInput, BigTextarea, FormSection } from "@/components/admin/big-input";
import { StickyFormActions } from "@/components/admin/sticky-form-actions";
import {
  Camera,
  Phone,
  MapPin,
  ShoppingBag,
  AlignLeft,
  CalendarCheck,
} from "lucide-react";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [pending, start] = useTransition();
  const [data, setData] = useState<SiteSettings>(initial);
  const [isDirty, setIsDirty] = useState(false);

  function update(key: keyof SiteSettings, value: string) {
    setData((d) => ({ ...d, [key]: value }));
    setIsDirty(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      try {
        await saveSettings(data);
        setIsDirty(false);
        toast.success("저장되었습니다.");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "저장 중 오류";
        if (msg.includes("NEXT_REDIRECT")) return;
        toast.error(`저장 실패: ${msg}`);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. 연락처 */}
      <FormSection title="연락처" step={1}>
        <SectionIcon icon={<Phone className="h-5 w-5" />} text="홈페이지·푸터·문의 페이지에 표시됩니다." />
        <BigInput
          label="대표 전화"
          value={data.contact_phone}
          onChange={(e) => update("contact_phone", e.target.value)}
          placeholder="055-000-0000"
        />
        <BigInput
          label="이메일"
          type="email"
          value={data.contact_email}
          onChange={(e) => update("contact_email", e.target.value)}
          placeholder="info@odifarm.co.kr"
        />
        <BigInput
          label="운영 시간"
          value={data.contact_hours}
          onChange={(e) => update("contact_hours", e.target.value)}
          placeholder="평일 09:00~18:00 / 주말 휴무"
        />
      </FormSection>

      {/* 2. 위치 / 오시는길 */}
      <FormSection title="오시는길" step={2}>
        <SectionIcon icon={<MapPin className="h-5 w-5" />} text="주소를 입력하면 네이버 지도에 자동으로 검색되어 표시됩니다." />
        <BigInput
          label="농장 주소"
          value={data.location_address}
          onChange={(e) => update("location_address", e.target.value)}
          placeholder="경상남도 김해시 장유로 000"
          help="우편번호 없이 도로명 주소만 적으면 충분합니다."
        />
        <BigTextarea
          label="교통편 안내"
          rows={4}
          value={data.location_directions}
          onChange={(e) => update("location_directions", e.target.value)}
          placeholder={"예시:\n부산김해경전철 장유역에서 도보 5분\n시내버스 1번·12번 장유시장 정류장 하차"}
          help="여러 줄로 적어주세요. 줄 바꿈 그대로 표시됩니다."
        />
        <BigInput
          label="주차 안내"
          value={data.location_parking}
          onChange={(e) => update("location_parking", e.target.value)}
          placeholder="농장 앞 무료 주차장 (10대) / 대형버스 가능"
        />
      </FormSection>

      {/* 3. 소셜 미디어 */}
      <FormSection title="소셜 미디어" step={3}>
        <SectionIcon icon={<Camera className="h-5 w-5" />} text="입력하면 푸터에 인스타그램·블로그 아이콘 링크로 표시됩니다." />
        <BigInput
          label="인스타그램 아이디"
          value={data.instagram_handle}
          onChange={(e) => update("instagram_handle", e.target.value)}
          placeholder="janguodi (앞에 @ 빼고 입력)"
          example="janguodi  →  instagram.com/janguodi"
        />
        <BigInput
          label="(선택) 인스타그램 전체 주소"
          value={data.instagram_url}
          onChange={(e) => update("instagram_url", e.target.value)}
          placeholder="https://www.instagram.com/janguodi/"
          help="아이디 대신 전체 주소를 쓰고 싶을 때만 입력. 입력하면 위 아이디는 무시됩니다."
        />
        <BigInput
          label="네이버 블로그 ID"
          value={data.naver_blog_id}
          onChange={(e) => update("naver_blog_id", e.target.value)}
          placeholder="janguodi"
          example="janguodi  →  blog.naver.com/janguodi"
        />
        <BigInput
          label="(선택) 네이버 블로그 전체 주소"
          value={data.naver_blog_url}
          onChange={(e) => update("naver_blog_url", e.target.value)}
          placeholder="https://blog.naver.com/janguodi"
        />
      </FormSection>

      {/* 예약 안내 */}
      <FormSection title="예약 안내" step={4}>
        <SectionIcon
          icon={<CalendarCheck className="h-5 w-5" />}
          text="예약 페이지(/reservation) 우측 사이드바의 안내 문구를 관리합니다."
        />
        <BigTextarea
          label="예약 안내 항목 (한 줄에 한 항목)"
          rows={5}
          value={data.reservation_notice}
          onChange={(e) => update("reservation_notice", e.target.value)}
          placeholder={
            "예약은 체험일 3일 전까지 가능합니다.\n예약 취소는 체험일 2일 전까지 무료입니다.\n20인 이상 단체 예약은 전화로 문의 바랍니다."
          }
          help="줄 바꿈으로 항목을 구분합니다. 빈 줄은 무시됩니다."
        />
        <BigTextarea
          label="전화 예약 안내문"
          rows={3}
          value={data.reservation_phone_note}
          onChange={(e) => update("reservation_phone_note", e.target.value)}
          placeholder="온라인 예약이 어려우시면 전화로 예약하실 수 있습니다."
          help="전화 예약 카드에 표시되는 한 문단 안내입니다."
        />
      </FormSection>

      {/* 스토어 연결 */}
      <FormSection title="네이버 스마트스토어" step={5}>
        <SectionIcon icon={<ShoppingBag className="h-5 w-5" />} text="스토어 페이지의 '네이버 스토어 방문' 버튼이 이 주소로 연결됩니다." />
        <BigInput
          label="스마트스토어 주소"
          value={data.smartstore_base_url}
          onChange={(e) => update("smartstore_base_url", e.target.value)}
          placeholder="https://smartstore.naver.com/janguodi"
          help="개별 상품 주소는 상품 관리에서 따로 입력합니다."
        />
      </FormSection>

      {/* 5. 푸터 */}
      <FormSection title="푸터 (페이지 하단)" step={6}>
        <SectionIcon icon={<AlignLeft className="h-5 w-5" />} text="모든 페이지 맨 아래에 표시되는 영역입니다." />
        <BigInput
          label="회사명 / 농장명"
          value={data.footer_company_name}
          onChange={(e) => update("footer_company_name", e.target.value)}
          placeholder="김해장유오디감귤체험농장"
          help="비워두면 기본값(김해장유오디감귤체험농장)으로 표시됩니다."
        />
        <BigTextarea
          label="브랜드 한 줄 설명"
          rows={3}
          value={data.footer_description}
          onChange={(e) => update("footer_description", e.target.value)}
          placeholder="자연 속에서 배우고 체험하는 농촌 프로그램으로 특별한 경험을 선사합니다."
        />
        <BigTextarea
          label="사업자 정보 (선택)"
          rows={2}
          value={data.footer_business_info}
          onChange={(e) => update("footer_business_info", e.target.value)}
          placeholder="사업자등록번호: 000-00-00000 / 대표: 홍길동"
          help="사업자등록번호·통신판매업번호 등 법적 표시가 필요한 경우 입력하세요."
        />
        <BigInput
          label="저작권 표시"
          value={data.footer_copyright}
          onChange={(e) => update("footer_copyright", e.target.value)}
          placeholder="© 2026 김해장유오디감귤체험농장. All rights reserved."
          help="비워두면 자동으로 ©연도 회사명 표시됩니다."
        />
      </FormSection>

      <StickyFormActions saving={pending} isDirty={isDirty} isEdit={true} />
    </form>
  );
}

function SectionIcon({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="rounded-lg bg-muted/40 p-3 flex items-start gap-2.5 text-sm text-muted-foreground">
      <span className="text-primary shrink-0">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
