import React from "react";
import "../src/css/tailwind.css";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "default",
      values: [{ name: "default", value: "#23262C" }],
    },
  },
  decorators: [
    (Story) =>
      React.createElement("article", { className: "p-10 text-white" }, Story()),
  ],
};

export default preview;
