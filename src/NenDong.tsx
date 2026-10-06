import { useEffect, useRef } from "react";

// Video nền lấy đúng link của mẫu (máy chủ người khác): link chết thì nền chỉ còn màu đen.
const VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4";

export default function NenDong() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    // Người dùng bật giảm chuyển động thì để video đứng ở khung đầu.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.pause();
  }, []);
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <video ref={ref} autoPlay loop muted playsInline className="w-full h-full object-cover pointer-events-none" src={VIDEO} />
    </div>
  );
}
