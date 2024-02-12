import { render } from "@testing-library/react";

import ToastProvider from "#/providers/ToastProvider";

const renderWithProviders = (ui: React.ReactElement) => {
  const Wrapper = ({ children }: React.PropsWithChildren<{}>) => {
    return (
      <>
        <ToastProvider>{children}</ToastProvider>

        {/* 토스트 포탈 */}
        <aside
          id="toast-root"
          className="fixed left-1/2 my-4 top-0 flex flex-col gap-4 -translate-x-1/2 z-[999]"
        />
      </>
    );
  };

  return render(ui, { wrapper: Wrapper });
};

export default renderWithProviders;
