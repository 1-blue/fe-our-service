"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { LightBulbIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";
import Button from "#/components/atoms/Button";
import type { Snackbar } from "#/types";

interface Prop extends Snackbar {
  /** 스낵바 닫는 함수 ( 메모리에서 제거 ) */
  closeSnackbar: (id: string) => void;
}

/** `zustand` & `React.Portal` / `framer-motion` & `tailwindcss`를 사용하는 공용 스낵바 */
const Snackbar: React.FC<Prop> = ({
  id = uuidv4(),
  message,
  closeSnackbar,
  action,
  timer = 5000,
}) => {
  const [isShow, setIsShow] = useState(true);

  /** 애니메이션이 적용되게 닫는 함수 */
  const closeWithAnimation = useCallback(() => {
    setIsShow(false);

    // 종료 애니메이션을 수행하기 위함 ( 넉넉하게 )
    setTimeout(() => closeSnackbar(id), 5000);
  }, [closeSnackbar, id]);

  useEffect(() => {
    setTimeout(closeWithAnimation, timer);
  }, [closeWithAnimation, timer]);

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          className={twMerge(
            "inline-flex gap-6 justify-between items-center px-4 py-2.5 bg-main-500 text-white rounded-md shadow-md"
          )}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          <div className="flex gap-1">
            <LightBulbIcon className="w-6 h-6" />
            <span className="whitespace-pre-wrap text-lg font-bold">
              {message}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <Button
              type="button"
              onClick={() => {
                action.func();
                closeWithAnimation();
              }}
              className="px-1.5 py-0.5 rounded-md text-sm"
            >
              {action.name}
            </Button>
            <XMarkIcon
              role="button"
              className="w-6 h-6"
              onClick={closeWithAnimation}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Snackbar;
