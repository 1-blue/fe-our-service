/** 공용 레이아웃 메인 */
const Main: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <main className="flex flex-1 justify-center border-b-2 border-contour bg-depth-1 p-4">
      {children}
    </main>
  );
};

export default Main;
