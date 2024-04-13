import { twMerge } from "tailwind-merge";

interface Props {
  /**
   * 클래스명 ( `tailwindCss` )
   * @default ""
   */
  className?: string;
}

/**
 * `framer-motion`과 `tailwindcss`를 사용하는 공용 스켈레톤 컴포넌트
 * @example
 * <Skeleton className="w-full h-10 rounded-md" />
 * <section className="flex flex-col gap-4 w-60">
 *   {Array(5)
 *     .fill(null)
 *     .map((_, i) => (
 *       <Skeleton key={i} className="w-full h-6" />
 *     ))}
 * </section>;
 */
const Skeleton: React.FC<Props> = ({ className = "" }) => {
  return (
    <div
      className={twMerge("animate-skeleton rounded-md bg-gray-500", className)}
      data-testid="skeleton"
    />
  );
};

export default Skeleton;
