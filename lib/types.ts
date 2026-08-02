export type CategorySlug = 'sofas' | 'mesas' | 'cadeiras' | 'quarto' | 'estantes'

export type Category = {
  slug: CategorySlug
  label: string
  tagline: string
}

export const CATEGORIES: Category[] = [
  { slug: 'sofas', label: 'Sofás', tagline: 'Conforto para o dia a dia' },
  { slug: 'mesas', label: 'Mesas', tagline: 'Para reunir e trabalhar' },
  { slug: 'cadeiras', label: 'Cadeiras', tagline: 'Estilo em cada detalhe' },
  { slug: 'quarto', label: 'Quarto', tagline: 'Camas, criados e cômodas' },
  { slug: 'estantes', label: 'Estantes', tagline: 'Organização com charme' },
]

export function categoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug
}

export type Product = {
  id: string
  name: string
  slug: string
  category: CategorySlug
  price: number
  description: string
  details: string
  imageUrl: string
  featured: boolean
  available: boolean
  createdAt: string
  updatedAt: string
}

export type ProductInput = {
  name: string
  category: CategorySlug
  price: number
  description: string
  details: string
  imageUrl: string
  featured: boolean
  available: boolean
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}
