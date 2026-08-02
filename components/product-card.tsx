import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { categoryLabel, formatPrice, type Product } from '@/lib/types'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-secondary">
        <Image
          src={product.imageUrl || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.featured && (
          <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
            Destaque
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {categoryLabel(product.category)}
        </span>
        <h3 className="font-serif text-lg leading-snug text-pretty">{product.name}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          <span className="flex items-center gap-1 text-sm text-accent">
            Ver detalhes
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
