import Icon from "#/components/atoms/Icon";
import Link from "next/link";

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

/** 공용 레이아웃 푸터 */
const Footer: React.FC = () => {
  return (
    <footer className="px-24 py-12 pb-16 flex flex-col items-center space-y-6 bg-depth-2">
      <section className="flex space-x-16">
        {ICONS.map(({ label, path, Icon }) => (
          <Link
            key={path}
            href={path}
            target="_blnak"
            className="px-4 flex flex-col space-y-1"
          >
            {Icon}
            <span className="inline-block text-center text-text-light">
              {label}
            </span>
          </Link>
        ))}
      </section>
      <div className="w-full h-0.5 bg-contour" />
      <section className="space-x-4 text-text-dark">
        <span>Copyright ©2024 1-blue</span>
        <span>|</span>
        <span>박상은</span>
      </section>
    </footer>
  );
};

export default Footer;
