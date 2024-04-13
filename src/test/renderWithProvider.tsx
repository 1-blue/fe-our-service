import { render } from "@testing-library/react";

import ToastProvider from "#/providers/ToastProvider";
import SnackbarProvider from "#/providers/SnackbarProvider";

const renderWithProviders = (ui: React.ReactElement) => {
  const Wrapper = ({ children }: React.PropsWithChildren<{}>) => {
    return (
      <>
        <SnackbarProvider>
          <ToastProvider>{children}</ToastProvider>
        </SnackbarProvider>

        {/* 토스트 포탈 */}
        <aside
          id="toast-root"
          className="fixed left-1/2 top-0 z-[999] my-4 flex -translate-x-1/2 flex-col gap-4"
        />
        {/* 스낵바 포탈 */}
        <aside
          id="snackbar-root"
          className="fixed bottom-0 left-1/2 z-[999] my-6 flex -translate-x-1/2 flex-col gap-4"
        />
      </>
    );
  };

  return render(ui, { wrapper: Wrapper });
};

export default renderWithProviders;
