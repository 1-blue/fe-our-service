"use client";

import { twMerge } from "tailwind-merge";
import type { Size, TWDefaultSizeName } from "#/types";

type twSize = `w-${number} h-${number} text-${TWDefaultSizeName}`;
const convertSize: Record<Size, twSize> = {
  xs: "w-6 h-6 text-sm",
  sm: "w-8 h-8 text-lg",
  base: "w-10 h-10 text-2xl",
  md: "w-12 h-12 text-3xl",
  lg: "w-14 h-14 text-4xl",
  xl: "w-16 h-16 text-5xl",
};

interface Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * 클래스명 ( `tailwindCss` )
   * @default ""
   */
  className?: string;
  /**
   * 둥글게 처리할지 여부
   * @default false
   */
  rounded?: boolean;
  /**
   * 아바타 사이즈
   * @default base
   */
  size?: Size;

  /**
   * 아바타로 사용할 텍스트
   * @default ""
   */
  text?: string;
  /**
   * 아바타로 사용할 텍스트의 길이
   * @default ""
   */
  overflowTextLength?: number;
  /**
   * 아바타로 사용할 아이콘
   * @default undefined
   */
  icon?: React.ReactNode;
  /**
   * 아바타로 사용할 이미지 URL
   * @default ""
   */
  imagePath?: string;
}

/**
 * `framer-motion`과 `tailwindcss`를 사용하는 공용 아바타
 * ( 우선순위: `imagePath` > `icon` > `text` )
 *
 * @link [디자인 및 속성 참고 - Avatar(Antd)](https://ant.design/components/avatar)
 * @example
 * <Avatar text="김독자" />
 * <Avatar className="bg-main-500" icon={<HomeIcon />} />
 * <Avatar imagePath="https://avatars.githubusercontent.com/u/63289318?v=4" />
 *
 * @todo <Image />와 <img /> 분기처리하기
 */
const Avatar: React.FC<Props> = ({
  className = "",
  rounded = false,
  size = "base",
  text = "",
  overflowTextLength = 1,
  icon,
  imagePath = "",
  ...restProps
}) => {
  return (
    <figure
      {...restProps}
      className={twMerge(
        "flex items-center justify-center overflow-hidden bg-gray-500",
        rounded ? "rounded-full" : "rounded-md",
        !imagePath && icon && "p-1",
        convertSize[size],
        className,
      )}
    >
      {/* `Next.js`에 등록한 이미지인 경우와 아닌 경우로 분리해서 처리하기 */}
      {imagePath && <img src={imagePath} alt="아바타 이미지" />}

      {!imagePath && icon && <>{icon}</>}

      {!imagePath && !icon && text && (
        <span>{text.slice(0, overflowTextLength)}</span>
      )}
    </figure>
  );
};

export default Avatar;
