import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { db } from "./db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY!,
      from: "ReformaJá <noreply@reformaja.com.br>",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  events: {
    async createUser({ user }) {
      // Set TRIAL plan on first login - 7 days for professionals, handled via mode selection
      await db.user.update({
        where: { id: user.id },
        data: {
          plan: "FREE",
        },
      })
    },
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { plan: true, trialEndsAt: true, orcamentosCreditos: true },
        })
        if (dbUser) {
          ;(session.user as any).plan = dbUser.plan
          ;(session.user as any).trialEndsAt = dbUser.trialEndsAt
          ;(session.user as any).orcamentosCreditos = dbUser.orcamentosCreditos
        }
      }
      return session
    },
  },
})
