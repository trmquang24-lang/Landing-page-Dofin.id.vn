import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TAI_BAN_MOI } from "./tai-ban-moi.js";

export default defineConfig({
  plugins: [
    react(),
    {
      // VibeHost chạy `vite preview` thay vì server.js, nên đường tải ẩn phải sống được cả ở đây.
      name: "tai-ban-moi",
      configurePreviewServer(server) {
        server.middlewares.use("/tai-ban-moi", (_req, res) => {
          res.statusCode = 302;
          res.setHeader("Location", TAI_BAN_MOI);
          res.setHeader("Cache-Control", "no-cache");
          res.end();
        });
      },
    },
  ],
  // vite preview chặn mọi tên miền lạ (trả 403), kể cả tên miền thật của trang.
  preview: { allowedHosts: ["dofin.id.vn", ".dofin.id.vn"] },
});
