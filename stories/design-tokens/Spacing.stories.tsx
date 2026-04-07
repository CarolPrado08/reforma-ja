import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { tokens } from "../../design-system/tokens"

const meta: Meta = {
  title: "Design Tokens/Spacing",
  parameters: { layout: "padded" },
}
export default meta

export const Scale: StoryObj = {
  render: () => (
    <div style={{ fontFamily: "sans-serif", display: "flex", flexDirection: "column", gap: 8 }}>
      {Object.entries(tokens.spacing).map(([name, size]) => (
        <div key={name} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 11, color: "#999", width: 40, fontFamily: "monospace" }}>{name}</span>
          <span style={{ fontSize: 11, color: "#999", width: 60, fontFamily: "monospace" }}>{size}</span>
          <div style={{ width: size, height: 24, background: tokens.colors.primary, borderRadius: 4 }} />
        </div>
      ))}
    </div>
  ),
}
