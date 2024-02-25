import type { Meta, StoryObj } from "@storybook/react";

import { StoryButton } from "./index";

const meta = {
  title: "Atoms/Button",
  component: StoryButton,
  parameters: {
    layout: "centered",
    componentSubtitle: "공용 버튼 컴포넌트",
    docs: {
      description: {
        component: "`framer-motion`과 `tailwindcss`를 사용하는 공용 버튼",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      defaultValue: "button",
      description: "버튼 타입",
    },
    className: {
      description: "클래스네임 ( with `TailwindCss` )",
    },
  },
} satisfies Meta<typeof StoryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default",
  },
};
export const Primary: Story = {
  args: {
    children: "Primary",
    primary: true,
  },
};
export const Secondary: Story = {
  args: {
    children: "Secondary",
    secondary: true,
  },
};
export const Loading: Story = {
  args: {
    children: "Loading",
    loading: true,
  },
};
export const Fill: Story = {
  args: {
    children: "Fill",
    loading: true,
    fill: true,
  },
};
export const Custom: Story = {
  args: {
    children: "Custom",
    loading: true,
    className:
      "px-6 py-2 text-xl border-teal-500 hover:border-teal-400 text-teal-500 hover:text-teal-400",
    spinnerClassName: "border-teal-500 group-hover:border-teal-400",
  },
};
