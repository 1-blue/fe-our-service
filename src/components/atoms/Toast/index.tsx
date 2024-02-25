"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";
import type { Toast as ToastType } from "#/types";

interface Prop extends ToastType {
  /** 토스트 닫는 함수 ( 메모리에서 제거 ) */
  closeToast?: (id: string) => void;
  /** 클릭하면 토스트 닫히게 할지 결정하는 값 */
  closeOnClick?: boolean;
}

/**
 * `zustand` & `React.Portal` / `framer-motion` & `tailwindcss`를 사용하는 공용 토스트
 * @see `<ToastProvider />`를 통해서 사용되기 때문에 직접 사용할 필요 없음 ( `openToast()` 사용 )
 * @example
 * const Component: React.FC = () => {
 *   const { openToast } = useToastStore();
 *
 *   const onClickToast = () => {
 *     openToast({ message: "토스트 메시지" });
 *   };
 *
 *   return (
 *     <article>
 *       <button type="button" onClick={onClickToast}>
 *         open toast
 *       </button>
 *     </article>
 *   );
 * };
 **/
const Toast: React.FC<Prop> = ({
  message,
  closeToast,
  id = uuidv4(),
  type = "info",
  timer = 2000,
  closeOnClick = true,
}) => {
  const [isShow, setIsShow] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsShow(false);

      // 종료 애니메이션을 수행하기 위함 ( 넉넉하게 )
      if (!closeToast) return;
      setTimeout(() => closeToast(id), 5000);
    }, timer);
  }, [timer, closeToast, id]);

  /** 토스트 클릭 시 닫기 옵션 활성화 후 토스트 클릭하는 경우 닫는 함수 */
  const onClickCloseButton = useCallback(() => {
    if (!closeOnClick) return;
    if (!timerRef.current) return;

    closeOnClick && setIsShow(false);
    clearTimeout(timerRef.current);
  }, [closeOnClick]);

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          className={twMerge(
            "inline-flex gap-1 px-3 py-2 text-white rounded-md shadow-md",
            closeOnClick && "cursor-pointer",
            type === "info" && "bg-blue-500",
            type === "success" && "bg-green-500",
            type === "warning" && "bg-yellow-500",
            type === "error" && "bg-red-500"
          )}
          initial={{ y: "-100%", opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: "-100%", opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          onClick={onClickCloseButton}
        >
          {type === "info" && <InformationCircleIcon className="w-6 h-6" />}
          {type === "success" && <CheckCircleIcon className="w-6 h-6" />}
          {type === "warning" && <ExclamationCircleIcon className="w-6 h-6" />}
          {type === "error" && <XCircleIcon className="w-6 h-6" />}
          <span className="whitespace-pre-wrap">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
