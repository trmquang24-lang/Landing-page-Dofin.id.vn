/** @type {import('tailwindcss').Config} */
export default {
  // relative: dev server có thể chạy từ thư mục khác, đường dẫn phải tính theo tệp cấu hình này.
  content: { relative: true, files: ["./index.html", "./src/**/*.{ts,tsx}"] },
  theme: {
    extend: {
      colors: { brand: "#3D81E3" },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
