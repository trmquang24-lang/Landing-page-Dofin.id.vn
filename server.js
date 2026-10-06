// Máy chủ tĩnh cho VibeHost: chỉ dùng thư viện có sẵn của Node, phát thư mục dist đã build.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const GOC = join(fileURLToPath(new URL(".", import.meta.url)), "dist");
const KIEU = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8",
};

/* Đường tải ẩn cho nút "Kiểm tra cập nhật" trong app (app chỉ nhận link trên dofin.id.vn).
   Trỏ về bản Release mới nhất trên GitHub; mỗi bản phải đặt tên tệp đúng Cai-dat-Dofin.exe. */
const TAI_BAN_MOI = "https://github.com/trmquang24-lang/Landing-page-Dofin.id.vn/releases/latest/download/Cai-dat-Dofin.exe";

createServer(async (req, res) => {
  const duong = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (duong === "/tai-ban-moi") {
    res.writeHead(302, { Location: TAI_BAN_MOI, "Cache-Control": "no-cache" }).end();
    return;
  }
  // normalize + kiểm tiền tố: chặn "../" đọc tệp ngoài dist.
  let tep = normalize(join(GOC, duong));
  if (!tep.startsWith(GOC)) { res.writeHead(403).end(); return; }
  if (duong.endsWith("/")) tep = join(tep, "index.html");
  try {
    const noiDung = await readFile(tep);
    const bam = duong.startsWith("/assets/");   // tệp trong assets có mã băm trong tên, giữ lâu được
    res.writeHead(200, {
      "Content-Type": KIEU[extname(tep)] || "application/octet-stream",
      "Cache-Control": bam ? "public, max-age=31536000, immutable" : "no-cache",
    });
    res.end(noiDung);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Không tìm thấy trang.");
  }
}).listen(process.env.PORT || 3000, "0.0.0.0");
