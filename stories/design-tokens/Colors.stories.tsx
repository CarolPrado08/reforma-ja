import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { tokens } from "../../design-system/tokens"

const meta: Meta = {
  title: "Design Tokens/Colors",
  parameters: { layout: "padded" },
}
export default meta

export const AllColors: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "sans-serif", marginBottom: 16 }}>Paleta de cores — ReformaJá</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
        {Object.entries(tokens.colors).map(([key, value]) => (
          <div key={key} style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #eee" }}>
            <div style={{ background: value, height: 64 }} />
            <div style={{ padding: "8px 10px", fontFamily: "monospace", fontSize: 11 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>{key}</p>
              <p style={{ margin: 0, color: "#666" }}>{value}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 style={{ fontFamily: "sans-serif", marginTop: 24, marginBottom: 12 }}>Sidebar</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
        {Object.entries(tokens.sidebar).map(([key, value]) => (
          <div key={key} style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #eee" }}>
            <div style={{ background: value, height: 64 }} />
            <div style={{ padding: "8px 10px", fontFamily: "monospace", fontSize: 11 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>{key}</p>
              <p style={{ margin: 0, color: "#666" }}>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}
