/** `tailwindCss`의 기본 색상명 */
export type TWDefaultColorName =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

/** `tailwindCss`의 값 */
export type TWDefaultValue =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";

/** `tailwindCss`의 사이즈값 */
export type TWDefaultSizeName =
  | "xs"
  | "sm"
  | "base"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

/** `tailwindCss`의 커스텀 색상명 */
export type TWCustomColorName = "main" | "sub" | "special";
/** `tailwindCss` 현재 사용하는 색상명  */
export type TWColorName = TWDefaultColorName | TWCustomColorName;
