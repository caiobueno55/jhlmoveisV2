import { ArrowLeft, MessageCircle, Truck, Wrench } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/product-card'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getProductBySlug, getVisibleProducts } from '@/lib/products'
import { whatsappLink } from '@/lib/site'
import { categoryLabel, formatPrice } from '@/lib/types'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) return { title: 'Produto não encontrado | JHL Móveis' }

  return {
    title: `${product.name} | JHL Móveis`,
    description: product.description,
  }
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product || !product.available) notFound()

  const all = await getVisibleProducts()
  const related = all
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3)

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Voltar ao catálogo
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-secondary">
            <Image
              src={product.imageUrl || '/placeholder.svg'}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 560px, 92vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary">{categoryLabel(product.category)}</Badge>
              {product.featured && (
                <Badge className="bg-accent text-accent-foreground">Destaque</Badge>
              )}
            </div>

            <h1 className="font-serif text-3xl text-balance sm:text-4xl">
              {product.name}
            </h1>

            <p className="text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <p className="font-serif text-3xl">{formatPrice(product.price)}</p>

            {product.details && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold">Ficha do produto</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {product.details}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a
                  href={whatsappLink(
                    `Olá! Tenho interesse no produto ${product.name} (${formatPrice(product.price)}).`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="size-4" />
                  Pedir orçamento
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`/produtos?categoria=${product.category}`}>
                  Ver similares
                </Link>
              </Button>
            </div>

            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Truck className="size-4 text-accent" />
                Entrega com data combinada por WhatsApp
              </li>
              <li className="flex items-center gap-2">
                <Wrench className="size-4 text-accent" />
                Montagem feita no local pela nossa equipe
              </li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl">Também de {categoryLabel(product.category).toLowerCase()}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
