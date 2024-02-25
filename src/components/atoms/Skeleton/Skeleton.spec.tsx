import { render, screen } from "@testing-library/react";

import Skeleton from "./index";

describe("🚀 공용 스켈레톤 컴포넌트 테스트", () => {
  test("스켈레톤이 렌더링 되는지?", () => {
    render(<Skeleton />);

    const $skeleton = screen.getByTestId("skeleton");

    expect($skeleton).toBeInTheDocument();
  });
});
