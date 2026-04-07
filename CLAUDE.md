# ReformaJá — CLAUDE.md

## Sobre o projeto
SaaS para cálculo de orçamentos de reforma. Usuários: Moradores (FREE/avulso) e Profissionais (TRIAL/PRO).

## Stack
- Next.js 14 App Router + TypeScript strict
- Tailwind CSS 4 + shadcn/ui
- Prisma + PostgreSQL (Neon)
- Auth.js v5 (Google OAuth + Resend magic link)
- Stripe (assinaturas + pagamentos avulsos)
- TanStack Query + Zod

## Convenções
- NUNCA usar hex hardcoded nos componentes — usar tokens semânticos Tailwind (bg-primary, text-foreground)
- Rotas protegidas: /dashboard/*, /app/*, /settings/*
- Middleware NÃO importa Auth.js (limite 1MB Edge Function)
- Lazy init do Stripe client via Proxy
- Planos: FREE | TRIAL (7 dias) | PRO

## Cores
- Primária: #3B6D11
- Fundo: #FFFFFF
- Acento: #639922
- Texto: #2C2C2A

## Limites de plano
- FREE: 1 orçamento grátis + créditos avulsos (R$9,90/un, pack 5x R$29,90)
- TRIAL: 7 dias, tudo ilimitado
- PRO: R$39/mês, tudo ilimitado
