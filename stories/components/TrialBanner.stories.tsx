import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TrialBanner } from "../../components/paywall/TrialBanner"

const meta: Meta<typeof TrialBanner> = {
  title: "Components/TrialBanner",
  component: TrialBanner,
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof TrialBanner>

export const ManyDays: Story = {
  args: { daysLeft: 7 },
}

export const LastDay: Story = {
  args: { daysLeft: 1 },
}
