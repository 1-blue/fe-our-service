import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import renderWithProviders from "#/test/renderWithProvider";

import useSnackbarStore from "#/store/snackbar";
import type { Snackbar } from "#/types";

describe("🚀 공용 스낵바 컴포넌트 테스트", () => {
  const ACTION_NAME = "스낵바 액션";
  const MOCK_FN = jest.fn();
  const action: Snackbar["action"] = {
    name: ACTION_NAME,
    func: MOCK_FN,
  };

  beforeEach(() => {
    renderWithProviders(<></>);
  });

  test("스낵바가 렌더링되는지?", async () => {
    const { openSnackbar } = useSnackbarStore.getState();

    act(() => openSnackbar({ message: "공용 스낵바 - 1", timer: 50, action }));

    const $snackbar = await screen.findByText("공용 스낵바 - 1");

    expect($snackbar).toBeInTheDocument();
    expect($snackbar).not.toBeNull();
  });
  test("특정 시간이 지나면 사라지는지?", async () => {
    const { openSnackbar } = useSnackbarStore.getState();

    act(() => openSnackbar({ message: "공용 스낵바 - 2", timer: 50, action }));

    // 사라지는 애니메이션 시간을 고려해서 테스트
    await waitFor(
      () => {
        const $snackbar = screen.queryByText("공용 스낵바 - 2");

        expect($snackbar).toBeNull();
        expect($snackbar).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
  test("스낵바 닫기 함수가 동작하는지?", async () => {
    const SNACKBAR_ID = "keyboardcat";
    const { openSnackbar, closeSnackbar } = useSnackbarStore.getState();

    act(() =>
      openSnackbar({
        id: SNACKBAR_ID,
        message: "공용 스낵바 - 3",
        timer: 500_000,
        action,
      })
    );

    act(() => closeSnackbar(SNACKBAR_ID));

    // 사라지는 애니메이션 시간을 고려해서 테스트
    await waitFor(
      () => {
        const $snackbar = screen.queryByText("공용 스낵바 - 3");

        expect($snackbar).toBeNull();
        expect($snackbar).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
  test("스낵바 액션 함수가 동작하는지?", async () => {
    const { openSnackbar } = useSnackbarStore.getState();

    act(() => openSnackbar({ message: "공용 스낵바 - 3", timer: 900, action }));

    const $snackbarActionButton = await screen.findByText(ACTION_NAME);

    fireEvent.click($snackbarActionButton);

    expect(MOCK_FN).toHaveBeenCalledTimes(1);
  });
});
