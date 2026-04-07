// Preços base por tipo de serviço e região (R$/m²)
const PRECOS_MATERIAIS: Record<string, Record<string, number>> = {
  ceramica: { sul: 45, sudeste: 55, nordeste: 40, centro_oeste: 50, norte: 48 },
  porcelanato: { sul: 85, sudeste: 100, nordeste: 75, centro_oeste: 90, norte: 88 },
  vinilico: { sul: 60, sudeste: 72, nordeste: 55, centro_oeste: 65, norte: 62 },
  gesso: { sul: 30, sudeste: 38, nordeste: 28, centro_oeste: 33, norte: 32 },
  pintura: { sul: 18, sudeste: 22, nordeste: 16, centro_oeste: 20, norte: 19 },
  hidraulica: { sul: 120, sudeste: 145, nordeste: 110, centro_oeste: 130, norte: 125 },
  eletrica: { sul: 95, sudeste: 115, nordeste: 88, centro_oeste: 105, norte: 100 },
}

const PRECOS_MAO_DE_OBRA: Record<string, Record<string, number>> = {
  ceramica: { sul: 40, sudeste: 55, nordeste: 35, centro_oeste: 45, norte: 42 },
  porcelanato: { sul: 55, sudeste: 70, nordeste: 48, centro_oeste: 60, norte: 57 },
  vinilico: { sul: 30, sudeste: 40, nordeste: 28, centro_oeste: 35, norte: 32 },
  gesso: { sul: 25, sudeste: 32, nordeste: 22, centro_oeste: 28, norte: 27 },
  pintura: { sul: 15, sudeste: 20, nordeste: 13, centro_oeste: 17, norte: 16 },
  hidraulica: { sul: 80, sudeste: 100, nordeste: 70, centro_oeste: 88, norte: 85 },
  eletrica: { sul: 70, sudeste: 90, nordeste: 62, centro_oeste: 78, norte: 75 },
}

export const COMPARATIVO_MATERIAIS = [
  {
    nome: "Cerâmica",
    key: "ceramica",
    preco: "Baixo (R$40-55/m²)",
    durabilidade: "Alta (10-15 anos)",
    dificuldade: "Média",
    indicado: "Áreas molhadas, cozinhas",
  },
  {
    nome: "Porcelanato",
    key: "porcelanato",
    preco: "Alto (R$75-100/m²)",
    durabilidade: "Muito Alta (20+ anos)",
    dificuldade: "Alta",
    indicado: "Salas, quartos de luxo",
  },
  {
    nome: "Piso Vinílico",
    key: "vinilico",
    preco: "Médio (R$55-72/m²)",
    durabilidade: "Média (7-12 anos)",
    dificuldade: "Baixa",
    indicado: "Quartos, escritórios",
  },
]

export const COMODOS = [
  "Banheiro",
  "Cozinha",
  "Sala de Estar",
  "Quarto",
  "Área de Serviço",
  "Varanda",
  "Escritório",
  "Garagem",
  "Área Externa",
]

export const TIPOS_SERVICO = [
  { label: "Piso Cerâmica", key: "ceramica" },
  { label: "Piso Porcelanato", key: "porcelanato" },
  { label: "Piso Vinílico", key: "vinilico" },
  { label: "Forro de Gesso", key: "gesso" },
  { label: "Pintura", key: "pintura" },
  { label: "Instalação Hidráulica", key: "hidraulica" },
  { label: "Instalação Elétrica", key: "eletrica" },
]

export const REGIOES = [
  { label: "Sul", key: "sul" },
  { label: "Sudeste", key: "sudeste" },
  { label: "Nordeste", key: "nordeste" },
  { label: "Centro-Oeste", key: "centro_oeste" },
  { label: "Norte", key: "norte" },
]

export function calcularOrcamento(
  tipoServico: string,
  metragem: number,
  regiao: string,
  margemImprevisto: number = 0.1
) {
  const precoMaterial = (PRECOS_MATERIAIS[tipoServico]?.[regiao] ?? 50) * metragem
  const precoMaoDeObra = (PRECOS_MAO_DE_OBRA[tipoServico]?.[regiao] ?? 40) * metragem
  const subtotal = precoMaterial + precoMaoDeObra
  const imprevisto = subtotal * margemImprevisto
  const total = subtotal + imprevisto

  return {
    totalMateriais: precoMaterial,
    totalMaoDeObra: precoMaoDeObra,
    totalGeral: total,
    imprevisto,
  }
}
