import { motion } from "motion/react";
import {
  Archive, Bell, Check, FileText, FolderOpen, LayoutGrid, ListChecks, Minus, MoreHorizontal, Paperclip,
  Plus, Printer, Receipt, Search, Square, Trash2, Wallet, X,
} from "lucide-react";
import { SectionEyebrow } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;
const hien = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, delay, ease: EASE },
});

/* ---------- Ảnh dựng giao diện Dofin (dữ liệu mẫu, không phải khách hàng thật) ---------- */
const MENU = [
  { ten: "Tổng quan", icon: LayoutGrid },
  { ten: "Hóa đơn", icon: Receipt, so: 12 },
  { ten: "Tờ khai thuế", icon: FileText },
  { ten: "Hồ sơ", icon: FolderOpen, so: 8, dangChon: true },
  { ten: "Công nợ", icon: Wallet, so: 3 },
  { ten: "Nhắc hạn", icon: Bell, so: 2 },
];
const TRANG_THAI = [["Chờ chứng từ", "#A4F4FD"], ["Đang làm", "#00d2ff"], ["Hoàn tất", "#10b981"], ["Quá hạn", "#f59e0b"]];
const HO_SO = [
  { ten: "Công ty TNHH Minh An", tieuDe: "Hợp đồng cung cấp vật tư Quý 4", tom: "Còn thiếu 1 chứng từ: biên bản giao hàng", gio: "9:41", moi: true, chon: true },
  { ten: "Công ty CP Sao Việt", tieuDe: "Thanh toán đợt 2 thiết bị văn phòng", tom: "Đủ chứng từ, chờ xác nhận đã thanh toán", gio: "8:12", moi: true },
  { ten: "Vận tải Hòa Bình", tieuDe: "Dịch vụ vận chuyển tháng 9", tom: "Đã nhận hóa đơn điện tử số 00001284", gio: "Hôm qua" },
  { ten: "Văn phòng Ngọc Lan", tieuDe: "Thuê văn phòng năm 2026", tom: "Nhắc hạn: gia hạn hợp đồng ngày 15/10", gio: "Hôm qua" },
  { ten: "Thiết bị Phúc Thịnh", tieuDe: "Mua máy in và mực", tom: "Hoàn tất, bộ chứng từ đã lưu đủ", gio: "Thứ Hai" },
  { ten: "Kê khai thuế", tieuDe: "Tờ khai 01/GTGT Quý 3", tom: "Đã nhập tờ khai, kỳ Quý 3 năm 2026", gio: "Thứ Hai" },
];
const CHUNG_TU = [["Hợp đồng kinh tế", true], ["Hóa đơn GTGT", true], ["Phiếu xuất kho", true], ["Ủy nhiệm chi", true], ["Biên bản giao hàng", false]] as const;

export function AnhDungApp() {
  return (
    <section id="tinh-nang" className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl">
        <div className="h-10 px-4 flex items-center justify-between border-b border-white/10">
          <span className="w-16" />
          <span className="text-xs text-white/50">Dofin - Hồ sơ</span>
          <span className="w-16 flex justify-end gap-3 text-white/40">
            <Minus className="w-3.5 h-3.5" /><Square className="w-3 h-3" /><X className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="grid grid-cols-12 h-[520px] text-left">
          <aside className="hidden md:block col-span-3 border-r border-white/10 bg-black/30 p-4">
            <div className="w-full flex items-center justify-center gap-2 rounded-lg bg-white text-black text-xs font-semibold px-3 py-2">
              <Plus className="w-3.5 h-3.5" /> Tạo hồ sơ mới
            </div>
            <nav className="mt-5 space-y-0.5">
              {MENU.map(({ ten, icon: Icon, so, dangChon }) => (
                <div key={ten} className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs ${dangChon ? "bg-white/10 text-white" : "text-white/60"}`}>
                  <Icon className="w-3.5 h-3.5" /><span className="flex-1">{ten}</span>
                  {so && <span className="text-white/40">{so}</span>}
                </div>
              ))}
            </nav>
            <p className="mt-6 px-2.5 text-[10px] uppercase tracking-wider text-white/40">Trạng thái</p>
            <div className="mt-2 space-y-1">
              {TRANG_THAI.map(([ten, mau]) => (
                <div key={ten} className="flex items-center gap-2.5 px-2.5 py-1 text-xs text-white/60">
                  <span className="w-2 h-2 rounded-full" style={{ background: mau }} />{ten}
                </div>
              ))}
            </div>
          </aside>
          <div className="col-span-12 md:col-span-4 border-r border-white/10 flex flex-col min-w-0">
            <div className="h-11 px-4 flex items-center gap-2 border-b border-white/10 text-xs text-white/40">
              <Search className="w-3.5 h-3.5" /> Tìm hồ sơ, đối tác, số hóa đơn
            </div>
            <div className="overflow-hidden">
              {HO_SO.map((h) => (
                <div key={h.tieuDe} className={`px-4 py-3 border-b border-white/5 ${h.chon ? "bg-white/[0.06]" : ""}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs truncate ${h.moi ? "font-semibold text-white" : "text-white/70"}`}>{h.ten}</span>
                    <span className="text-[10px] text-white/40 shrink-0">{h.gio}</span>
                  </div>
                  <p className={`mt-0.5 text-xs truncate ${h.moi ? "text-white/90" : "text-white/60"}`}>{h.tieuDe}</p>
                  <p className="mt-0.5 text-[11px] text-white/40 truncate">{h.tom}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:flex col-span-5 flex-col min-w-0">
            <div className="h-11 px-4 flex items-center justify-between border-b border-white/10 text-white/50">
              <div className="flex gap-1">
                {[Paperclip, Printer, Archive, Trash2].map((Icon, i) => (
                  <span key={i} className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/5"><Icon className="w-3.5 h-3.5" /></span>
                ))}
              </div>
              <MoreHorizontal className="w-4 h-4" />
            </div>
            <div className="p-5 overflow-hidden">
              <h3 className="text-sm font-semibold">Hợp đồng cung cấp vật tư Quý 4</h3>
              <div className="mt-3 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#0B2551] flex items-center justify-center text-[10px] font-semibold">MA</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white">Công ty TNHH Minh An</p>
                  <p className="text-[10px] text-white/40">HS-2026-0142, tạo hôm nay</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-[#00d2ff]">Đang làm</span>
              </div>
              <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#A4F4FD]"><ListChecks className="w-3.5 h-3.5" /> Tình trạng bộ chứng từ</p>
                <p className="mt-1.5 text-xs text-white/70 leading-[1.6]">Đủ 4 trên 5 chứng từ. Còn thiếu biên bản giao hàng. Việc tiếp theo: xác nhận đã giao hàng.</p>
              </div>
              <ul className="mt-4 space-y-2">
                {CHUNG_TU.map(([ten, du]) => (
                  <li key={ten} className="flex items-center gap-2.5 text-xs">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center ${du ? "bg-white/15" : "border border-dashed border-white/30"}`}>
                      {du && <Check className="w-2.5 h-2.5" />}
                    </span>
                    <span className={du ? "text-white/80" : "text-white/40"}>{ten}</span>
                    {!du && <span className="ml-auto text-[10px] text-[#f59e0b]">Còn thiếu</span>}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-[11px] text-white/60">
                <Paperclip className="w-3 h-3" /> hoa-don-00001284.xml
              </span>
            </div>
          </div>
        </div>
      </motion.div>
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
