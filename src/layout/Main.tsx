/** 공용 레이아웃 메인 */
const Main: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <main className="flex-1 flex justify-center p-4 bg-depth-1 border-b-2 border-contour">
      {children}
    </main>
  );
};

export default Main;
