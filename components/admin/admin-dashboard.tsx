'use client'

import {
  ExternalLink,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  Star,
  Trash2,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import {
  type ActionState,
  deleteProductAction,
  logoutAction,
} from '@/app/admin/actions'
import { ProductForm } from '@/components/admin/product-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { categoryLabel, formatPrice, type Product } from '@/lib/types'

const INITIAL: ActionState = { ok: false, message: '' }

function DeleteProductButton({ product }: { product: Product }) {
  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState(deleteProductAction, INITIAL)
  const handled = useRef<ActionState | null>(null)

  useEffect(() => {
    if (!state.message || handled.current === state) return
    handled.current = state

    if (state.ok) {
      toast.success(state.message)
      setOpen(false)
    } else {
      toast.error(state.message)
    }
  }, [state])

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        aria-label={`Remover ${product.name}`}
      >
        <Trash2 className="size-4 text-destructive" />
        <span className="sr-only sm:not-sr-only">Remover</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover produto</DialogTitle>
            <DialogDescription>
              {`"${product.name}" será apagado do catálogo. Essa ação não pode ser desfeita.`}
            </DialogDescription>
          </DialogHeader>

          <form action={formAction} className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <input type="hidden" name="id" value={product.id} />
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="destructive" disabled={pending}>
              {pending && <Loader2 className="size-4 animate-spin" />}
              Remover
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function AdminDashboard({ products }: { products: Product[] }) {
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)

  const featuredCount = products.filter((product) => product.featured).length
  const hiddenCount = products.filter((product) => !product.available).length

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary font-serif text-sm font-semibold text-primary-foreground">
              JHL
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-base font-semibold">Painel de produtos</span>
              <span className="text-xs text-muted-foreground">JHL Móveis</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" target="_blank">
                Ver loja
                <ExternalLink className="size-4" />
              </Link>
            </Button>
            <form action={logoutAction}>
              <Button type="submit" variant="outline" size="sm">
                Sair
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="font-serif text-2xl">Catálogo</h1>
            <p className="text-sm text-muted-foreground">
              {`${products.length} produtos · ${featuredCount} em destaque · ${hiddenCount} ocultos`}
            </p>
          </div>

          <Button onClick={() => setCreating(true)}>
            <Plus className="size-4" />
            Novo produto
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {products.length === 0 && (
            <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
              <h2 className="font-serif text-lg">Nenhum produto cadastrado</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Clique em &quot;Novo produto&quot; para publicar o primeiro móvel.
              </p>
            </div>
          )}

          {products.map((product) => (
            <article
              key={product.id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center"
            >
              <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-lg bg-secondary sm:size-20 sm:aspect-square">
                <Image
                  src={product.imageUrl || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-serif text-lg leading-tight">{product.name}</h2>
                  {product.featured && (
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="size-3" />
                      Destaque
                    </Badge>
                  )}
                  {!product.available && (
                    <Badge variant="secondary">
                      <EyeOff className="size-3" />
                      Oculto
                    </Badge>
                  )}
                </div>
                <p className="line-clamp-1 text-sm text-muted-foreground">
                  {product.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {`${categoryLabel(product.category)} · ${formatPrice(product.price)}`}
                </p>
              </div>

              <div className="flex items-center gap-1 sm:shrink-0">
                <Button variant="ghost" size="sm" onClick={() => setEditing(product)}>
                  <Pencil className="size-4" />
                  <span className="sr-only sm:not-sr-only">Editar</span>
                </Button>
                <DeleteProductButton product={product} />
              </div>
            </article>
          ))}
        </div>
      </main>

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Novo produto</DialogTitle>
            <DialogDescription>
              Preencha os dados do móvel que vai aparecer no catálogo.
            </DialogDescription>
          </DialogHeader>
          <ProductForm onSaved={() => setCreating(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar produto</DialogTitle>
            <DialogDescription>
              As alterações aparecem na loja assim que você salvar.
            </DialogDescription>
          </DialogHeader>
          {editing && (
            <ProductForm
              key={editing.id}
              product={editing}
              onSaved={() => setEditing(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
