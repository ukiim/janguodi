/**
 * 클라이언트에서 이미지를 리사이즈(최대 1600px, JPEG 0.85)한 뒤
 * /api/admin/upload 로 업로드하고 공개 URL을 반환한다.
 * 서버리스 본문 한계(4.5MB)를 넘지 않도록 클라이언트에서 먼저 압축.
 */
export async function uploadImageFile(file: File): Promise<string> {
  const resized = await resizeImage(file, 1600, 0.85);
  const form = new FormData();
  form.append("file", resized, resized.name);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "업로드에 실패했습니다.");
  }
  const data = (await res.json()) as { url: string };
  return data.url;
}

async function resizeImage(
  file: File,
  maxSize: number,
  quality: number
): Promise<File> {
  // png/webp 투명 이미지는 그대로, 그 외는 jpeg로 압축
  const dataUrl = await readAsDataURL(file);
  const img = await loadImage(dataUrl);

  let { width, height } = img;
  if (width > maxSize || height > maxSize) {
    if (width >= height) {
      height = Math.round((height * maxSize) / width);
      width = maxSize;
    } else {
      width = Math.round((width * maxSize) / height);
      height = maxSize;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file; // 폴백: 원본 그대로
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality)
  );
  if (!blob) return file;

  const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg" });
}

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
