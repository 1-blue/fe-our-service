import type { Meta, StoryObj } from "@storybook/react";

import Toast from "./index";

const meta = {
  title: "Atoms/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    componentSubtitle: "framer-motion과 tailwindcss를 사용하는 공용 토스트",
    docs: {
      description: {
        component:
          "`zustand` & `React.Portal` / `framer-motion` & `tailwindcss`를 사용하는 공용 토스트 ( 스토리북에서는 버튼 클릭으로 토스트 표출이 어려워서 버튼 없이 디자인만 보이게 함 )",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "기본 토스트 메시지",
    timer: 10_000,
  },
};
export const Info: Story = {
  args: {
    message: "정보 토스트 메시지",
    timer: 10_000,
    type: "info",
  },
};
export const Success: Story = {
  args: {
    message: "성공 토스트 메시지",
    timer: 10_000,
    type: "success",
  },
};
export const Warning: Story = {
  args: {
    message: "경고 토스트 메시지",
    timer: 10_000,
    type: "warning",
  },
};
export const Error: Story = {
  args: {
    message: "에러 토스트 메시지",
    timer: 10_000,
    type: "error",
  },
};
