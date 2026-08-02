import 'server-only'
import { list, put } from '@vercel/blob'
import {
  type Product,
  type ProductInput,
  slugify,
} from '@/lib/types'

const DATA_KEY = 'data/products.json'

const SEED_PRODUCTS: Product[] = [
  {
    id: 'sofa-retratil-linhares',
    name: 'Sofá Retrátil Linhares',
    slug: 'sofa-retratil-linhares',
    category: 'sofas',
    price: 3299.9,
    description: 'Três lugares, retrátil e reclinável, em linho bege.',
    details:
      'Estrutura em madeira de reflorestamento, assento com espuma D28 e revestimento em linho de alta resistência. Acompanha almofadas soltas e pés em madeira maciça. Medidas aproximadas: 2,10m de largura, 1,00m de profundidade fechado e 1,60m aberto.',
    imageUrl: '/images/sofa-retratil-linhares.png',
    featured: true,
    available: true,
    createdAt: '2025-01-10T12:00:00.000Z',
    updatedAt: '2025-01-10T12:00:00.000Z',
  },
  {
    id: 'sofa-de-canto-marau',
    name: 'Sofá de Canto Maraú',
    slug: 'sofa-de-canto-marau',
    category: 'sofas',
    price: 4599,
    description: 'Módulo de canto amplo em veludo marrom.',
    details:
      'Sofá de canto com chaise reversível, ideal para salas amplas. Revestimento em veludo com tratamento antimanchas e estrutura reforçada. Medidas aproximadas: 2,60m x 1,80m.',
    imageUrl: '/images/sofa-canto-marau.png',
    featured: true,
    available: true,
    createdAt: '2025-01-12T12:00:00.000Z',
    updatedAt: '2025-01-12T12:00:00.000Z',
  },
  {
    id: 'mesa-de-jantar-itaipava',
    name: 'Mesa de Jantar Itaipava',
    slug: 'mesa-de-jantar-itaipava',
    category: 'mesas',
    price: 2199,
    description: 'Tampo de madeira maciça para 6 lugares.',
    details:
      'Tampo em madeira maciça com acabamento em verniz fosco e base com pés torneados. Medidas aproximadas: 1,80m x 0,90m. Cadeiras vendidas separadamente.',
    imageUrl: '/images/mesa-jantar-itaipava.png',
    featured: true,
    available: true,
    createdAt: '2025-01-14T12:00:00.000Z',
    updatedAt: '2025-01-14T12:00:00.000Z',
  },
  {
    id: 'cadeira-windsor-taquari',
    name: 'Cadeira Windsor Taquari',
    slug: 'cadeira-windsor-taquari',
    category: 'cadeiras',
    price: 549,
    description: 'Design clássico em madeira maciça torneada.',
    details:
      'Cadeira Windsor em madeira maciça com encosto de ripas torneadas e assento anatômico. Disponível em acabamento natural, mel e imbuia. Vendida por unidade.',
    imageUrl: '/images/cadeira-windsor-taquari.png',
    featured: true,
    available: true,
    createdAt: '2025-01-16T12:00:00.000Z',
    updatedAt: '2025-01-16T12:00:00.000Z',
  },
  {
    id: 'estante-modular-serrinha',
    name: 'Estante Modular Serrinha',
    slug: 'estante-modular-serrinha',
    category: 'estantes',
    price: 1899,
    description: 'Módulos combináveis em madeira e metal.',
    details:
      'Estante com prateleiras em madeira e estrutura em metal com pintura eletrostática. Os módulos podem ser combinados na horizontal ou vertical conforme o espaço disponível.',
    imageUrl: '/images/estante-modular-serrinha.png',
    featured: true,
    available: true,
    createdAt: '2025-01-18T12:00:00.000Z',
    updatedAt: '2025-01-18T12:00:00.000Z',
  },
  {
    id: 'cama-box-canela',
    name: 'Cama Estofada Canela',
    slug: 'cama-estofada-canela',
    category: 'quarto',
    price: 2749,
    description: 'Cabeceira alta estofada em tecido areia.',
    details:
      'Cama queen size com cabeceira alta estofada, estrutura em madeira e pés aparentes. Colchão não incluído. Medidas aproximadas: 1,58m x 1,98m.',
    imageUrl: '/images/cama-box-canela.png',
    featured: false,
    available: true,
    createdAt: '2025-01-20T12:00:00.000Z',
    updatedAt: '2025-01-20T12:00:00.000Z',
  },
]

async function findDataBlobUrl(): Promise<string | null> {
  const { blobs } = await list({ prefix: DATA_KEY, limit: 1 })
  return blobs[0]?.url ?? null
}

async function writeAll(products: Product[]): Promise<void> {
  await put(DATA_KEY, JSON.stringify(products, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  })
}

export async function getProducts(): Promise<Product[]> {
  try {
    const url = await findDataBlobUrl()

    if (!url) {
      await writeAll(SEED_PRODUCTS)
      return SEED_PRODUCTS
    }

    const response = await fetch(`${url}?t=${Date.now()}`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      return SEED_PRODUCTS
    }

    const parsed = (await response.json()) as Product[]
    return Array.isArray(parsed) ? parsed : SEED_PRODUCTS
  } catch (error) {
    console.error('[v0] Falha ao carregar produtos do Blob:', error)
    return SEED_PRODUCTS
  }
}

export async function getVisibleProducts(): Promise<Product[]> {
  const products = await getProducts()
  return products.filter((product) => product.available)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts()
  return products.find((product) => product.slug === slug) ?? null
}

function uniqueSlug(base: string, products: Product[], ignoreId?: string) {
  const fallback = base || 'produto'
  let slug = fallback
  let counter = 2

  while (products.some((p) => p.slug === slug && p.id !== ignoreId)) {
    slug = `${fallback}-${counter}`
    counter += 1
  }

  return slug
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const products = await getProducts()
  const now = new Date().toISOString()

  const product: Product = {
    ...input,
    id: crypto.randomUUID(),
    slug: uniqueSlug(slugify(input.name), products),
    createdAt: now,
    updatedAt: now,
  }

  await writeAll([product, ...products])
  return product
}

export async function updateProduct(
  id: string,
  input: ProductInput,
): Promise<Product | null> {
  const products = await getProducts()
  const current = products.find((product) => product.id === id)

  if (!current) return null

  const updated: Product = {
    ...current,
    ...input,
    slug: uniqueSlug(slugify(input.name), products, id),
    updatedAt: new Date().toISOString(),
  }

  await writeAll(products.map((product) => (product.id === id ? updated : product)))
  return updated
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getProducts()
  const next = products.filter((product) => product.id !== id)

  if (next.length === products.length) return false

  await writeAll(next)
  return true
}
