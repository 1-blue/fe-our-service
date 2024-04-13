import { twMerge } from "tailwind-merge";

import type { BadgeStatus } from "#/types";

type Color = "main" | "blue" | "emerald" | "amber" | "red";
type StatusColor = `bg-${Color}-500`;
const convertStatusToColor: Record<BadgeStatus, StatusColor> = {
  default: "bg-main-500",
  processing: "bg-blue-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
};
type StatusColorByAnimation = `after:bg-${Color}-500`;
const convertStatusToColorByAnimation: Record<
  BadgeStatus,
  StatusColorByAnimation
> = {
  default: "after:bg-main-500",
  processing: "after:bg-blue-500",
  success: "after:bg-emerald-500",
  warning: "after:bg-amber-500",
  error: "after:bg-red-500",
};

interface Props {
  /**
   * 클래스명 ( `tailwindCss` )
   * @default ""
   */
  className?: string;
  /**
   * 렌더링할 상태
   * @default default
   */
  status?: BadgeStatus;
  /**
   * 애니메이션 렌더링 여부 ( `ping` )
   * @default false
   */
  showAnimation?: boolean;
  /**
   * 단일로 사용할때 같이 렌더링할 텍스트
   * @default ""
   */
  text?: string | React.ReactNode;
  /**
   * 점형태의 뱃지인 경우
   * @default true
   */
  dot?: boolean;
  /**
   * 숫자형태의 뱃지인 경우 렌더링할 숫자
   * @default undefined
   * */
  count?: number;
  /**
   * 최대로 보여줄 숫자 ( 초과 시 `+` )
   * @default 999
   * */
  overflowCount?: number;
  /**
   * `count`가 `0`일때 보여줄지 여부
   * @default true
   * */
  showZero?: boolean;
}

/**
 * `framer-motion`과 `tailwindcss`를 사용하는 공용 뱃지
 * @link [디자인 및 속성 참고 - Antd](https://ant.design/components/badge)
 * @example
 * <Badge status="success" />
 * <Badge status="processing">
 *   <button type="button">버튼</button>
 * </Badge>
 *
 * @todo ping 애니메이션이 본체보다 앞쪽에서 발생하는 문제 수정 예정
 */
const Badge: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className = "",
  status = "default",
  showAnimation = false,
  text = "",
  dot = true,
  count,
  overflowCount = 999,
}) => {
  return (
    <div
      className={twMerge("relative inline-flex", text && "items-center gap-2")}
    >
      {children}
      <div
        className={twMerge(
          "relative",
          children && "absolute right-0 top-0 -translate-y-1/2 translate-x-1/2",
          convertStatusToColor[status],

          /** 점형태의 뱃지인 경우 */
          dot && "h-3 w-3 rounded-full p-0",

          /** 숫자형태의 뱃지인 경우 */
          count && "h-auto w-auto rounded-md px-1.5 py-0.5 text-xs font-medium",

          /** ping 애니메이션이 적용된 경우 */
          showAnimation && "after:absolute after:inset-0",
          showAnimation && convertStatusToColorByAnimation[status],
          /** 점형태에서 애니메이션이 적용된 경우 */
          showAnimation && dot && "after:animate-ping after:rounded-full",
          /** 숫자형태의 애니메이션인 경우 */
          count && showAnimation && "after:animate-ping-badge after:rounded-md",

          className,
        )}
      >
        {count && overflowCount < count ? `${overflowCount}+` : count}
      </div>
      {typeof text === "string" ? <span>{text}</span> : <>{text}</>}
    </div>
  );
};

export default Badge;
