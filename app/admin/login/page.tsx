import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/admin/login-form'
import { isAdmin } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Acesso restrito | JHL Móveis',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect('/admin')

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary/40 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="flex flex-col gap-2 text-center">
            <span className="mx-auto flex size-11 items-center justify-center rounded-md bg-primary font-serif text-sm font-semibold text-primary-foreground">
              JHL
            </span>
            <h1 className="mt-2 font-serif text-2xl">Painel administrativo</h1>
            <p className="text-sm text-muted-foreground">
              Entre com a senha para gerenciar os produtos da loja.
            </p>
          </div>

          <div className="mt-7">
            <LoginForm />
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Voltar para a loja
        </Link>
      </div>
    </main>
  )
}
