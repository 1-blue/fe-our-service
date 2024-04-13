import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { twJoin } from "tailwind-merge";

interface Props {
  /** 남은 시간 ( ms ) */
  time: number;
  /** `tailwindCss`의 `className` */
  className?: string;
}

/** 회원가입 카운트다운 컴포넌트 */
const Countdown: React.FC<React.PropsWithChildren<Props>> = ({
  time,
  className,
  children,
}) => {
  const [targetDate, setTargetDate] = useState(
    new Date(new Date().getTime() + time)
  );
  const [currentDate, setCurrentDate] = useState(new Date());

  // 카운트 다운 초기화
  useEffect(() => setTargetDate(new Date(new Date().getTime() + time)), [time]);

  const tick = useCallback(() => setCurrentDate(new Date()), []);

  const timerId = useRef<null | NodeJS.Timeout>(null);

  // 1초마다 카운트 다운 변경
  useEffect(() => {
    timerId.current = setInterval(() => tick(), 1000);

    return () => void (timerId.current && clearInterval(timerId.current));
  }, [tick]);

  const countdownTime = targetDate.getTime() - currentDate.getTime();

  // 제한시간 초과 시 타이머 종료
  useEffect(() => {
    if (countdownTime > 0) return;
    if (!timerId.current) return;

    clearInterval(timerId.current);
  }, [countdownTime]);

  if (countdownTime <= 0) return <>{children}</>;

  return (
    <div className={twJoin("flex gap-3 items-center", className)}>
      <span className="text-xl">남은 시간: </span>
      <div className="flex gap-1 items-center">
        <span className="countdown font-mono text-4xl">
          <span
            style={
              {
                "--value": new Date(countdownTime).getMinutes(),
              } as CSSProperties
            }
          />
        </span>
        <span>분</span>
      </div>

      <div className="flex gap-1 items-center">
        <span className="countdown font-mono text-4xl">
          <span
            style={
              {
                "--value": new Date(countdownTime).getSeconds(),
              } as CSSProperties
            }
          />
        </span>
        <span>초</span>
      </div>
    </div>
  );
};

export default Countdown;
