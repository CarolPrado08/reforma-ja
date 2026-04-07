import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrcamentoApprovalEmail(
  toEmail: string,
  orcamentoId: string,
  linkAprovacao: string
) {
  await resend.emails.send({
    from: "ReformaJá <noreply@reformaja.com.br>",
    to: toEmail,
    subject: "Seu orçamento de reforma está pronto!",
    html: `
      <h2>Olá!</h2>
      <p>Seu orçamento de reforma foi preparado e está disponível para aprovação.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/orcamento/aprovar/${linkAprovacao}"
         style="background:#3B6D11;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;">
        Ver e Aprovar Orçamento
      </a>
    `,
  })
}
