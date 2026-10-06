import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Search, X } from "lucide-react";
import { ContactButton, LogoMark, gradientStyle } from "./ui";
import NenDong from "./NenDong";
import { AnhDungApp, CamKet, DinhDang, TinhNangHoaDon } from "./PhanGiua";
import { BangGia, ChanTrang, LoiMoi } from "./PhanCuoi";

const EASE = [0.22, 1, 0.36, 1] as const;
const LIEN_KET = [
  ["Tính năng", "#tinh-nang"],
  ["Cam kết", "#cam-ket"],
  ["Bảng giá", "#bang-gia"],
  ["Liên hệ", "#lien-he"],
] as const;

function Navbar() {
  const [mo, setMo] = useState(false);
  return (
    <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-20 max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
      <a href="#" aria-label="Dofin" className="text-white"><LogoMark /></a>
      <div className="hidden md:flex gap-8">
        {LIEN_KET.map(([ten, href], i) => (
          <motion.a key={href} href={href} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
            className="text-white/70 text-sm font-medium hover:text-white transition-colors">{ten}</motion.a>
        ))}
      </div>
      <div className="hidden md:block"><ContactButton /></div>
      <button type="button" aria-label={mo ? "Đóng menu" : "Mở menu"} aria-expanded={mo} onClick={() => setMo(!mo)}
        className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
        {mo ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>
      <AnimatePresence>
        {mo && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="md:hidden absolute top-20 inset-x-4 liquid-glass rounded-2xl p-4 bg-black/85 backdrop-blur-xl flex flex-col gap-1">
            {LIEN_KET.map(([ten, href]) => (
              <a key={href} href={href} onClick={() => setMo(false)} className="px-3 py-2.5 rounded-lg text-sm text-white/80 hover:bg-white/5">{ten}</a>
            ))}
            <div className="mt-2" onClick={() => setMo(false)}><ContactButton full /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-20 text-center flex flex-col items-center">
      {/* Lớp tối mờ sau chữ: dải sáng của video đi ngang qua thì chữ nhỏ vẫn đọc được. */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55),transparent_65%)]" />
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
        className="text-4xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
        <span className="block">Hồ sơ của bạn.</span>
        <span className="block animate-shiny pb-2" style={gradientStyle}>Gọn gàng trở lại</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
        className="mt-8 text-white/60 max-w-md text-base leading-[1.5] text-balance">
        Dofin gom hồ sơ, hóa đơn và tờ khai thuế về một chỗ trên máy bạn, xếp gọn từng bộ chứng từ và nhắc việc đúng hạn.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
        className="mt-10 flex flex-col items-center gap-3">
        <ContactButton />
        <span className="text-xs text-white/40">Dành cho Windows 10 và 11, bản 64-bit</span>
      </motion.div>
    </section>
  );
}

function ThanhCuaSo() {
  const muc = ["Tệp", "Sửa", "Xem", "Đi tới", "Cửa sổ", "Trợ giúp"];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}
      className="relative z-10 h-10 bg-black/40 backdrop-blur-md border-t border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <LogoMark className="w-3.5 h-3.5" />
          <span className="font-bold text-white">Dofin</span>
          {muc.map((m, i) => (
            <span key={m} className={`text-white/70 ${i > 2 ? "hidden sm:inline" : ""} ${i > 3 ? "hidden md:inline" : ""}`}>{m}</span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-white/70">
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Thứ Ba, 6 tháng 10, 9:41</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white">
      <NenDong />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>
      <Navbar />
      <Hero />
      <ThanhCuaSo />
      <AnhDungApp />
      <TinhNangHoaDon />
      <DinhDang />
      <CamKet />
      <BangGia />
      <LoiMoi />
      <ChanTrang />
    </div>
  );
}
