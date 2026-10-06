import { fileURLToPath } from "node:url";

// Trỏ thẳng tệp cấu hình: Tailwind mặc định tìm theo thư mục đang chạy lệnh, không theo dự án.
export default {
  plugins: {
    tailwindcss: { config: fileURLToPath(new URL("./tailwind.config.js", import.meta.url)) },
    autoprefixer: {},
  },
};
