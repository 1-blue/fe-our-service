import "#/css/tailwind.css";
import "#/css/global.css";

import PCNav from "#/layout/PCNav";
import MobileNav from "#/layout/MobileNav";
import Header from "#/layout/Header";
import Main from "#/layout/Main";
import Footer from "#/layout/Footer";
import ReactQueryProvider from "#/providers/ReactQueryProvider";
import ToastProvider from "#/providers/ToastProvider";
import SnackbarProvider from "#/providers/SnackbarProvider";

import type { Metadata } from "next";

export const metadata: Metadata = {};

interface Props {
  /** 로그인 모달 */
  logInModal: React.ReactElement;
}

const RootLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  logInModal,
}) => {
  return (
    <html lang="ko">
      <head>
        <title>세상에 없는 서비스</title>
      </head>
      <body className="relative min-h-screen flex flex-col text-white">
        <ReactQueryProvider>
          <ToastProvider>
            <SnackbarProvider>
              <div className="flex-1 flex">
                <PCNav className="hidden lg:flex" />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <Main>{children}</Main>
                </div>
              </div>
              <MobileNav className="lg:hidden" />
              <Footer className="mb-[75px] lg:mb-0" />
              {/* 로그인 모달 */}
              {logInModal}
            </SnackbarProvider>
          </ToastProvider>
        </ReactQueryProvider>

        {/* 토스트 포탈 */}
        <aside
          id="toast-root"
          className="fixed left-1/2 my-4 top-0 flex flex-col gap-4 -translate-x-1/2 z-[999]"
        />
        {/* 스낵바 포탈 */}
        <aside
          id="snackbar-root"
          className="fixed left-1/2 my-6 bottom-0 flex flex-col gap-4 -translate-x-1/2 z-[999]"
        />
      </body>
    </html>
  );
};

export default RootLayout;
