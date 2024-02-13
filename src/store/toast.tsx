import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { Toast } from "#/types";

export interface ToastStore {
  /** 현재 렌더링중인 토스트들 */
  toasts: Toast[];

  /** 토스트 열기 함수 */
  openToast: (args: Toast) => void;
  /** 토스트 닫기 함수 */
  closeToast: (id: string) => void;
}

/** 토스트 관련 처리 훅 ( `zustand` ) */
const useToastStore = create<ToastStore>()((set) => ({
  toasts: [],
  openToast({ id = uuidv4(), message, type = "info", timer = 2000 }) {
    set((prev) => ({ toasts: [...prev.toasts, { id, message, type, timer }] }));
  },
  closeToast(id) {
    set((prev) => ({ toasts: prev.toasts.filter((toast) => toast.id !== id) }));
  },
}));

export default useToastStore;
