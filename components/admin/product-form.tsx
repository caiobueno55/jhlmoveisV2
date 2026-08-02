'use client'

import { ImagePlus, Loader2, Save } from 'lucide-react'
import Image from 'next/image'
import { useActionState, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { type ActionState, saveProductAction } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { CATEGORIES, type CategorySlug, type Product } from '@/lib/types'

const INITIAL: ActionState = { ok: false, message: '' }

export function ProductForm({
  product,
  onSaved,
}: {
  product?: Product
  onSaved: () => void
}) {
  const [state, formAction, pending] = useActionState(saveProductAction, INITIAL)
  const [category, setCategory] = useState<CategorySlug>(product?.category ?? 'sofas')
  const [featured, setFeatured] = useState(product?.featured ?? false)
  const [available, setAvailable] = useState(product?.available ?? true)
  const [preview, setPreview] = useState(product?.imageUrl ?? '')
  const fileRef = useRef<HTMLInputElement>(null)
  const handled = useRef<ActionState | null>(null)

  useEffect(() => {
    if (!state.message || handled.current === state) return
    handled.current = state

    if (state.ok) {
      toast.success(state.message)
      onSaved()
    } else {
      toast.error(state.message)
    }
  }, [state, onSaved])

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="imageUrl" value={product?.imageUrl ?? ''} />
      <input type="hidden" name="category" value={category} />
      {featured && <input type="hidden" name="featured" value="on" />}
      {available && <input type="hidden" name="available" value="on" />}

      <div className="flex flex-col gap-3">
        <Label>Foto do produto</Label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-lg border border-border bg-secondary sm:w-40">
            {preview ? (
              <Image
                src={preview || '/placeholder.svg'}
                alt="Pré-visualização do produto"
                fill
                sizes="160px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <span className="flex h-full items-center justify-center text-xs text-muted-foreground">
                Sem foto
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Input
              ref={fileRef}
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">
              JPG ou PNG de até 8 MB.{' '}
              {product ? 'Deixe vazio para manter a foto atual.' : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            defaultValue={product?.name}
            placeholder="Sofá Retrátil Linhares"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            name="price"
            defaultValue={product ? String(product.price).replace('.', ',') : ''}
            inputMode="decimal"
            placeholder="3299,90"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Categoria</Label>
        <Select
          value={category}
          onValueChange={(value) => setCategory(value as CategorySlug)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((item) => (
              <SelectItem key={item.slug} value={item.slug}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Descrição curta</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description}
          placeholder="Três lugares, retrátil e reclinável, em linho bege."
          rows={2}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="details">Ficha do produto (opcional)</Label>
        <Textarea
          id="details"
          name="details"
          defaultValue={product?.details}
          placeholder="Materiais, medidas, acabamentos e o que acompanha o móvel."
          rows={4}
        />
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-border bg-secondary/40 p-4">
        <div className="flex items-center justify-between gap-4">
          <span className="flex flex-col">
            <span className="text-sm font-medium">Destaque na página inicial</span>
            <span className="text-xs text-muted-foreground">
              Aparece na seção &quot;Os queridinhos da loja&quot;.
            </span>
          </span>
          <Switch checked={featured} onCheckedChange={setFeatured} />
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
          <span className="flex flex-col">
            <span className="text-sm font-medium">Visível na loja</span>
            <span className="text-xs text-muted-foreground">
              Desligue para esconder o produto sem apagá-lo.
            </span>
          </span>
          <Switch checked={available} onCheckedChange={setAvailable} />
        </div>
      </div>

      <Button type="submit" disabled={pending} className="w-full sm:w-auto sm:self-end">
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : product ? (
          <Save className="size-4" />
        ) : (
          <ImagePlus className="size-4" />
        )}
        {product ? 'Salvar alterações' : 'Publicar produto'}
      </Button>
    </form>
  )
}
