'use client'

import { Menu, MessageCircle, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SITE, whatsappLink } from '@/lib/site'
import { CATEGORIES } from '@/lib/types'

const NAV_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/produtos', label: 'Produtos' },
  { href: '/#diferenciais', label: 'Como funciona' },
  { href: '/#contato', label: 'Contato' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary font-serif text-sm font-semibold text-primary-foreground">
            JHL
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base font-semibold">{SITE.name}</span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            className="h-9 px-4"
            render={
              <a
                href={whatsappLink(
                  'Olá! Vi o site da JHL Móveis e gostaria de um orçamento.',
                )}
                target="_blank"
                rel="noreferrer"
              />
            }
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border/70 bg-background md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm text-foreground hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-wrap gap-2 border-t border-border/70 pt-3">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/produtos?categoria=${category.slug}`}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {category.label}
                </Link>
              ))}
            </div>
            <Button
              className="mt-3 h-10"
              render={
                <a
                  href={whatsappLink(
                    'Olá! Vi o site da JHL Móveis e gostaria de um orçamento.',
                  )}
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              <MessageCircle className="size-4" />
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
