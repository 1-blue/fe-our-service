import type { Meta, StoryObj } from "@storybook/react";
import { HomeIcon } from "@heroicons/react/24/outline";

import Avatar from "./index";
import Badge from "#/components/atoms/Badge";
import Tooltip from "#/components/atoms/Tooltip";

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    componentSubtitle: "공용 아바타",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  decorators: [
    () => (
      <div className="space-y-8">
        <div className="flex gap-4">
          <Avatar className="bg-red-500" text="Apple" />
          <Avatar className="bg-blue-500" rounded text="Blue" />
          <Avatar
            className="bg-green-500"
            imagePath="https://avatars.githubusercontent.com/u/97165289"
          />
          <Avatar className="bg-indigo-500" icon={<HomeIcon />} />
          <Badge showAnimation status="processing">
            <Tooltip element="아무거나" className="bg-special-500 text-sm">
              <Avatar icon={<HomeIcon />} size="base" />
            </Tooltip>
          </Badge>
          <Badge showAnimation status="success" count={21}>
            <Tooltip
              element="아무거나"
              moveDistance={40}
              className="bg-violet-500 text-sm"
            >
              <Avatar
                imagePath="https://avatars.githubusercontent.com/u/97165289"
                size="base"
              />
            </Tooltip>
          </Badge>
        </div>

        <div className="flex gap-4">
          <Avatar text="Apple" size="xs" />
          <Avatar text="Apple" size="sm" />
          <Avatar text="Apple" size="base" />
          <Avatar text="Apple" size="md" />
          <Avatar text="Apple" size="lg" />
          <Avatar text="Apple" size="xl" />
        </div>

        <div className="flex gap-4">
          <Avatar
            imagePath="https://avatars.githubusercontent.com/u/97165289"
            size="xs"
          />
          <Avatar
            imagePath="https://avatars.githubusercontent.com/u/97165289"
            size="sm"
          />
          <Avatar
            imagePath="https://avatars.githubusercontent.com/u/97165289"
            size="base"
          />
          <Avatar
            imagePath="https://avatars.githubusercontent.com/u/97165289"
            size="md"
          />
          <Avatar
            imagePath="https://avatars.githubusercontent.com/u/97165289"
            size="lg"
          />
          <Avatar
            imagePath="https://avatars.githubusercontent.com/u/97165289"
            size="xl"
          />
        </div>

        <div className="flex gap-4">
          <Avatar icon={<HomeIcon />} size="xs" />
          <Avatar icon={<HomeIcon />} size="sm" />
          <Avatar icon={<HomeIcon />} size="base" />
          <Avatar icon={<HomeIcon />} size="md" />
          <Avatar icon={<HomeIcon />} size="lg" />
          <Avatar icon={<HomeIcon />} size="xl" />
        </div>
      </div>
    ),
  ],
};
export const Text: Story = {
  args: { text: "김독자" },
};
export const Icon: Story = {
  args: { icon: <HomeIcon />, className: "bg-main-500" },
};
export const Image: Story = {
  args: { imagePath: "https://avatars.githubusercontent.com/u/97165289" },
};
export const Merge: Story = {
  decorators: [
    (Story) => (
      <Badge showAnimation status="success" count={21}>
        <Tooltip
          element="아무거나"
          moveDistance={40}
          className="bg-green-600 text-sm"
        >
          {Story()}
        </Tooltip>
      </Badge>
    ),
  ],
  args: {
    imagePath: "https://avatars.githubusercontent.com/u/63289318?v=4",
  },
};
