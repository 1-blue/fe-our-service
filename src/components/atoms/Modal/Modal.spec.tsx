import { fireEvent, render, screen } from "@testing-library/react";

import Modal from "./index";

describe("🚀 공용 모달 컴포넌트 테스트", () => {
  describe("🚀 기본 모달", () => {
    test("기본 모달이 제대로 렌더링 되는지?", () => {
      const mockCloseModal = jest.fn();

      render(
        <Modal
          closeModal={mockCloseModal}
          title="기본 모달 제목"
          content="기본 모달 내용"
          cancel={{ label: "취소" }}
        />,
      );

      const $title = screen.getByText("기본 모달 제목");
      const $content = screen.getByText("기본 모달 내용");
      const $cancel = screen.getByRole("button", { name: "취소" });
      const $confirm = screen.getByRole("button", { name: "확인" });

      expect($title).toBeInTheDocument();
      expect($content).toBeInTheDocument();
      expect($cancel).toBeInTheDocument();
      expect($confirm).toBeInTheDocument();
    });
    test("기본 모달 취소 버튼이 동작하는지?", () => {
      const mockCloseModal = jest.fn();
      const mockCancel = jest.fn();

      render(
        <Modal
          closeModal={mockCloseModal}
          cancel={{ label: "기본 모달 취소", onClick: mockCancel }}
        />,
      );

      fireEvent.click(screen.getByRole("button", { name: "기본 모달 취소" }));

      expect(mockCancel).toHaveBeenCalledTimes(1);
    });
    test("기본 모달 확인 버튼이 동작하는지?", () => {
      const mockCloseModal = jest.fn();
      const mockConfirm = jest.fn();

      render(
        <Modal
          closeModal={mockCloseModal}
          confirm={{ label: "기본 모달 확인", onClick: mockConfirm }}
        />,
      );

      fireEvent.click(screen.getByRole("button", { name: "기본 모달 확인" }));

      expect(mockConfirm).toHaveBeenCalledTimes(1);
    });
  });
  describe("🚀 커스텀 모달", () => {
    test("커스텀 모달이 제대로 렌더링 되는지?", () => {
      const mockCloseModal = jest.fn();
      const mockCancel = jest.fn();
      const mockConfirm = jest.fn();

      render(
        <Modal
          closeModal={mockCloseModal}
          title="기본 모달 제목"
          content="기본 모달 내용"
          cancel={{ label: "취소" }}
          custom={{
            header: <div>커스텀 모달 제목</div>,
            body: <div>커스텀 모달 내용</div>,
            footer: (
              <div>
                <button type="button" onClick={mockCancel}>
                  커스텀 모달 취소
                </button>
                <button type="button" onClick={mockConfirm}>
                  커스텀 모달 확인
                </button>
              </div>
            ),
          }}
        />,
      );

      const $defaultTitle = screen.queryByText("기본 모달 제목");
      const $defaultContent = screen.queryByText("기본 모달 내용");
      const $defaultCancel = screen.queryByRole("button", { name: "취소" });
      const $defaultConfirm = screen.queryByRole("button", { name: "확인" });

      expect($defaultTitle).not.toBeInTheDocument();
      expect($defaultContent).not.toBeInTheDocument();
      expect($defaultCancel).not.toBeInTheDocument();
      expect($defaultConfirm).not.toBeInTheDocument();

      const $customTitle = screen.getByText("커스텀 모달 제목");
      const $customContent = screen.getByText("커스텀 모달 내용");
      const $customCancel = screen.getByRole("button", {
        name: "커스텀 모달 취소",
      });
      const $customConfirm = screen.getByRole("button", {
        name: "커스텀 모달 확인",
      });

      expect($customTitle).toBeInTheDocument();
      expect($customContent).toBeInTheDocument();
      expect($customCancel).toBeInTheDocument();
      expect($customConfirm).toBeInTheDocument();
    });
    test("커스텀 모달 취소 버튼이 동작하는지?", () => {
      const mockCloseModal = jest.fn();
      const mockCancel = jest.fn();

      render(
        <Modal
          closeModal={mockCloseModal}
          cancel={{ label: "기본 모달 취소", onClick: jest.fn() }}
          custom={{
            footer: (
              <div>
                <button type="button" onClick={mockCancel}>
                  커스텀 모달 취소
                </button>
              </div>
            ),
          }}
        />,
      );

      fireEvent.click(screen.getByRole("button", { name: "커스텀 모달 취소" }));

      expect(mockCancel).toHaveBeenCalledTimes(1);
    });
    test("커스텀 모달 확인 버튼이 동작하는지?", () => {
      const mockCloseModal = jest.fn();
      const mockConfirm = jest.fn();

      render(
        <Modal
          closeModal={mockCloseModal}
          cancel={{ label: "기본 모달 확인", onClick: jest.fn() }}
          custom={{
            footer: (
              <div>
                <button type="button" onClick={mockConfirm}>
                  커스텀 모달 확인
                </button>
              </div>
            ),
          }}
        />,
      );

      fireEvent.click(screen.getByRole("button", { name: "커스텀 모달 확인" }));

      expect(mockConfirm).toHaveBeenCalledTimes(1);
    });
  });
});
