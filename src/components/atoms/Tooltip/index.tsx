"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Props {
  /** 툴팁의 본체인 엘리먼트 */
  children: React.ReactNode;
  /** 툴팁에 넣을 요소 */
  element: React.ReactNode;
  /** 툴팁 위치 */
  placement?:
    | "top-left"
    | "top"
    | "top-right"
    | "right-top"
    | "right"
    | "right-bottom"
    | "bottom-right"
    | "bottom"
    | "bottom-left"
    | "left-bottom"
    | "left"
    | "left-top";
  /** 애니메이션으로 움직일 거리 ( 툴팁 크기 기준으로 `%` ) */
  moveDistance?: number;
  /** 툴팁에 적용할 `className` */
  className?: string;
}

/**
 * `framer-motion`과 `tailwindcss`를 사용하는 공용 아바타
 * ( 우선순위: `text` > `icon` > `imagePath` )
 *
 * @link [디자인 및 속성 참고 - Tooltip(Antd)](https://ant.design/components/tooltip)
 * @example
 * <Tooltip element="Default" placement="bottom-right">
 *   <Button className="whitespace-pre" loading primary>
 *     Default
 *   </Button>
 * </Tooltip>;
 *
 */
const Tooltip: React.FC<Props> = ({
  children,
  element,
  placement = "top",
  moveDistance = 30,
  className,
}) => {
  const [isHover, setISHover] = useState(false);

  const variants = useMemo<Variants>(() => {
    /** 어떤 위치가 중점인지 확인하는 변수 */
    const isStartsWith = {
      top: placement.startsWith("top"),
      right: placement.startsWith("right"),
      bottom: placement.startsWith("bottom"),
      left: placement.startsWith("left"),
    };

    /** `framer-motion`의 특정 값마다 실행할 애니메이션 값을 얻는 함수 */
    const getAnimateValue = (type: "initial" | "animate" | "exit") => {
      switch (type) {
        case "initial":
        case "exit":
          return {
            // top
            ...(placement === "top" && { x: "-50%" }),
            ...(isStartsWith.top && { y: "-100%" }),

            // right
            ...(placement === "right" && { y: "-50%" }),
            ...(isStartsWith.right && { x: "100%" }),

            // bottom
            ...(placement === "bottom" && { x: "-50%" }),
            ...(isStartsWith.bottom && { y: "100%" }),

            // left
            ...(placement === "left" && { y: "-50%" }),
            ...(isStartsWith.left && { x: "-100%" }),
          };
        case "animate":
          return {
            // top
            ...(placement === "top" && { x: "-50%" }),
            ...(isStartsWith.top && { y: (100 + moveDistance) * -1 + "%" }),

            // right
            ...(placement === "right" && { y: "-50%" }),
            ...(isStartsWith.right && { x: 100 + moveDistance + "%" }),

            // bottom
            ...(placement === "bottom" && { x: "-50%" }),
            ...(isStartsWith.bottom && { y: 100 + moveDistance + "%" }),

            // left
            ...(placement === "left" && { y: "-50%" }),
            ...(isStartsWith.left && { x: (100 + moveDistance) * -1 + "%" }),
          };
      }
    };

    return {
      initial: {
        ...getAnimateValue("initial"),
        opacity: 0,
      },
      animate: {
        ...getAnimateValue("animate"),
        opacity: 1,
        transition: { duration: 0.4 },
      },
      exit: {
        ...getAnimateValue("exit"),
        opacity: 0,
        transition: { duration: 0.4 },
      },
    };
  }, [placement, moveDistance]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setISHover(true)}
      onMouseLeave={() => setISHover(false)}
    >
      {children}

      <AnimatePresence>
        {isHover && (
          <motion.div
            className={twMerge(
              "absolute px-4 py-1.5 bg-main-500 rounded-md z-[1] whitespace-nowrap",
              className,
              // top
              placement.startsWith("top") && "top-0",
              placement === "top-left" && "left-0",
              placement === "top" && "left-1/2",
              placement === "top-right" && "right-0",

              // right
              placement.startsWith("right") && "right-0",
              placement === "right-top" && "top-0",
              placement === "right" && "top-1/2",
              placement === "right-bottom" && "bottom-0",

              // bottom
              placement.startsWith("bottom") && "bottom-0",
              placement === "bottom-left" && "left-0",
              placement === "bottom" && "left-1/2",
              placement === "bottom-right" && "right-0",

              // left
              placement.startsWith("left") && "left-0",
              placement === "left-top" && "top-0",
              placement === "left" && "top-1/2",
              placement === "left-bottom" && "bottom-0"
            )}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {element}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
