import Link from 'next/link'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/types'

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null

  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.18em] text-accent">
              Destaques
            </span>
            <h2 className="font-serif text-3xl text-balance sm:text-4xl">
              Os queridinhos da loja
            </h2>
          </div>
          <Button
            variant="outline"
            className="h-10 px-4"
            render={<Link href="/produtos" />}
          >
            Ver catálogo completo
          </Button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
