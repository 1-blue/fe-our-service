"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import {
  XMarkIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import Button from "#/components/atoms/Button";
import type { ModalIconType } from "#/types";

interface Props {
  /** 기본 모달 타입 ( 아이콘 렌더링 ) */
  iconType?: ModalIconType;
  /** 기본 모달 제목 */
  title?: string;
  /** 기본 모달 내용 */
  content?: string;
  /** 기본 모달 확인 버튼 */
  confirm?: {
    label?: string;
    onClick: () => void;
  };
  /** 기본 모달 취소 버튼 */
  cancel?: {
    label?: string;
    onClick?: () => void;
  };

  /** 정해진 디자인 외에 커스텀으로 사용하는 경우를 위한 값 */
  custom?: {
    /**
     * 커스텀 모달의 상단부
     * @default undefined
     **/
    header?: React.ReactNode;
    /**
     * 커스텀 모달의 컨텐츠
     * @default undefined
     **/
    body?: React.ReactNode;
    /**
     * 커스텀 모달의 하단부
     * @default undefined
     **/
    footer?: React.ReactNode;
  };

  /**
   * 클래스명 ( `tailwindCss` )
   * @default ""
   */
  className?: string;
  /**
   * 배경 상태값 ( 반투명 / 불투명 )
   * @default false
   */
  isBlur?: boolean;
  /**
   * 외부 스크롤 금지 여부
   * @default false
   */
  noScroll?: boolean;
  /** 모달 닫기 함수 */
  closeModal: () => void;
}

/**
 * `framer-motion`과 `tailwindcss`를 사용하는 공용 모달
 *
 * @link [디자인 및 속성 참고 - Modal(Antd)](https://ant.design/components/modal)
 * @see `framer-motion`의 `layoutId="modal"`을 사용하면 더 멋진 애니메이션을 볼 수 있음
 * @example
 * <Modal
 *   header={<h1>모달 제목</h1>}
 *   footer={<footer>모달 푸터</footer>}
 *   closeModal={() => setShow(false)}
 *   isBlur
 * >
 *   <p>모달 내용</p>
 * </Modal>;
 */
const Modal: React.FC<Props> = ({
  iconType,
  title,
  content,
  confirm,
  cancel,
  custom,
  closeModal,
  className = "",
  isBlur = false,
  noScroll = false,
}) => {
  const modalRef = useRef<null | HTMLDivElement>(null);

  /** 모달 외부 클릭하면 실행할 핸들러 ( 모달 닫힘 ) */
  const onClickOutside: React.MouseEventHandler<HTMLElement> = (e) => {
    if (!modalRef.current) return;
    if (!(e.target instanceof HTMLElement)) return;
    if (modalRef.current.contains(e.target)) return;

    closeModal();
  };

  /** 모달이 열려 있는 경우 스크롤 금지 */
  useEffect(() => {
    if (!noScroll) return;

    document.body.style.overflow = "hidden";

    return () => void (document.body.style.overflow = "auto");
  }, [noScroll]);

  return (
    <aside
      className={twMerge(
        "fixed inset-0 z-[1] flex flex-col items-center pt-[10%] shadow-md",
        "before:fixed before:inset-0 before:-z-[1] before:bg-black/70 before:content-['']",
        isBlur && "before:backdrop-blur-sm",
      )}
      onClick={onClickOutside}
    >
      <motion.div
        ref={modalRef}
        className={twMerge(
          "relative min-w-[300px] max-w-[500px] rounded-md bg-white px-6 py-4 text-black",
          className,
        )}
        layoutId="modal"
      >
        <XMarkIcon
          role="button"
          className="absolute right-4 top-3 h-6 w-6 stroke-[3px] text-gray-500 transition-all hover:scale-110"
          onClick={closeModal}
        />
        {/* 상단 */}
        {custom?.header ? (
          <>{custom.header}</>
        ) : (
          <section className="flex items-center gap-1.5">
            {iconType === "info" && (
              <InformationCircleIcon className="w-10 self-start text-green-500" />
            )}
            {iconType === "success" && (
              <CheckCircleIcon className="w-10 self-start text-blue-500" />
            )}
            {iconType === "warning" && (
              <ExclamationCircleIcon className="w-10 self-start text-yellow-500" />
            )}
            {iconType === "error" && (
              <XCircleIcon className="w-10 self-start text-red-500" />
            )}
            <h3 className="mr-10 text-xl font-bold">{title}</h3>
          </section>
        )}

        {/* 중단 */}
        {custom?.body ? (
          <>{custom.body}</>
        ) : (
          <section>
            <p className="whitespace-pre">{content}</p>
          </section>
        )}

        {/* 하단 */}
        <section className="flex">
          {custom?.footer ? (
            <>{custom.footer}</>
          ) : (
            <section className="ml-auto flex gap-3" onClick={closeModal}>
              {cancel && (
                <Button
                  type="button"
                  onClick={cancel.onClick}
                  className="rounded-md border-sub-300 text-xs font-bold text-sub-400"
                >
                  {cancel.label}
                </Button>
              )}
              <Button
                primary
                fill
                type="button"
                onClick={confirm?.onClick}
                className="rounded-md text-xs font-bold"
              >
                {confirm?.label || "확인"}
              </Button>
            </section>
          )}
        </section>
      </motion.div>
    </aside>
  );
};

export default Modal;
