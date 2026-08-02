import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { SITE } from '@/lib/site'
import { CATEGORIES } from '@/lib/types'

export function SiteFooter() {
  return (
    <footer id="contato" className="border-t border-border bg-secondary/50">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary font-serif text-sm font-semibold text-primary-foreground">
              JHL
            </span>
            <span className="font-serif text-lg font-semibold">{SITE.name}</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Móveis direto da fábrica, com atendimento próximo, entrega combinada e
            montagem feita no local.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold">Ambientes</h2>
          <ul className="flex flex-col gap-2">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/produtos?categoria=${category.slug}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold">Contato</h2>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
              {SITE.phoneLabel}
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
              {SITE.email}
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent" />
              {SITE.hours}
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              {SITE.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>
            {`© ${new Date().getFullYear()} ${SITE.name}. Todos os direitos reservados.`}
          </p>
          <Link href="/admin" className="transition-colors hover:text-foreground">
            Área do administrador
          </Link>
        </div>
      </div>
    </footer>
  )
}
