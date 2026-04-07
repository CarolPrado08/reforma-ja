import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PaywallGate } from "../../components/paywall/PaywallGate"
import { Card, CardContent } from "../../components/ui/card"

const meta: Meta<typeof PaywallGate> = {
  title: "Components/PaywallGate",
  component: PaywallGate,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof PaywallGate>

const MockContent = () => (
  <Card className="w-80">
    <CardContent className="pt-6">
      <p className="font-semibold">Histórico de Orçamentos</p>
      <p className="text-gray-500 text-sm mt-1">Veja todos os seus orçamentos anteriores aqui.</p>
    </CardContent>
  </Card>
)

export const Locked: Story = {
  args: {
    locked: true,
    title: "Histórico de Orçamentos",
    description: "Disponível nos planos TRIAL e PRO.",
    children: <MockContent />,
  },
}

export const Unlocked: Story = {
  args: {
    locked: false,
    children: <MockContent />,
  },
}
