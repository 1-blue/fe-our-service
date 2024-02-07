"use client";

import { useEffect } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

/** 전체 공용 에러 페이지 */
const GlobalError: React.FC<Props> = ({ error, reset }) => {
  useEffect(() => {
    console.error("🚀 error >> ", error);
  }, [error]);

  return (
    <div>
      <h2 className="bg-red-500 p-4">Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
};

export default GlobalError;
