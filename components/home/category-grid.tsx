import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/types'

export function CategoryGrid({ counts }: { counts: Record<string, number> }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="flex flex-col gap-3">
        <span className="text-[11px] uppercase tracking-[0.18em] text-accent">
          Categorias
        </span>
        <h2 className="font-serif text-3xl text-balance sm:text-4xl">
          Encontre pelo ambiente
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          Da sala ao quarto, organizamos a coleção para facilitar a sua busca.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/produtos?categoria=${category.slug}`}
            className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/60"
          >
            <span className="flex flex-col gap-1">
              <span className="font-serif text-xl">{category.label}</span>
              <span className="text-sm text-muted-foreground">{category.tagline}</span>
              <span className="text-xs text-muted-foreground/80">
                {counts[category.slug] === 1
                  ? '1 produto disponível'
                  : `${counts[category.slug] ?? 0} produtos disponíveis`}
              </span>
            </span>
            <ArrowUpRight className="size-5 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  )
}
