import type { Meta, StoryObj } from "@storybook/react";

import Badge from "./index";
import Button from "#/components/atoms/Button";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    componentSubtitle: "공용 뱃지 컴포넌트",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  decorators: [
    () => (
      <article className="flex gap-8">
        <section className="flex flex-col gap-4">
          <h1 className="text-white">일반 뱃지 ( 점형태 )</h1>
          <Badge status="default" />
          <Badge status="processing" />
          <Badge status="success" />
          <Badge status="warning" />
          <Badge status="error" />
        </section>
        <section className="flex flex-col gap-4">
          <h1 className="text-white">애니메이션 뱃지 ( 점형태 )</h1>
          <Badge status="default" showAnimation />
          <Badge status="processing" showAnimation />
          <Badge status="success" showAnimation />
          <Badge status="warning" showAnimation />
          <Badge status="error" showAnimation />
        </section>
        <section className="flex flex-col gap-4">
          <h1 className="text-white">숫자 뱃지</h1>
          <Badge status="default" count={1} overflowCount={99} showAnimation />
          <Badge
            status="processing"
            count={10}
            overflowCount={9}
            showAnimation
          />
          <Badge
            status="success"
            count={100}
            overflowCount={99}
            showAnimation
          />
          <Badge
            status="warning"
            count={1000}
            overflowCount={999}
            showAnimation
          />
          <Badge
            status="error"
            count={10000}
            overflowCount={9999}
            showAnimation
          />
        </section>
        <section className="flex flex-col gap-4">
          <h1 className="text-white">숫자 뱃지\</h1>
          <Badge
            status="default"
            count={12}
            overflowCount={99}
            showAnimation
            text="텍스트"
          />
          <Badge
            status="processing"
            showAnimation
            text={<span className="font-bold text-2xl">텍스트 컴포넌트</span>}
          />
          <div className="inline-block">
            <Badge
              status="success"
              count={100}
              overflowCount={99}
              showAnimation
            >
              <Button>first</Button>
            </Badge>
          </div>
          <div className="inline-block">
            <Badge status="error" showAnimation>
              <Button fill secondary>
                second
              </Button>
            </Badge>
          </div>
        </section>
      </article>
    ),
  ],
};
export const Dot: Story = { args: { status: "warning" } };
export const Number: Story = { args: { status: "error", count: 10 } };
export const Animation: Story = {
  args: {
    status: "processing",
    count: 10,
    showAnimation: true,
  },
};
export const Text: Story = {
  args: {
    status: "success",
    count: 10,
    text: "아무거나",
  },
};
export const Children: Story = {
  args: {
    status: "error",
    showAnimation: true,
    children: (
      <Button secondary fill>
        커스텀 버튼
      </Button>
    ),
  },
};
