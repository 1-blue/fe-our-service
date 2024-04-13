"use client";

import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"button"> {
  /** 로딩 스피너를 보여줄지 여부 */
  loading?: boolean;
  /** 내부를 색상으로 채울지 여부 */
  fill?: boolean;
  /** 로딩 스피너의 클래스네임 */
  spinnerClassName?: string;

  /** 기본 디자인 ( `main color` ) */
  primary?: boolean;
  /** 기본 디자인 ( `special color` ) */
  secondary?: boolean;
}

/**
 * `framer-motion`과 `tailwindcss`를 사용하는 공용 버튼
 * @example
 * <StoryButton primary>Primary</StoryButton>
 * <StoryButton fill loading>Fill</StoryButton>
 */
const Button: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
  loading,
  fill,
  spinnerClassName,
  primary,
  secondary,
  ...props
}) => {
  return (
    <motion.button
      {...props}
      className={twMerge(
        "group overflow-hidden relative px-3 py-1 flex justify-center items-center text-base text-text-light border-2 border-line-light rounded-sm transition-colors",
        primary &&
          "border-main-500 active:border-main-600 text-main-500 active:text-main-600",
        secondary &&
          "border-special-500 active:border-special-600 text-special-500 active:text-special-600",
        fill && "text-text-light hover:text-text-light active:text-text-light",
        fill &&
          !primary &&
          !secondary &&
          "bg-text-light text-depth-1 hover:text-depth-1 active:text-depth-1",
        fill && primary && "bg-main-500 active:bg-main-600",
        fill && secondary && "bg-special-500 active:bg-special-600",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {loading && (
        <div
          className={twMerge(
            "w-4 h-4 mr-2 border-[2.5px] border-line-light rounded-full animate-spin transition-colors",
            primary &&
              "border-main-500 group-hover:border-main-400 group-active:border-main-600",
            secondary &&
              "border-special-500 group-hover:border-special-400 group-active:border-special-600",
            fill &&
              "border-text-light group-hover:border-text-light group-active:border-text-light",
            fill &&
              !primary &&
              !secondary &&
              "border-depth-1 group-hover:border-depth-1 group-active:border-depth-1",
            spinnerClassName,
            "border-b-transparent group-hover:border-b-transparent group-active:border-b-transparent",
          )}
        />
      )}
      {children}
    </motion.button>
  );
};

export default Button;

/**
 * 스토리북 전용 버튼 컴포넌트
 * 스토리북에서 자동으로 `argTypes`를 추론해주는데 `HTMLMotionProps<"button">`의 추론을 막는 방법을 못찾아서 전용 컴포넌트를 따로 만듦
 * */
export const StoryButton: React.FC<
  React.PropsWithChildren<
    // `HTMLMotionProps<"button">` 제외
    Omit<Props, keyof HTMLMotionProps<"button">> &
      // `HTMLMotionProps<"button">`에서 몇가지 선택
      Pick<Props, "className" | "type">
  >
> = (props) => {
  return <Button {...props} />;
};
