import { CategoryGrid } from '@/components/home/category-grid'
import { ContactCta } from '@/components/home/contact-cta'
import { Differentials } from '@/components/home/differentials'
import { FeaturedProducts } from '@/components/home/featured-products'
import { Hero } from '@/components/home/hero'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { getVisibleProducts } from '@/lib/products'

export default async function HomePage() {
  const products = await getVisibleProducts()

  const counts = products.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] ?? 0) + 1
    return acc
  }, {})

  const featured = products.filter((product) => product.featured)
  const highlights = featured.length > 0 ? featured : products

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <CategoryGrid counts={counts} />
        <FeaturedProducts products={highlights} />
        <Differentials />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  )
}
