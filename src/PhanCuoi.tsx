import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { ContactButton, EMAIL, ZALO } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Một mức giá duy nhất (chủ sản phẩm chốt ngày 06/10/2026). Đổi giá hay quyền lợi thì sửa ở đây. */
const GOI = {
  ten: "Giấy phép Dofin",
  gia: "109.000đ",
  mo: "Mua một lần, dùng vĩnh viễn trên máy của bạn.",
  quyen: [
    "Dùng vĩnh viễn, không thu phí hằng tháng",
    "Cập nhật miễn phí 3 năm kể từ ngày bắt đầu dùng",
    "Đủ mọi tính năng của Dofin",
    "Dữ liệu nằm trên máy bạn",
    "Mỗi giấy phép dùng cho 1 máy tính",
  ],
};

export function BangGia() {
  return (
    <section id="bang-gia" className="c3-pricing-section relative z-10">
      <svg className="absolute w-0 h-0" aria-hidden="true">
        {/* Id riêng: hai bộ lọc trùng id thì trình duyệt chỉ dùng một, cái kia hỏng im lặng. */}
        <filter id="c3-noise-gia">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
          <feComponentTransfer><feFuncA type="linear" slope="0.075" /></feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </svg>
      <div className="c3-watermark-container" aria-hidden="true">
        <div className="c3-watermark-main">
          <span className="c3-watermark-line-1">Hồ sơ của bạn.</span>
          <span className="c3-watermark-line-2">Gọn gàng trở lại</span>
        </div>
      </div>
      <div className="c3-grid c3-grid-mot">
        <div className="c3-card c3-card-pro">
          <div className="c3-tier-small">{GOI.ten}</div>
          <div className="c3-tier-large">{GOI.gia}</div>
          <p className="c3-desc">{GOI.mo}</p>
          <ul className="c3-list">
            {GOI.quyen.map((q) => (
              <li key={q}>
                <span className="c3-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                {q}
              </li>
            ))}
          </ul>
          <a className="c3-btn" href={`https://zalo.me/${ZALO}`} target="_blank" rel="noopener noreferrer">Nhắn Zalo để mua</a>
        </div>
      </div>
    </section>
  );
}

export function LoiMoi() {
  return (
    <section id="lien-he" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center">
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: "radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)" }} />
        <h2 className="relative text-4xl md:text-6xl font-semibold tracking-tight leading-[1.08]">
          Bớt lục tìm giấy tờ.<br />Dành giờ cho việc chính.
        </h2>
        <p className="relative mt-6 text-white/60 max-w-md mx-auto text-sm leading-[1.6] text-balance">
          Nhắn cho Dofin để được tư vấn gói phù hợp và nhận giấy phép theo mã máy của bạn.
        </p>
        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
          {ZALO && <ContactButton label="Nhắn Zalo" href={`https://zalo.me/${ZALO}`} />}
          <a href={`mailto:${EMAIL}?subject=${encodeURIComponent("Liên hệ mua Dofin")}`}
            className={ZALO
              ? "group inline-flex items-center gap-2 rounded-full border border-white/15 text-white text-sm font-medium px-5 py-3 hover:bg-white/5 transition-colors"
              : "group inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-medium px-5 py-3 hover:bg-white/90 transition-colors"}>
            Gửi email cho Dofin <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-px" />
          </a>
        </div>
        <p className="relative mt-4 text-xs text-white/40">{EMAIL}</p>
      </motion.div>
    </section>
  );
}

export function ChanTrang() {
  return (
    <footer className="relative z-10 max-w-6xl mx-auto px-6 pb-12 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-white/40">
      <span>© 2026 Dofin by Trần Minh Quang. Bảo lưu mọi quyền.</span>
      <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">{EMAIL}</a>
    </footer>
  );
}
