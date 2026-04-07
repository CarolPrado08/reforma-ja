import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { tokens } from "../../design-system/tokens"

const meta: Meta = {
  title: "Design Tokens/Typography",
  parameters: { layout: "padded" },
}
export default meta

export const Scale: StoryObj = {
  render: () => (
    <div style={{ fontFamily: "sans-serif", display: "flex", flexDirection: "column", gap: 12 }}>
      {[
        ["xs", tokens.typography.sizeXs],
        ["sm", tokens.typography.sizeSm],
        ["md (base)", tokens.typography.sizeMd],
        ["lg", tokens.typography.sizeLg],
        ["xl", tokens.typography.sizeXl],
        ["2xl", tokens.typography.size2xl],
        ["3xl", tokens.typography.size3xl],
        ["4xl", tokens.typography.size4xl],
      ].map(([name, size]) => (
        <div key={name} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{ fontSize: 11, color: "#999", width: 60, fontFamily: "monospace" }}>{name}</span>
          <span style={{ fontSize: size, color: tokens.colors.foreground }}>
            ReformaJá — Seu orçamento em minutos
          </span>
        </div>
      ))}
    </div>
  ),
}
