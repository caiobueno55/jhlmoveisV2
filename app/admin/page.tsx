import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { isAdmin } from '@/lib/auth'
import { getProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Painel de produtos | JHL Móveis',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  if (!(await isAdmin())) redirect('/admin/login')

  const products = await getProducts()

  return <AdminDashboard products={products} />
}
