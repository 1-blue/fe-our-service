import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import type { Snackbar } from "#/types";

export interface SnackbarStore {
  /** 현재 렌더링중인 스낵바들 */
  snackbars: Snackbar[];

  /** 스낵바 열기 함수 */
  openSnackbar: (args: Snackbar) => void;
  /** 스낵바 닫기 함수 */
  closeSnackbar: (id: string) => void;
}

/** 스낵바 관련 처리 훅 ( `zustand` ) */
const useSnackbarStore = create<SnackbarStore>()((set) => ({
  snackbars: [],
  openSnackbar({ id = uuidv4(), message, timer = 2000, action }) {
    set((prev) => ({
      snackbars: [...prev.snackbars, { id, message, timer, action }],
    }));
  },
  closeSnackbar(id) {
    set((prev) => ({
      snackbars: prev.snackbars.filter((snackbar) => snackbar.id !== id),
    }));
  },
}));

export default useSnackbarStore;
