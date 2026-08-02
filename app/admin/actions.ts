'use server'

import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  checkPassword,
  createSession,
  destroySession,
  isAdmin,
} from '@/lib/auth'
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '@/lib/products'
import {
  CATEGORIES,
  type CategorySlug,
  type ProductInput,
  slugify,
} from '@/lib/types'

export type ActionState = {
  ok: boolean
  message: string
}

function parsePrice(raw: string): number {
  const normalized = raw
    .replace(/[^\d,.-]/g, '')
    .replace(/\.(?=\d{3}(\D|$))/g, '')
    .replace(',', '.')

  const value = Number.parseFloat(normalized)
  return Number.isFinite(value) ? Math.max(0, value) : Number.NaN
}

function revalidateStorefront() {
  revalidatePath('/', 'layout')
}

export async function loginAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const password = String(formData.get('password') ?? '')

  if (!password) {
    return { ok: false, message: 'Informe a senha de acesso.' }
  }

  if (!checkPassword(password)) {
    return { ok: false, message: 'Senha incorreta. Tente novamente.' }
  }

  await createSession()
  redirect('/admin')
}

export async function logoutAction(): Promise<void> {
  await destroySession()
  redirect('/admin/login')
}

async function uploadImage(file: File, name: string): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const blob = await put(
    `produtos/${slugify(name) || 'produto'}-${Date.now()}.${extension}`,
    file,
    { access: 'public', contentType: file.type || undefined },
  )

  return blob.url
}

export async function saveProductAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAdmin())) {
    return { ok: false, message: 'Sessão expirada. Entre novamente.' }
  }

  const id = String(formData.get('id') ?? '').trim()
  const name = String(formData.get('name') ?? '').trim()
  const category = String(formData.get('category') ?? '') as CategorySlug
  const price = parsePrice(String(formData.get('price') ?? ''))
  const description = String(formData.get('description') ?? '').trim()
  const details = String(formData.get('details') ?? '').trim()
  const featured = formData.get('featured') === 'on'
  const available = formData.get('available') === 'on'

  let imageUrl = String(formData.get('imageUrl') ?? '').trim()
  const file = formData.get('image')

  if (!name) return { ok: false, message: 'O nome do produto é obrigatório.' }
  if (!CATEGORIES.some((c) => c.slug === category)) {
    return { ok: false, message: 'Selecione uma categoria válida.' }
  }
  if (Number.isNaN(price)) {
    return { ok: false, message: 'Informe um preço válido, ex.: 1299,90.' }
  }
  if (!description) {
    return { ok: false, message: 'Escreva uma descrição curta do produto.' }
  }

  try {
    if (file instanceof File && file.size > 0) {
      if (!file.type.startsWith('image/')) {
        return { ok: false, message: 'O arquivo enviado precisa ser uma imagem.' }
      }
      if (file.size > 8 * 1024 * 1024) {
        return { ok: false, message: 'A imagem deve ter no máximo 8 MB.' }
      }
      imageUrl = await uploadImage(file, name)
    }

    if (!imageUrl) {
      return { ok: false, message: 'Envie uma foto do produto.' }
    }

    const input: ProductInput = {
      name,
      category,
      price,
      description,
      details,
      imageUrl,
      featured,
      available,
    }

    if (id) {
      const updated = await updateProduct(id, input)
      if (!updated) {
        return { ok: false, message: 'Produto não encontrado.' }
      }
      revalidateStorefront()
      return { ok: true, message: `"${updated.name}" foi atualizado.` }
    }

    const created = await createProduct(input)
    revalidateStorefront()
    return { ok: true, message: `"${created.name}" foi publicado.` }
  } catch (error) {
    console.error('[v0] Erro ao salvar produto:', error)
    return { ok: false, message: 'Não foi possível salvar o produto agora.' }
  }
}

export async function deleteProductAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAdmin())) {
    return { ok: false, message: 'Sessão expirada. Entre novamente.' }
  }

  const id = String(formData.get('id') ?? '').trim()

  try {
    const removed = await deleteProduct(id)
    if (!removed) {
      return { ok: false, message: 'Produto não encontrado.' }
    }

    revalidateStorefront()
    return { ok: true, message: 'Produto removido.' }
  } catch (error) {
    console.error('[v0] Erro ao remover produto:', error)
    return { ok: false, message: 'Não foi possível remover o produto agora.' }
  }
}
