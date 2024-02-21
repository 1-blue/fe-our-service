import { render, screen } from "@testing-library/react";
import { HomeIcon } from "@heroicons/react/24/outline";

import Avatar from "./index";

describe("🚀 공용 아바타 컴포넌트 테스트", () => {
  test("텍스트 아바타가 렌더링 되는지?", () => {
    render(<Avatar text="Apple" />);

    expect(screen.getByText("A")).toBeInTheDocument();
  });
  test("아이콘 아바타가 렌더링 되는지?", () => {
    const { container } = render(<Avatar icon={<HomeIcon />} />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });
  test("이미지 아바타가 렌더링 되는지?", () => {
    render(
      <Avatar imagePath="https://avatars.githubusercontent.com/u/63289318?v=4" />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
