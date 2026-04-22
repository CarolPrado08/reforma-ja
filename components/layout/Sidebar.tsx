"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, PlusCircle, Settings, LogOut, Building2, AlertCircle } from "lucide-react"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

const navBase = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/novo", label: "Novo Orçamento", icon: PlusCircle },
  { href: "/settings/billing", label: "Plano & Cobrança", icon: Settings },
]

type Props = {
  user: any
  userTipo?: string | null
  empresaConfigurada?: boolean
}

export function Sidebar({ user, userTipo, empresaConfigurada }: Props) {
  const path = usePathname()

  const nav = userTipo === "PROFISSIONAL"
    ? [...navBase, { href: "/settings/empresa", label: "Minha Empresa", icon: Building2 }]
    : navBase

  return (
    <aside className="w-64 flex flex-col min-h-screen" data-sidebar style={{background:"#2D5209"}}>
      <div className="p-6 border-b border-green-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-600">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-bold text-white text-lg">ReformaJá</span>
        </div>
        {userTipo && (
          <span className="mt-2 inline-block text-xs px-2 py-0.5 rounded-full" style={{
            background: userTipo === "PROFISSIONAL" ? "#639922" : "#1a5c2a",
            color: "#fff",
          }}>
            {userTipo === "PROFISSIONAL" ? "Profissional" : "Morador"}
          </span>
        )}
      </div>

      {userTipo === "PROFISSIONAL" && !empresaConfigurada && (
        <Link href="/settings/empresa" className="mx-3 mt-3 p-3 rounded-lg flex items-start gap-2" style={{background:"#f59e0b20", border:"1px solid #f59e0b60"}}>
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{color:"#f59e0b"}} />
          <p className="text-xs" style={{color:"#fbbf24"}}>Configure sua empresa para gerar propostas profissionais.</p>
        </Link>
      )}

      <nav className="flex-1 p-4 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              path === href
                ? "text-white"
                : "text-green-200 hover:text-white hover:bg-green-700"
            )}
            style={path === href ? {background:"#639922"} : {}}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-green-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{user?.name ?? "Usuário"}</p>
            <p className="text-green-300 text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 text-green-300 hover:text-white text-sm w-full"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>
  )
}
