import type { Metadata } from 'next'
import Link from 'next/link'
import { ProductCard } from '@/components/product-card'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getVisibleProducts } from '@/lib/products'
import { CATEGORIES, categoryLabel } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Produtos | JHL Móveis',
  description:
    'Catálogo completo de sofás, mesas, cadeiras, estantes e móveis de quarto da JHL Móveis.',
}

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const { categoria } = await searchParams
  const products = await getVisibleProducts()

  const active = CATEGORIES.some((c) => c.slug === categoria) ? categoria : undefined
  const filtered = active
    ? products.filter((product) => product.category === active)
    : products

  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
            <span className="text-[11px] uppercase tracking-[0.18em] text-accent">
              Catálogo
            </span>
            <h1 className="mt-3 font-serif text-4xl text-balance sm:text-5xl">
              {active ? categoryLabel(active) : 'Todos os móveis'}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Preços à vista. Trabalhamos com pedidos sob medida e entregamos com
              montagem inclusa.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <Link
                href="/produtos"
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  active
                    ? 'border-border text-muted-foreground hover:text-foreground'
                    : 'border-accent bg-accent text-accent-foreground'
                }`}
              >
                Todos
              </Link>
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/produtos?categoria=${category.slug}`}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    active === category.slug
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
              <h2 className="font-serif text-xl">Nenhum produto por aqui ainda</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Em breve novos móveis nesta categoria. Fale com a gente para consultar
                disponibilidade.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                {filtered.length === 1
                  ? '1 produto encontrado'
                  : `${filtered.length} produtos encontrados`}
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
