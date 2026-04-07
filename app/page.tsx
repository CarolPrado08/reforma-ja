import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Calculator, FileText, BarChart3, Zap, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:"#3B6D11"}}>
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-xl" style={{color:"#2C2C2A"}}>ReformaJá</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-600">Entrar</Button>
            </Link>
            <Link href="/login">
              <Button style={{background:"#3B6D11", color:"white"}} className="hover:opacity-90">
                Começar grátis
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{background:"linear-gradient(135deg, #3B6D11 0%, #639922 100%)"}}>
        <div className="max-w-6xl mx-auto px-4 py-24 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/20">
            ✨ Grátis para moradores
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Seu orçamento de reforma<br />em minutos
          </h1>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Chega de surpresas na obra. Calcule materiais, mão de obra e prazos antes de começar — seja você morador ou profissional autônomo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-white text-green-800 hover:bg-green-50 font-semibold px-8">
                Calcular meu orçamento grátis
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Ver como funciona
              </Button>
            </Link>
          </div>
          <p className="text-green-200 text-sm mt-6">Sem cartão de crédito • 1 orçamento gratuito para moradores</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{color:"#2C2C2A"}}>Tudo que você precisa para uma obra sem surpresas</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Do cálculo ao PDF profissional, o ReformaJá cobre cada etapa do seu orçamento.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Calculator className="w-6 h-6" />,
                title: "Formulário Inteligente",
                desc: "Selecione modo (Morador ou Profissional), cômodo, tipo de serviço, metragem e região em etapas guiadas.",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Motor de Cálculo",
                desc: "Preços de materiais por região, estimativa de mão de obra e margem de imprevisto configurável.",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Comparativo de Materiais",
                desc: "Cerâmica vs Porcelanato vs Vinílico: veja preço, durabilidade e dificuldade de instalação.",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "PDF Profissional",
                desc: "Relatório simples para moradores e proposta comercial com logo para profissionais.",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Dashboard Completo",
                desc: "Histórico de orçamentos, status (rascunho, enviado, aprovado, recusado) e link de aprovação.",
              },
              {
                icon: <Check className="w-6 h-6" />,
                title: "Link de Aprovação",
                desc: "Envie um link para seu cliente aprovar ou recusar o orçamento diretamente pelo celular.",
              },
            ].map((f) => (
              <Card key={f.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2" style={{background:"#F0F5EB", color:"#3B6D11"}}>
                    {f.icon}
                  </div>
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{color:"#2C2C2A"}}>Compare antes de comprar</h2>
            <p className="text-gray-500">Não existe material melhor — existe o material certo para cada projeto.</p>
          </div>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr style={{background:"#3B6D11", color:"white"}}>
                  <th className="py-3 px-4 text-left">Material</th>
                  <th className="py-3 px-4 text-left">Custo (m²)</th>
                  <th className="py-3 px-4 text-left">Durabilidade</th>
                  <th className="py-3 px-4 text-left">Instalação</th>
                  <th className="py-3 px-4 text-left">Ideal para</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Cerâmica", "R$40–55", "10-15 anos", "Média", "Banheiros, cozinhas"],
                  ["Porcelanato", "R$75–100", "20+ anos", "Alta", "Salas, quartos premium"],
                  ["Piso Vinílico", "R$55–72", "7-12 anos", "Baixa", "Quartos, escritórios"],
                ].map(([mat, custo, dur, inst, ideal], i) => (
                  <tr key={mat} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-3 px-4 font-medium">{mat}</td>
                    <td className="py-3 px-4">{custo}</td>
                    <td className="py-3 px-4">{dur}</td>
                    <td className="py-3 px-4">{inst}</td>
                    <td className="py-3 px-4 text-gray-500">{ideal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{color:"#2C2C2A"}}>Planos para todo tipo de obra</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* FREE */}
            <Card className="border-2">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">Morador</Badge>
                <CardTitle>Gratuito</CardTitle>
                <div className="text-3xl font-bold">R$0</div>
                <p className="text-gray-500 text-sm">1 orçamento grátis. Orçamentos extras R$9,90/un.</p>
              </CardHeader>
              <CardContent className="space-y-2">
                {["1 orçamento gratuito", "Cálculo de materiais", "Comparativo de materiais", "Orçamentos extras R$9,90"].map(i => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    {i}
                  </div>
                ))}
                <Link href="/login">
                  <Button className="w-full mt-4" variant="outline">Começar grátis</Button>
                </Link>
              </CardContent>
            </Card>
            {/* TRIAL */}
            <Card className="border-2" style={{borderColor:"#3B6D11"}}>
              <CardHeader>
                <Badge className="w-fit mb-2" style={{background:"#3B6D11", color:"white"}}>Profissional</Badge>
                <CardTitle>Trial</CardTitle>
                <div className="text-3xl font-bold">7 dias grátis</div>
                <p className="text-gray-500 text-sm">Depois R$39/mês. Cancele quando quiser.</p>
              </CardHeader>
              <CardContent className="space-y-2">
                {["Orçamentos ilimitados", "PDF com logo", "Histórico completo", "Link de aprovação para cliente", "Comparativo de materiais", "Suporte prioritário"].map(i => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    {i}
                  </div>
                ))}
                <Link href="/login">
                  <Button className="w-full mt-4" style={{background:"#3B6D11", color:"white"}}>
                    Testar grátis por 7 dias
                  </Button>
                </Link>
              </CardContent>
            </Card>
            {/* PRO */}
            <Card className="border-2" style={{borderColor:"#639922"}}>
              <CardHeader>
                <Badge className="w-fit mb-2" style={{background:"#639922", color:"white"}}>Profissional PRO</Badge>
                <CardTitle>PRO</CardTitle>
                <div className="text-3xl font-bold">R$39<span className="text-lg font-normal text-gray-500">/mês</span></div>
                <p className="text-gray-500 text-sm">Para autônomos e pequenas construtoras.</p>
              </CardHeader>
              <CardContent className="space-y-2">
                {["Tudo do Trial", "Acesso vitalício", "Propostas ilimitadas", "Exportação em PDF com sua marca"].map(i => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4" style={{color:"#639922"}} />
                    {i}
                  </div>
                ))}
                <Link href="/login">
                  <Button className="w-full mt-4" style={{background:"#639922", color:"white"}}>
                    Assinar PRO
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t" style={{background:"#2C2C2A"}}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{background:"#3B6D11"}}>
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <span className="font-semibold text-white">ReformaJá</span>
          </div>
          <p className="text-gray-400 text-sm">© 2024 ReformaJá. Todos os direitos reservados.</p>
          <div className="flex gap-4 text-sm text-gray-400">
            <Link href="/privacidade" className="hover:text-white">Privacidade</Link>
            <Link href="/termos" className="hover:text-white">Termos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
