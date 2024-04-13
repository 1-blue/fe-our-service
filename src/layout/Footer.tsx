import Icon from "#/components/atoms/Icon";
import Link from "next/link";
import { twJoin } from "tailwind-merge";

const ICONS = [
  {
    label: "GitHub",
    path: "https://github.com/1-blue",
    Icon: <Icon name="GitHub" size={50} fill="#e5e7eb" />,
  },
  {
    label: "Email",
    path: "mailto:1-blue98@naver.com",
    Icon: <Icon name="Mail" size={50} fill="#e5e7eb" />,
  },
];

interface Props {
  /**
   * `tailwindcss`에 사용할 `calssName`
   * @default ""
   */
  className?: string;
}

/** 공용 레이아웃 푸터 */
const Footer: React.FC<Props> = ({ className = "" }) => {
  return (
    <footer
      className={twJoin(
        "flex flex-col items-center space-y-6 bg-depth-2 px-24 py-12 pb-8",
        className,
      )}
    >
      <section className="flex space-x-16">
        {ICONS.map(({ label, path, Icon }) => (
          <Link
            key={path}
            href={path}
            target="_blnak"
            className="flex flex-col space-y-1 px-4"
          >
            {Icon}
            <span className="inline-block text-center text-text-light">
              {label}
            </span>
          </Link>
        ))}
      </section>
      <div className="h-0.5 w-full bg-contour" />
      <section className="space-x-4 text-text-dark">
        <span>Copyright ©2024 1-blue</span>
        <span>|</span>
        <span>박상은</span>
      </section>
    </footer>
  );
};

export default Footer;
