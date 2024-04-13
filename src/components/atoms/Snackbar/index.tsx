"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { LightBulbIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";
import Button from "#/components/atoms/Button";
import type { Snackbar as SnackbarType } from "#/types";

interface Prop extends SnackbarType {
  /** 스낵바 닫는 함수 ( 메모리에서 제거 ) */
  closeSnackbar: (id: string) => void;
}

/**
 * `zustand` & `React.Portal` / `framer-motion` & `tailwindcss`를 사용하는 공용 스낵바
 * @see `<SnackbarProvider />`를 통해서 사용되기 때문에 직접 사용할 필요 없음 ( `openSnackbar()` 사용 )
 * @example
 * const Component: React.FC = () => {
 *   const { openSnackbar } = useSnackbarStore();
 *
 *   const onClickSnackbar = () => {
 *     openSnackbar({
 *       message: "스낵바 메시지",
 *       action: { name: "스낵바 액션", func: () => {} },
 *     });
 *   };
 *
 *   return (
 *     <article>
 *       <button type="button" onClick={onClickSnackbar}>
 *         open snackbar
 *       </button>
 *     </article>
 *   );
 * };
 **/
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
            "inline-flex items-center justify-between gap-6 rounded-md bg-main-500 px-4 py-2.5 text-white shadow-md",
          )}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          <div className="flex gap-1">
            <LightBulbIcon className="h-6 w-6" />
            <span className="whitespace-pre-wrap text-lg font-bold">
              {message}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={() => {
                action.func();
                closeWithAnimation();
              }}
              className="rounded-md px-1.5 py-0.5 text-sm"
            >
              {action.name}
            </Button>
            <XMarkIcon
              role="button"
              className="h-6 w-6"
              onClick={closeWithAnimation}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Snackbar;
