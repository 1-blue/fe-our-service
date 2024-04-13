import type { Meta, StoryObj } from "@storybook/react";

import Modal from "./index";
import Button from "#/components/atoms/Button";

const meta = {
  title: "Atoms/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    componentSubtitle: "공용 모달",
  },
  tags: ["autodocs"],
  args: {
    className: "flex flex-col gap-4",
    title: "기본 모달 제목",
    content: "기본 모달 내용",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
export const Cancel: Story = {
  args: {
    cancel: { label: "취소", onClick: () => alert("취소") },
    confirm: { label: "확인", onClick: () => alert("확인") },
  },
};
export const Type: Story = {
  args: {
    iconType: "success",
    cancel: { label: "취소", onClick: () => alert("취소") },
    confirm: { label: "확인", onClick: () => alert("확인") },
  },
};
export const Custom: Story = {
  args: {
    className: "flex flex-col gap-8",
    custom: {
      header: (
        <div>
          <b>커스텀 모달 제목</b>
        </div>
      ),
      body: (
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          velit tenetur corrupti nostrum ea architecto maiores, nobis incidunt
          expedita eius repudiandae nemo ad. Harum repellendus placeat, nulla
          autem neque alias!
        </div>
      ),
      footer: (
        <div className="ml-auto flex gap-2">
          <Button
            primary
            type="button"
            className="text-xs"
            onClick={() => alert("커스텀 그만")}
          >
            그만
          </Button>
          <Button
            type="button"
            className="text-xs"
            onClick={() => alert("커스텀 취소")}
          >
            취소
          </Button>
          <Button
            secondary
            fill
            type="button"
            className="text-xs"
            onClick={() => alert("커스텀 확인")}
          >
            확인
          </Button>
        </div>
      ),
    },
  },
};
