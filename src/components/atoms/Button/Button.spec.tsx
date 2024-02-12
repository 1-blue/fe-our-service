import { render, fireEvent, screen } from "@testing-library/react";

import Button from "./index";

describe("🚀 공용 버튼 컴포넌트 테스트", () => {
  let onClick = jest.fn();
  let $button: HTMLButtonElement | null = null;

  beforeEach(() => {
    onClick = jest.fn();
    render(<Button onClick={onClick}>커스텀 버튼</Button>);
    $button = screen.getByText<HTMLButtonElement>("커스텀 버튼");
  });

  test("버튼 렌더링", () => {
    expect($button).toBeInTheDocument();
  });
  test("버튼 클릭 이벤트 확인", () => {
    if (!$button) throw new Error("버튼이 존재하지 않음");

    fireEvent.click($button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
