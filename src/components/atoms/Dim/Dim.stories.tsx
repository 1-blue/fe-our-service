import type { Meta, StoryObj } from "@storybook/react";

import Dim from ".";

const meta = {
  title: "Atoms/Dim",
  component: Dim,
  parameters: {
    layout: "centered",
    componentSubtitle: "공용 Dim 컴포넌트",
    docs: {
      description: {
        component: "`framer-motion`과 `tailwindcss`를 사용하는 공용 Dim",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "클래스네임 ( with `TailwindCss` )",
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-4">
        <span>배경에 아무거나</span>
        <span>배경에 아무거나</span>
        <Story />
        <span>배경에 아무거나</span>
        <span>배경에 아무거나</span>
      </div>
    ),
  ],
} satisfies Meta<typeof Dim>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <aside className="flex h-full items-center justify-center">
          <span className="text-2xl font-bold">대충 모달</span>
        </aside>
      </>
    ),
  },
};
export const Blur: Story = {
  args: {
    children: (
      <>
        <aside className="flex h-full items-center justify-center">
          <span className="text-2xl font-bold">대충 모달</span>
        </aside>
      </>
    ),
    isBlur: true,
  },
};
