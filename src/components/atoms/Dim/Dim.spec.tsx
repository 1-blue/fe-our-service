import { render, screen } from "@testing-library/react";

import Dim from "./index";

describe("🚀 공용 Dim 컴포넌트 테스트", () => {
  test("Dim이 렌더링 되는지?", () => {
    render(<Dim />);

    const $dim = screen.getByTestId("dim");

    expect($dim).toBeInTheDocument();
  });
});
