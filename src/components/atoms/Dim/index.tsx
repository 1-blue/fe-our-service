import { twJoin } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * 흐림 효과를 적용할지 여부
   * @default false
   */
  isBlur?: boolean;
}

const Dim: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  isBlur = false,
  className,
  ...props
}) => {
  return (
    <aside
      data-testid="dim"
      {...props}
      className={twJoin(
        "fixed inset-0 bg-black/70",
        isBlur && "backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </aside>
  );
};

export default Dim;
