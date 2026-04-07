import type { Preview } from "@storybook/nextjs-vite"
import "../app/globals.css"
import { tokens } from "../design-system/tokens"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: tokens.colors.background },
        { name: "dark", value: tokens.colors.foreground },
        { name: "sidebar", value: tokens.sidebar.background },
      ],
    },
    a11y: {
      test: "todo",
    },
  },
}

export default preview
