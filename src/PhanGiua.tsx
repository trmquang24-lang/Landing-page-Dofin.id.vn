import { useState } from "react";
import { motion } from "motion/react";
import { HardDrive, Minus, MousePointerClick, Square, WifiOff, X } from "lucide-react";
import { SectionEyebrow, gradientStyle } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;
const hien = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, delay, ease: EASE },
});

/* ---------- Giao diện thật của Dofin (ảnh chụp từ bản chạy với dữ liệu mẫu) ---------- */
const MAN = [
  { ten: "Tổng quan", anh: "/anh/tong-quan.webp", mo: "Màn Tổng quan của Dofin: hồ sơ cần xử lý, hóa đơn đã tải, việc quá hạn" },
  { ten: "Hồ sơ", anh: "/anh/ho-so.webp", mo: "Chi tiết một hồ sơ: đủ 3 trên 4 chứng từ, còn thiếu biên bản giao hàng" },
  { ten: "Hóa đơn", anh: "/anh/hoa-don.webp", mo: "Kho hóa đơn điện tử chia đầu vào, đầu ra, kèm trạng thái hợp lệ" },
  { ten: "Tờ khai thuế", anh: "/anh/to-khai.webp", mo: "Kho tờ khai thuế, lọc theo năm, quý, tháng" },
];

export function AnhDungApp() {
  const [chon, setChon] = useState(0);
  return (
    <section id="tinh-nang" className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl">
        <div className="h-11 px-2 md:px-4 flex items-center justify-between gap-2 border-b border-white/10">
          <div role="tablist" aria-label="Các màn của Dofin" className="flex gap-1 overflow-x-auto">
            {MAN.map((m, i) => (
              <button key={m.ten} type="button" role="tab" aria-selected={chon === i} onClick={() => setChon(i)}
                className={`shrink-0 rounded-md px-3 py-1.5 text-xs transition-colors ${chon === i ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}>
                {m.ten}
              </button>
            ))}
          </div>
          <span className="hidden sm:flex gap-3 text-white/40 shrink-0">
            <Minus className="w-3.5 h-3.5" /><Square className="w-3 h-3" /><X className="w-3.5 h-3.5" />
          </span>
        </div>
        {/* Ảnh chồng lên nhau, chỉ đổi độ mờ: chuyển màn không giật khung, ảnh đã tải sẵn. */}
        <div className="relative aspect-[16/10]">
          {MAN.map((m, i) => (
            <img key={m.anh} src={m.anh} alt={m.mo} width={2880} height={1800} decoding="async"
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${chon === i ? "opacity-100" : "opacity-0"}`} />
          ))}
        </div>
      </motion.div>
      <p className="mt-4 text-center"><span className="inline-block rounded-full bg-black/60 px-3 py-1 text-xs text-white/60">Ảnh chụp giao diện thật của Dofin, dùng dữ liệu mẫu.</span></p>
    </section>
  );
}

/* ---------- Tính năng hóa đơn ---------- */
const NHOM = [
  { ten: "Hợp lệ", so: 31, mau: "#ffffff", muc: ["Công ty TNHH Minh An, số 00001284", "Vận tải Hòa Bình, số 00000917"] },
  { ten: "Cần kiểm tra", so: 4, mau: "#e5e5e5", muc: ["Sao Việt, tổng tiền không khớp dòng hàng", "Phúc Thịnh, chưa gắn hồ sơ"] },
  { ten: "Trùng, bỏ qua", so: 5, mau: "#a3a3a3", muc: ["Đã có trong kho, không nhập lần hai"] },
  { ten: "Không đọc được", so: 2, mau: "#525252", muc: ["Tệp hỏng hoặc không phải hóa đơn"] },
];

export function TinhNangHoaDon() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <motion.div {...hien()}>
          <SectionEyebrow label="Hóa đơn" tag="XML, ZIP, PDF" />
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.08]">
            Thả hóa đơn vào.<br />Dofin tự xếp chỗ.
          </h2>
          <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">
            Kéo cả thư mục hóa đơn điện tử vào Dofin. Dofin đọc từng tệp, kiểm chữ ký số, bỏ qua hóa đơn trùng và gợi ý hồ sơ cho từng tờ.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Kiểm chữ ký số", "Bỏ qua hóa đơn trùng", "Đọc cả PDF bản quét", "Tải từ Cổng hóa đơn điện tử"].map((c) => (
              <span key={c} className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">{c}</span>
            ))}
          </div>
        </motion.div>
        <motion.div {...hien(0.15)} className="liquid-glass rounded-2xl p-5">
          <p className="text-xs text-white/50">Hôm nay, 42 hóa đơn đã đọc</p>
          <div className="mt-4 space-y-3">
            {NHOM.map((n) => (
              <div key={n.ten} className="liquid-glass rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full" style={{ background: n.mau }} />
                  <span className="font-medium">{n.ten}</span>
                  <span className="ml-auto text-xs text-white/50">{n.so}</span>
                </div>
                <ul className="mt-2 space-y-1">
                  {n.muc.map((m) => <li key={m} className="text-xs text-white/50 pl-4">{m}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Hiệu năng: mốc 2 triệu là mốc đã đo thật trên hộp cát, đừng đổi số khi chưa đo lại ---------- */
const CHI_SO = [
  { so: "Không giới hạn", nhan: "số hóa đơn tải về" },
  { so: "2.000.000", nhan: "hóa đơn trong kho" },
  { so: "2.000.000", nhan: "hồ sơ chứng từ" },
];

// Dải sáng đứng yên: dải ánh kim của tiêu đề có đoạn tối, đặt lên con số thì có lúc số chìm mất.
const SO_SANG = { ...gradientStyle, backgroundImage: "linear-gradient(to right, #ffffff 0%, #A4F4FD 55%, #00d2ff 100%)", backgroundSize: "100% auto", filter: "none" };

export function HieuNang() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
      <motion.h2 {...hien()} className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.08]">
        Nhiều đến đâu,<br />vẫn mở ra trong tích tắc.
      </motion.h2>
      <motion.p {...hien(0.1)} className="mt-6 text-white/60 text-base leading-[1.6] max-w-xl mx-auto text-balance">
        Dofin không giới hạn số hóa đơn bạn tải về. Kho dữ liệu đã được đo thử với 2 triệu hóa đơn và 2 triệu hồ sơ trên một máy tính.
      </motion.p>
      <div className="mt-14 grid sm:grid-cols-3 gap-10 sm:gap-0 sm:divide-x divide-white/10">
        {CHI_SO.map((c, i) => (
          <motion.div key={c.nhan} {...hien(0.15 + i * 0.08)} className="px-6">
            <p className="text-4xl md:text-[2.6rem] font-semibold tracking-tight pb-1 whitespace-nowrap" style={SO_SANG}>{c.so}</p>
            <p className="mt-3 text-sm text-white/60">{c.nhan}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Ứng dụng web chạy trên máy: Dofin mở trong trình duyệt (dofin_launcher dùng webbrowser.open
   tới 127.0.0.1), khách lần đầu dễ tưởng là trang mạng. Giọng nhẹ nhàng, không giảng giải. ---------- */
const DIEU_HAY = [
  { icon: MousePointerClick, ten: "Quen tay ngay từ đầu", mo: "Bấm, cuộn, mở thêm thẻ y như khi bạn lướt web hằng ngày." },
  { icon: WifiOff, ten: "Không cần mạng để làm việc", mo: "Chỉ dùng Internet khi bạn tải hóa đơn từ Cổng, và hỏi bản mới một lần mỗi khi mở app." },
  { icon: HardDrive, ten: "Dữ liệu ở yên trên máy", mo: "Hồ sơ, hóa đơn, tờ khai nằm trên ổ đĩa của bạn, không gửi đi đâu cả." },
];

export function ChayTrenMay() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-[1fr_1.15fr] gap-10 md:gap-14 items-center">
        {/* Tấm kính tối sau chữ: dải sáng của video nền chạy ngang qua cột này. */}
        <motion.div {...hien()} className="liquid-glass rounded-3xl bg-black/45 p-6 md:p-8">
          <h2 className="text-3xl md:text-[2.6rem] font-semibold tracking-tight leading-[1.1]">
            Mở trong trình duyệt,<br />chạy trên máy bạn.
          </h2>
          <p className="mt-6 text-white/60 text-base leading-[1.7] max-w-md">
            Lần đầu mở Dofin, bạn sẽ thấy Dofin hiện ra trong một thẻ trình duyệt, trông như một trang web.
            Thật ra Dofin không chạy trên mạng: địa chỉ 127.0.0.1 có nghĩa là “chính máy này”.
          </p>
          <p className="mt-4 text-white/60 text-base leading-[1.7] max-w-md">
            Tụi mình chọn cách làm này để Dofin nhẹ, mở nhanh, dễ nhìn và dễ cập nhật về sau.
          </p>
          <ul className="mt-8 space-y-5">
            {DIEU_HAY.map(({ icon: Icon, ten, mo }) => (
              <li key={ten} className="flex gap-4">
                <span className="liquid-glass w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#A4F4FD]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{ten}</p>
                  <p className="mt-1 text-sm text-white/55 leading-[1.6]">{mo}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div {...hien(0.15)} className="rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90">
          {/* Khung trình duyệt giản lược: cho khách thấy trước đúng cảnh họ sẽ gặp khi mở Dofin. */}
          <div className="h-10 px-3 flex items-center gap-3 border-b border-white/10">
            <span className="flex gap-1.5" aria-hidden="true">
              <i className="w-2.5 h-2.5 rounded-full bg-white/20" /><i className="w-2.5 h-2.5 rounded-full bg-white/20" /><i className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </span>
            <span className="flex-1 min-w-0 h-6 rounded-md bg-white/[0.06] px-3 flex items-center gap-2 text-[11px] text-white/60 truncate">
              <HardDrive className="w-3 h-3 shrink-0" aria-hidden="true" /> 127.0.0.1 / Dofin chạy trên máy này
            </span>
          </div>
          <img src="/anh/tong-quan.webp" alt="Dofin mở trong một thẻ trình duyệt, ở địa chỉ 127.0.0.1 của chính máy tính"
            width={2880} height={1800} loading="lazy" decoding="async" className="block w-full h-auto" />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Định dạng làm việc được (thay cho dải logo khách hàng) ---------- */
const DINH_DANG = ["Hóa đơn XML", "Tệp ZIP", "PDF", "Excel", "Word", "CSV", "Tờ khai XML", "Cổng HĐĐT"];

export function DinhDang() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20 text-center">
      <p className="text-xs uppercase tracking-widest text-white/40">Làm việc với đúng những tệp bạn đang có</p>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
        {DINH_DANG.map((d, i) => (
          <motion.span key={d} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="text-sm font-semibold tracking-tight text-white/50 hover:text-white transition-colors">{d}</motion.span>
        ))}
      </div>
    </section>
  );
}

/* ---------- Cam kết (thay lời khen: chỉ nói điều Chính sách quyền riêng tư đã ghi) ---------- */
const CAM_KET = [
  { cau: "Hồ sơ, hóa đơn và tờ khai nằm trên máy bạn. Dofin không gửi dữ liệu kinh doanh qua Internet hay cho bên thứ ba.",
    ten: "Dữ liệu ở lại trên máy", nguon: "Chính sách quyền riêng tư, mục 2", nhom: "Quyền riêng tư" },
  { cau: "Không đo hành vi, không quảng cáo, không tự gửi báo cáo lỗi. Mở Dofin là chỉ có bạn và công việc.",
    ten: "Không theo dõi", nguon: "Chính sách quyền riêng tư, mục 2", nhom: "Minh bạch" },
  { cau: "Đọc hóa đơn theo Nghị định 254/2026/NĐ-CP và Thông tư 91/2026/TT-BTC, áp dụng từ ngày 01/07/2026.",
    ten: "Theo quy định hiện hành", nguon: "Chính sách quyền riêng tư, mục 3", nhom: "Pháp lý" },
];

export function CamKet() {
  return (
    <section id="cam-ket" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10">
      <div className="grid md:grid-cols-3 gap-6">
        {CAM_KET.map((c, i) => (
          <motion.figure key={c.ten} {...hien(i * 0.1)} className="liquid-glass rounded-2xl p-6 flex flex-col">
            <blockquote className="text-sm text-white/80 leading-[1.6] flex-1">“{c.cau}”</blockquote>
            <figcaption className="mt-6 pt-5 border-t border-white/10">
              <p className="text-sm font-semibold">{c.ten}</p>
              <p className="text-xs text-white/50">{c.nguon}</p>
              <p className="mt-2 text-xs text-white font-semibold tracking-wide uppercase">{c.nhom}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
