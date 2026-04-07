import { z } from "zod"

export const orcamentoSchema = z.object({
  modo: z.enum(["MORADOR", "PROFISSIONAL"]),
  comodo: z.string().min(1, "Selecione um cômodo"),
  tipoServico: z.string().min(1, "Selecione o tipo de serviço"),
  metragem: z.number().min(1, "Metragem deve ser maior que 0").max(10000),
  regiao: z.string().min(1, "Selecione uma região"),
  margemImprevisto: z.number().min(0).max(0.5),
})

export type OrcamentoInput = z.infer<typeof orcamentoSchema>
