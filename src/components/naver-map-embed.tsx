interface NaverMapEmbedProps {
  address: string;
  title?: string;
  className?: string;
}

export function NaverMapEmbed({
  address,
  title,
  className,
}: NaverMapEmbedProps) {
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://map.naver.com/p/search/${encodedAddress}`;

  return (
    <div className={className}>
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: "0.5rem" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title || `${address} 지도`}
        allowFullScreen
      />
      <noscript>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          네이버 지도에서 보기: {address}
        </a>
      </noscript>
    </div>
  );
}
