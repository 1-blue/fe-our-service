import { render, screen } from "@testing-library/react";

import Badge from "./index";
import Button from "#/components/atoms/Button";

describe("🚀 공용 뱃지 컴포넌트 테스트", () => {
  test("텍스트 뱃지가 렌더링 되는지?", () => {
    render(
      <>
        <Badge text="텍스트 뱃지" />
        <Badge
          text={<div className="font-bold text-2xl">텍스트 칠드런 뱃지</div>}
        />
      </>
    );

    expect(screen.getByText("텍스트 뱃지")).toBeInTheDocument();
    expect(screen.getByText("텍스트 칠드런 뱃지")).toBeInTheDocument();
  });
  test("children 뱃지가 렌더링 되는지?", () => {
    render(
      <Badge>
        <Button>칠드런 뱃지</Button>
      </Badge>
    );

    expect(screen.getByText("칠드런 뱃지")).toBeInTheDocument();
  });
  test("숫자 뱃지가 렌더링 되는지?", () => {
    render(<Badge count={123} />);

    expect(screen.getByText("123")).toBeInTheDocument();
  });
  test("숫자 뱃지의 최댓값(overflowCount)이 동작하는지?", () => {
    render(<Badge count={10_000} />);

    expect(screen.getByText("999+")).toBeInTheDocument();
  });
});
