import type { Meta, StoryObj } from "@storybook/react";

import Button from "#/components/atoms/Button";
import Tooltip from "./index";

const meta = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    componentSubtitle: "공용 툴팁 컴포넌트",
    docs: {
      description: {
        component: "`framer-motion`과 `tailwindcss`를 사용하는 공용 툴팁",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="p-10">{Story()}</div>],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    element: "",
    children: "",
  },
  decorators: [
    () => (
      <article className="flex flex-col gap-10">
        <section className="flex gap-10 justify-between">
          <Tooltip placement="top-left" element="TL">
            <Button loading fill primary className="whitespace-pre">
              {`Top\nLeft`}
            </Button>
          </Tooltip>
          <Tooltip placement="top" element="TC">
            <Button loading fill primary className="whitespace-pre">
              {"Top\nCenter"}
            </Button>
          </Tooltip>
          <Tooltip placement="top-right" element="TR">
            <Button loading fill primary className="whitespace-pre">
              {"Top\nRight"}
            </Button>
          </Tooltip>
        </section>
        <section className="flex justify-between">
          <div className="flex flex-col gap-10">
            <Tooltip placement="left-top" element="LT">
              <Button loading fill primary className="whitespace-pre">
                {`Left\nTop`}
              </Button>
            </Tooltip>
            <Tooltip placement="left" element="LC">
              <Button loading fill primary className="whitespace-pre">
                {`Left\nCenter`}
              </Button>
            </Tooltip>
            <Tooltip placement="left-bottom" element="LB">
              <Button loading fill primary className="whitespace-pre">
                {`Left\nBottom`}
              </Button>
            </Tooltip>
          </div>
          <div className="flex flex-col items-end gap-10">
            <Tooltip placement="right-top" element="RT">
              <Button loading fill primary className="whitespace-pre">
                {`Right\nTop`}
              </Button>
            </Tooltip>
            <Tooltip placement="right" element="RC">
              <Button loading fill primary className="whitespace-pre">
                {"Right\nCenter"}
              </Button>
            </Tooltip>
            <Tooltip placement="right-bottom" element="TB">
              <Button loading fill primary className="whitespace-pre">
                {"Right\nBottom"}
              </Button>
            </Tooltip>
          </div>
        </section>
        <section className="flex gap-10 justify-between">
          <Tooltip placement="bottom-left" element="BL">
            <Button loading fill primary className="whitespace-pre">
              {`Bottom\nLeft`}
            </Button>
          </Tooltip>
          <Tooltip placement="bottom" element="BC">
            <Button loading fill primary className="whitespace-pre">
              {"Bottom\nCenter"}
            </Button>
          </Tooltip>
          <Tooltip placement="bottom-right" element="BR">
            <Button loading fill primary className="whitespace-pre">
              {"Bottom\nRight"}
            </Button>
          </Tooltip>
        </section>
      </article>
    ),
  ],
};
export const Default: Story = {
  args: {
    children: (
      <Button loading primary className="whitespace-pre">
        Default
      </Button>
    ),
    element: "Default",
  },
};
export const TooltipInElement: Story = {
  args: {
    children: (
      <Button loading secondary fill className="whitespace-pre">
        툴팁에 엘리먼트 넣기 ( 버튼 )
      </Button>
    ),
    element: (
      <Button loading primary fill>
        Button
      </Button>
    ),
    className: "bg-white",
  },
};
export const AnimationDistance: Story = {
  args: {
    children: (
      <Button loading primary fill className="whitespace-pre">
        좌측으로 100% 이동
      </Button>
    ),
    element: "툴팁",
    moveDistance: 100,
    placement: "right",
    className: "text-white",
  },
};
