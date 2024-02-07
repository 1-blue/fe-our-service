import "#/css/tailwindcss.css";

import Nav from "#/layout/Nav";
import Header from "#/layout/Header";
import Main from "#/layout/Main";
import Footer from "#/layout/Footer";

import type { Metadata } from "next";

export const metadata: Metadata = {};

interface Props {
  /** 로그인 모달 */
  authModal: React.ReactElement;
}

const RootLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  authModal,
}) => {
  return (
    <html lang="ko">
      <head>
        <title>세상에 없는 서비스</title>
      </head>
      <body className="min-h-screen flex flex-col text-white">
        <div className="flex-1 flex">
          <Nav />
          <div className="flex-1 flex flex-col">
            <Header />
            <Main>{children}</Main>
          </div>
        </div>
        <Footer />

        {/* 로그인 모달 */}
        {authModal}
      </body>
    </html>
  );
};

export default RootLayout;
