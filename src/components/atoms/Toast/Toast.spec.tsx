import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import renderWithProviders from "#/test/renderWithProvider";

import useToastStore, { ToastStore } from "#/store/toast";

describe("🚀 공용 토스트 컴포넌트 테스트", () => {
  let toastState: ToastStore;

  beforeEach(() => {
    const ToastWrapper = () => {
      toastState = useToastStore((store) => store);

      return <></>;
    };

    act(() => renderWithProviders(<ToastWrapper />));
  });

  test("토스트가 렌더링되는지?", async () => {
    toastState.openToast({ message: "공용 토스트 - 1", timer: 50 });
    const $toast = await screen.findByText("공용 토스트 - 1");

    expect($toast).toBeInTheDocument();
  });
  test("특정 시간이 지나면 사라지는지?", async () => {
    toastState.openToast({ message: "공용 토스트 - 2", timer: 50 });

    // 사라지는 애니메이션 시간을 고려해서 테스트
    await waitFor(
      () => {
        expect(screen.queryByText("공용 토스트 - 2")).toBeNull();
      },
      { timeout: 1000 }
    );
  });
  test("토스트 닫기 함수가 동작하는지?", async () => {
    const TOAST_ID = "keyboardcat";
    toastState.openToast({
      id: TOAST_ID,
      message: "공용 토스트 - 3",
      timer: 100_000,
    });
    toastState.closeToast(TOAST_ID);

    // 사라지는 애니메이션 시간을 고려해서 테스트
    await waitFor(
      () => {
        expect(screen.queryByText("공용 토스트 - 3")).toBeNull();
      },
      { timeout: 1000 }
    );
  });
  test("클릭하면 사라지는지?", async () => {
    toastState.openToast({ message: "공용 토스트 - 4", timer: 100_000 });

    // 토스트 클릭
    fireEvent.click(await screen.findByText("공용 토스트 - 4"));

    // 사라지는 애니메이션 시간을 고려해서 테스트
    await waitFor(
      () => {
        expect(screen.queryByText("공용 토스트 - 4")).toBeNull();
      },
      { timeout: 1000 }
    );
  });
});
