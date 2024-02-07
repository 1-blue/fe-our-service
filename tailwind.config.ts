import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /** 구분선색상 */
        contour: "#1f2937",
        /** 배경색상 */
        bg: {
          /** 1 depth color */
          "depth-1": "#000505",
          /** 2 depth color */
          "depth-2": "#050A0A",
        },
        /** 글자색상 */
        text: {
          light: "#e5e7eb",
          default: "#9ca3af",
          dark: "#4b5563",
        },
        /** 라인색상 */
        line: {
          light: "#e5e7eb",
          default: "#9ca3af",
          dark: "#4b5563",
        },

        /** 서브색상 */
        sub: {
          "50": "#F9FAFB",
          "100": "#F3F4F6",
          "200": "#E5E7EB",
          "300": "#D1D5DB",
          "400": "#9CA3AF",
          "500": "#6B7280",
          "600": "#4B5563",
          "700": "#374151",
          "800": "#1F2937",
          "900": "#111827",
          "950": "#030712",
        },
        /** 메인색상 */
        main: {
          "50": "#F0F9FF",
          "100": "#DBEAFE",
          "200": "#BFDBFE",
          "300": "#93C5FD",
          "400": "#60A5FA",
          "500": "#3B82F6",
          "600": "#2563EB",
          "700": "#1D4ED8",
          "800": "#1E40AF",
          "900": "#1E3A8A",
          "950": "#172554",
        },
        /** 특수 색상 */
        special: {
          "50": "#EEF2FF",
          "100": "#E0E7FF",
          "200": "#C7D2FE",
          "300": "#A5B4FC",
          "400": "#818CF8",
          "500": "#6366F1",
          "600": "#4F46E5",
          "700": "#4338CA",
          "800": "#3730A3",
          "900": "#312E81",
          "950": "#1E1B4B",
        },
      },
    },
  },
  plugins: [],
};
export default config;
