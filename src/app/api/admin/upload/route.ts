import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

function configured() {
  return (
    !!process.env.CLOUDINARY_CLOUD_NAME &&
    !!process.env.CLOUDINARY_API_KEY &&
    !!process.env.CLOUDINARY_API_SECRET
  );
}

export async function POST(req: NextRequest) {
  // 관리자 인증 확인
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  if (!configured()) {
    return NextResponse.json(
      {
        error:
          "사진 저장소가 아직 설정되지 않았습니다. (Cloudinary 연결 필요)",
      },
      { status: 503 }
    );
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "JPG, PNG, WebP 형식만 업로드할 수 있습니다." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "파일이 너무 큽니다. (최대 8MB)" },
      { status: 400 }
    );
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "janguodi",
      resource_type: "image",
    });
    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    console.error("[upload] error", err);
    return NextResponse.json(
      { error: "업로드 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
