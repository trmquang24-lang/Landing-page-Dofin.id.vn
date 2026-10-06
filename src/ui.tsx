import type { CSSProperties } from "react";
import { ChevronRight, MessageCircle } from "lucide-react";

// Logo thật của Dofin (assets/icons/logo-mark.svg), bỏ clip-path có id: nhiều bản cùng id thì hình hỏng.
export function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
      strokeLinejoin="round" className={className} aria-hidden="true">
      <path strokeMiterlimit={10} d="M22.94 19.61L21.8 19.87C20.98 20.06 20.34 20.7 20.15 21.52L19.88 22.66C19.85 22.78 19.68 22.78 19.65 22.66L19.39 21.52C19.2 20.7 18.56 20.06 17.74 19.87L16.6 19.6C16.48 19.57 16.48 19.4 16.6 19.37L17.74 19.11C18.56 18.92 19.2 18.28 19.39 17.46L19.66 16.32C19.69 16.2 19.86 16.2 19.89 16.32L20.15 17.46C20.34 18.28 20.98 18.92 21.8 19.11L22.94 19.38C23.06 19.41 23.06 19.58 22.94 19.61Z" />
      <path opacity={0.4} d="M5.33 2H4.22C2.99 2 2 2.99 2 4.22V5.33" />
      <path opacity={0.4} d="M2 18.67V19.78C2 21.01 2.99 22 4.22 22H5.33" />
      <path opacity={0.4} d="M22 5.33V4.22C22 2.99 21.01 2 19.78 2H18.67" />
      <path d="M13.54 12.13C14.18 11.57 14.52 10.67 14.27 9.71C14.06 8.92 13.42 8.28 12.63 8.08C11.06 7.67 9.65 8.85 9.65 10.35C9.65 11.06 9.97 11.7 10.46 12.13C10.6 12.25 10.67 12.43 10.62 12.6L9.97 14.86C9.81 15.43 10.23 15.99 10.83 15.99H13.18C13.77 15.99 14.2 15.42 14.04 14.86L13.39 12.59C13.34 12.41 13.41 12.24 13.55 12.12H13.54V12.13Z" />
    </svg>
  );
}

export const EMAIL = "trmquang24@gmail.com";
// Số Zalo bán hàng: để trống thì nút Zalo tự ẩn, khỏi đưa người xem vào một link hỏng.
export const ZALO = "";

/* Trang này để liên hệ mua, không phát bộ cài: nút chính dẫn xuống khối liên hệ cuối trang. */
export function ContactButton({ label = "Liên hệ mua", href = "#lien-he", full = false }: { label?: string; href?: string; full?: boolean }) {
  return (
    <a href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-sm px-5 py-3 transition-all hover:bg-white/90 active:scale-[0.98] ${full ? "w-full" : ""}`}>
      <MessageCircle className="w-4 h-4" aria-hidden="true" />
      {label}
      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-px" aria-hidden="true" />
    </a>
  );
}

export function SectionEyebrow({ label, tag }: { label: string; tag?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-white/80">
      <span className="w-1.5 h-1.5 rounded-full bg-white" />
      {label}
      {tag && <span className="px-2 py-0.5 rounded-full border border-white/10 text-white/50 text-xs">{tag}</span>}
    </div>
  );
}

export const gradientStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  filter: "url(#c3-noise)",
};
