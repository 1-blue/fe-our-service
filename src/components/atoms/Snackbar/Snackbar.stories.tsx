import type { Meta, StoryObj } from "@storybook/react";

import Snackbar from "./index";

const meta = {
  title: "Atoms/Snackbar",
  component: Snackbar,
  parameters: {
    layout: "centered",
    componentSubtitle: "framer-motion과 tailwindcss를 사용하는 공용 스낵바",
    docs: {
      description: {
        component:
          "`zustand` & `React.Portal` / `framer-motion` & `tailwindcss`를 사용하는 공용 토스트 ( 스토리북에서는 버튼 클릭으로 스낵바 표출이 어려워서 버튼 없이 디자인만 보이게 함 )",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "스낵바는 사용자에게 액션을 받아서 처리할 수 있어서 버튼이 존재함",
    timer: 10_000,
    action: {
      name: "삭제 취소",
      func: () => {
        alert("🚀 >> 삭제 취소하는 액션 실행 !!");
      },
    },
  },
};
