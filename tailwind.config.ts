import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /** 구분선색상 */
        contour: "#373E47",
        /** 배경색상 */
        depth: {
          "1": "#25272F",
          "2": "#23262C",
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

        /** 메인색상 */
        main: {
          "50": "#EEF2FF",
          "100": "#E0E7FF",
          "200": "#C7D2FE",
          "300": "#A5B4FC",
          "400": "#818CF8",
          "500": "#6366F1",
          "600": "#4F46E5",
          "700": "#4338CA",
          "800": "#3730A",
          "900": "#312E81",
          "950": "#1E1B4B",
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
        /** 특수 색상 */
        special: {
          "50": "#F0FDFA",
          "100": "#CCFBF1",
          "200": "#99F6E4",
          "300": "#5EEAD4",
          "400": "#2DD4BF",
          "500": "#14B8A6",
          "600": "#0D9488",
          "700": "#0F766E",
          "800": "#115E59",
          "900": "#134E4A",
          "950": "#042F2E",
        },
      },
      keyframes: {
        "ping-badge": {
          "75%": { transform: "scale(1.4)", opacity: "0" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
      },
      animation: {
        "ping-badge": "ping-badge 1s cubic-bezier(0, 0, 0.2, 1) infinite;",
      },
    },
  },
  plugins: [],
};
export default config;
