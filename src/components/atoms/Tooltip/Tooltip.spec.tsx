import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import Tooltip from "./index";

describe("🚀 공용 툴팁 컴포넌트 테스트", () => {
  let $tooltip: HTMLElement | null = null;

  beforeEach(() => {
    render(
      <Tooltip element="툴팁에 넣을 요소" placement="top-left">
        공용 툴팁
      </Tooltip>
    );

    $tooltip = screen.getByText("공용 툴팁");
  });

  test("툴팁 렌더링", () => {
    expect($tooltip).toBeInTheDocument();
  });
  test("툴팁 MouseEnter 및 MouseLeave 확인", async () => {
    if (!$tooltip) throw new Error("툴팁이 존재하지 않음");

    // 초기에 렌더링 안되는지 확인
    expect(screen.queryByText("툴팁에 넣을 요소")).toBeNull();

    // mouseEnter 시 렌더링 되는지 확인
    fireEvent.mouseEnter($tooltip);
    expect(screen.getByText("툴팁에 넣을 요소")).toBeInTheDocument();

    // mouseLeave 시 렌더링 안되는지 확인
    fireEvent.mouseLeave($tooltip!);
    await waitFor(
      () => expect(screen.queryByText("툴팁에 넣을 요소")).toBeNull(),
      { timeout: 1000 }
    );
  });
});
