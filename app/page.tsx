import Link from "next/link"

export default function HomePage() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#0f1923", background: "#ffffff" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        height: 64,
        background: "#ffffff",
        borderBottom: "1px solid #ebebeb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: "#1a5c2a", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>R</span>
          </div>
          <span style={{ fontSize: 16, fontWeight: 600, color: "#0f1923" }}>ReformaJá</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <a href="#features" style={{ fontSize: 14, color: "#5c5c7a", textDecoration: "none" }}>Funcionalidades</a>
          <a href="#como-funciona" style={{ fontSize: 14, color: "#5c5c7a", textDecoration: "none" }}>Como funciona</a>
          <a href="#pricing" style={{ fontSize: 14, color: "#5c5c7a", textDecoration: "none" }}>Planos</a>
          <Link href="/login" style={{
            backgroundColor: "#1a5c2a",
            color: "#ffffff",
            border: "2px solid #1a5c2a",
            borderRadius: 8,
            padding: "10px 22px",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            cursor: "pointer",
          }}>
            Começar grátis
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: "#fafaf8", padding: "96px 48px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#eaf3de", borderRadius: 100, padding: "5px 14px",
            marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a5c2a", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#27500a" }}>Grátis para moradores</span>
          </div>

          <h1 style={{
            fontSize: 48, fontWeight: 700, letterSpacing: "-1.5px", lineHeight: 1.12,
            color: "#0f1923", marginBottom: 20, margin: "0 0 20px",
          }}>
            Orçamentos de reforma<br />
            <span style={{ color: "#1a5c2a" }}>precisos e profissionais</span>
          </h1>

          <p style={{
            fontSize: 18, fontWeight: 400, lineHeight: 1.65, color: "#5c5c7a",
            maxWidth: 520, margin: "0 auto 36px",
          }}>
            Calcule materiais, mão de obra e prazos em minutos. Para moradores e profissionais autônomos.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <Link href="/login" style={{
              backgroundColor: "#1a5c2a",
              color: "#ffffff",
              border: "2px solid #1a5c2a",
              borderRadius: 8,
              padding: "13px 28px",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
            }}>
              Calcular meu orçamento grátis
            </Link>
            <Link href="/login" style={{
              backgroundColor: "#ffffff",
              color: "#0f1923",
              border: "2px solid #d0d0d0",
              borderRadius: 8,
              padding: "13px 28px",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
            }}>
              Ver demonstração
            </Link>
          </div>

          <p style={{ fontSize: 13, color: "#9999b0", margin: 0 }}>
            Sem cartão de crédito · 1 orçamento gratuito para moradores
          </p>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #ebebeb", padding: "36px 48px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "center", gap: 56, flexWrap: "wrap" }}>
          {[
            { num: "4.800+", label: "Orçamentos gerados" },
            { num: "1.200+", label: "Profissionais ativos" },
            { num: "R$12M+", label: "Em obras orçadas" },
            { num: "4.9/5", label: "Avaliação média" },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 26, fontWeight: 700, color: "#0f1923", letterSpacing: "-0.5px", margin: 0 }}>{num}</p>
              <p style={{ fontSize: 12, color: "#9999b0", margin: "2px 0 0" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ background: "#ffffff", padding: "80px 48px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1a5c2a", margin: "0 0 10px" }}>
              Funcionalidades
            </p>
            <h2 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.2, color: "#0f1923", margin: "0 0 12px" }}>
              Tudo que você precisa para uma obra sem surpresas
            </h2>
            <p style={{ fontSize: 16, color: "#5c5c7a", lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}>
              Do cálculo ao PDF profissional, o ReformaJá cobre cada etapa do seu orçamento.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#3b6d11" />
                    <rect x="11" y="2" width="7" height="7" rx="1.5" fill="#3b6d11" />
                    <rect x="2" y="11" width="7" height="7" rx="1.5" fill="#3b6d11" />
                    <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#3b6d11" />
                  </svg>
                ),
                title: "Formulário inteligente",
                text: "Selecione cômodo, tipo de serviço, metragem e região em etapas guiadas e simples.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#3b6d11" strokeWidth="1.8" />
                    <path d="M10 6v4l3 2" stroke="#3b6d11" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                ),
                title: "Motor de cálculo",
                text: "Preços de materiais atualizados por região, mão de obra estimada e margem de imprevisto configurável.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <polyline points="2,14 7,9 11,12 18,4" stroke="#3b6d11" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: "Comparativo de materiais",
                text: "Compare cerâmica, porcelanato e vinílico por preço, durabilidade e dificuldade de instalação.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="4" y="2" width="12" height="16" rx="2" stroke="#3b6d11" strokeWidth="1.8" />
                    <line x1="7" y1="7" x2="13" y2="7" stroke="#3b6d11" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="7" y1="10" x2="13" y2="10" stroke="#3b6d11" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="7" y1="13" x2="11" y2="13" stroke="#3b6d11" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: "PDF profissional",
                text: "Gere propostas comerciais com sua logo, validade do orçamento e condições de pagamento.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2l2 5h5l-4 3 1.5 5L10 12l-4.5 3L7 10 3 7h5z" stroke="#3b6d11" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
                  </svg>
                ),
                title: "Link de aprovação",
                text: "Envie um link para seu cliente aprovar ou recusar o orçamento diretamente pelo celular.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <line x1="3" y1="6" x2="17" y2="6" stroke="#3b6d11" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="3" y1="10" x2="17" y2="10" stroke="#3b6d11" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="3" y1="14" x2="12" y2="14" stroke="#3b6d11" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                ),
                title: "Histórico completo",
                text: "Acompanhe todos os orçamentos com status em tempo real: rascunho, enviado, aprovado ou recusado.",
              },
            ].map(({ icon, title, text }) => (
              <div key={title} style={{
                background: "#ffffff", border: "1px solid #ebebeb",
                borderRadius: 14, padding: "28px 24px",
              }}>
                <div style={{
                  width: 40, height: 40, background: "#eaf3de", borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16,
                }}>
                  {icon}
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#0f1923", margin: "0 0 8px" }}>{title}</p>
                <p style={{ fontSize: 13, color: "#6b6b85", lineHeight: 1.65, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section id="como-funciona" style={{
        background: "#fafaf8",
        borderTop: "1px solid #ebebeb",
        borderBottom: "1px solid #ebebeb",
        padding: "80px 48px",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1a5c2a", margin: "0 0 10px" }}>
              Como funciona
            </p>
            <h2 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.2, color: "#0f1923", margin: "0 0 12px" }}>
              Do zero ao orçamento em 4 passos
            </h2>
            <p style={{ fontSize: 16, color: "#5c5c7a", lineHeight: 1.6, margin: 0 }}>
              Simples para moradores, poderoso para profissionais.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { num: "1", title: "Escolha o perfil", text: "Selecione se você é morador ou profissional autônomo" },
              { num: "2", title: "Descreva a reforma", text: "Informe cômodo, serviço, metragem e sua região" },
              { num: "3", title: "Receba o cálculo", text: "Materiais, mão de obra e total estimado na hora" },
              { num: "4", title: "Exporte o PDF", text: "Proposta pronta para enviar ao cliente ou guardar" },
            ].map(({ num, title, text }) => (
              <div key={num} style={{ textAlign: "center" }}>
                <div style={{
                  width: 36, height: 36, background: "#1a5c2a", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px", fontSize: 14, fontWeight: 700, color: "#ffffff",
                }}>
                  {num}
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#0f1923", margin: "0 0 8px" }}>{title}</p>
                <p style={{ fontSize: 13, color: "#6b6b85", lineHeight: 1.65, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: "#ffffff", padding: "80px 48px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1a5c2a", margin: "0 0 10px" }}>
              Planos
            </p>
            <h2 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.2, color: "#0f1923", margin: "0 0 12px" }}>
              Para todo tipo de obra
            </h2>
            <p style={{ fontSize: 16, color: "#5c5c7a", lineHeight: 1.6, margin: 0 }}>
              Comece grátis. Escale conforme sua necessidade.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 880, margin: "0 auto" }}>
            {/* FREE */}
            <div style={{ background: "#ffffff", border: "1px solid #ebebeb", borderRadius: 16, padding: "28px 24px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1a5c2a", margin: "0 0 8px" }}>Morador</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: "#0f1923", margin: "0 0 4px" }}>Gratuito</p>
              <p style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-1px", color: "#0f1923", margin: "12px 0 4px" }}>R$0</p>
              <p style={{ fontSize: 13, color: "#9999b0", margin: "0 0 24px" }}>1 orçamento grátis. Adicionais por R$9,90/un.</p>
              <div style={{ marginBottom: 24 }}>
                {["1 orçamento gratuito", "Cálculo de materiais", "Comparativo de materiais", "Pack 5 orçamentos por R$29,90"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 16, height: 16, background: "#eaf3de", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#3b6d11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontSize: 13, color: "#0f1923" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/login" style={{
                display: "block", textAlign: "center",
                backgroundColor: "#ffffff", color: "#0f1923",
                border: "2px solid #d0d0d0", borderRadius: 9,
                padding: "12px", fontSize: 14, fontWeight: 600,
                textDecoration: "none",
              }}>
                Começar grátis
              </Link>
            </div>

            {/* MENSAL — DESTAQUE */}
            <div style={{ background: "#ffffff", border: "2px solid #1a5c2a", borderRadius: 16, padding: "28px 24px", position: "relative" }}>
              <div style={{
                position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                backgroundColor: "#1a5c2a", color: "#fff", fontSize: 11, fontWeight: 700,
                borderRadius: 100, padding: "4px 14px", whiteSpace: "nowrap",
              }}>
                Mais popular
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1a5c2a", margin: "0 0 8px" }}>Profissional</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: "#0f1923", margin: "0 0 4px" }}>Mensal</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "12px 0 4px" }}>
                <span style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-1px", color: "#0f1923" }}>R$39</span>
                <span style={{ fontSize: 15, color: "#9999b0" }}>/mês · 7 dias grátis</span>
              </div>
              <p style={{ fontSize: 13, color: "#9999b0", margin: "0 0 24px" }}>Cancele quando quiser. Sem compromisso.</p>
              <div style={{ marginBottom: 24 }}>
                {["Orçamentos ilimitados", "PDF com sua logo", "Link de aprovação para cliente", "Histórico completo", "Suporte prioritário"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 16, height: 16, background: "#eaf3de", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#3b6d11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontSize: 13, color: "#0f1923" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/login" style={{
                display: "block", textAlign: "center",
                backgroundColor: "#1a5c2a", color: "#ffffff",
                border: "2px solid #1a5c2a", borderRadius: 9,
                padding: "12px", fontSize: 14, fontWeight: 600,
                textDecoration: "none",
              }}>
                Testar grátis por 7 dias
              </Link>
            </div>

            {/* ANUAL */}
            <div style={{ background: "#ffffff", border: "1px solid #ebebeb", borderRadius: 16, padding: "28px 24px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1a5c2a", margin: "0 0 8px" }}>Profissional PRO</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: "#0f1923", margin: "0 0 4px" }}>Anual</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "12px 0 4px" }}>
                <span style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-1px", color: "#0f1923" }}>R$29</span>
                <span style={{ fontSize: 15, color: "#9999b0" }}>/mês · economia de 25%</span>
              </div>
              <p style={{ fontSize: 13, color: "#9999b0", margin: "0 0 24px" }}>Cobrado anualmente. Melhor custo-benefício.</p>
              <div style={{ marginBottom: 24 }}>
                {["Tudo do plano mensal", "Histórico vitalício", "Propostas ilimitadas", "Exportação com sua marca"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 16, height: 16, background: "#eaf3de", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#3b6d11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span style={{ fontSize: 13, color: "#0f1923" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/login" style={{
                display: "block", textAlign: "center",
                backgroundColor: "#ffffff", color: "#0f1923",
                border: "2px solid #d0d0d0", borderRadius: 9,
                padding: "12px", fontSize: 14, fontWeight: 600,
                textDecoration: "none",
              }}>
                Assinar anual
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section style={{
        background: "#fafaf8",
        borderTop: "1px solid #ebebeb",
        borderBottom: "1px solid #ebebeb",
        padding: "80px 48px",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1a5c2a", margin: "0 0 10px" }}>
              Depoimentos
            </p>
            <h2 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.2, color: "#0f1923", margin: "0 0 12px" }}>
              Quem usa, não volta ao caderninho
            </h2>
            <p style={{ fontSize: 16, color: "#5c5c7a", lineHeight: 1.6, margin: 0 }}>
              Profissionais e moradores que transformaram a forma de orçar.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { initials: "MR", name: "Marcos Rocha", role: "Pedreiro autônomo, SP", text: "Antes eu demorava 2 dias para montar um orçamento. Agora faço em 15 minutos e ainda mando o PDF para o cliente na hora." },
              { initials: "AF", name: "Ana Ferreira", role: "Moradora, BH", text: "Ia reformar o banheiro sem saber o custo real. O ReformaJá me deu uma estimativa precisa e evitou uma baita surpresa no meio da obra." },
              { initials: "CL", name: "Carlos Lima", role: "Pintor autônomo, RJ", text: "O link de aprovação é incrível. O cliente aprova pelo celular e eu já tenho o aval para começar. Profissionalismo total." },
            ].map(({ initials, name, role, text }) => (
              <div key={name} style={{ background: "#ffffff", border: "1px solid #ebebeb", borderRadius: 14, padding: "24px" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} width="13" height="13" viewBox="0 0 13 13" fill="#f59f00">
                      <path d="M6.5 1l1.5 3.2 3.5.5-2.5 2.4.6 3.5L6.5 9 3.4 10.6l.6-3.5L1.5 4.7l3.5-.5z" />
                    </svg>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: "#3a3a50", lineHeight: 1.65, margin: "0 0 20px" }}>
                  &ldquo;{text}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", backgroundColor: "#eaf3de",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700, color: "#27500a", flexShrink: 0,
                  }}>
                    {initials}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#0f1923", margin: 0 }}>{name}</p>
                    <p style={{ fontSize: 12, color: "#9999b0", margin: 0 }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ backgroundColor: "#0f2117", padding: "80px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.8px", color: "#ffffff", margin: "0 0 12px" }}>
            Pronto para orçar com confiança?
          </h2>
          <p style={{ fontSize: 16, color: "#7aaa87", margin: "0 0 32px" }}>
            Comece grátis hoje. Sem cartão de crédito.
          </p>
          <Link href="/login" style={{
            display: "inline-block",
            backgroundColor: "#ffffff", color: "#1a5c2a",
            border: "2px solid #ffffff", borderRadius: 9,
            padding: "14px 32px", fontSize: 15, fontWeight: 700,
            textDecoration: "none",
          }}>
            Criar meu primeiro orçamento
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        backgroundColor: "#ffffff", borderTop: "1px solid #ebebeb",
        padding: "28px 48px",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <p style={{ fontSize: 13, color: "#9999b0", margin: 0 }}>
          © 2026 ReformaJá. Todos os direitos reservados.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacidade", "Termos", "Contato"].map(link => (
            <a key={link} href="#" style={{ fontSize: 13, color: "#9999b0", textDecoration: "none" }}>{link}</a>
          ))}
        </div>
      </footer>

    </div>
  )
}
