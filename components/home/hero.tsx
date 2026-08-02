import { MessageCircle, Truck, Wrench } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { whatsappLink } from '@/lib/site'

export function Hero() {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-accent">
            Direto da fábrica para sua casa
          </span>

          <h1 className="font-serif text-4xl leading-[1.1] text-balance sm:text-5xl lg:text-6xl">
            Móveis da fábrica, entrega e montagem.
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Na JHL Móveis você encontra sofás, mesas, cadeiras e móveis para todos os
            ambientes com atendimento direto, entrega combinada e montagem no local.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              className="h-11 px-6 text-base"
              render={<Link href="/produtos" />}
            >
              Ver produtos
            </Button>
            <Button
              variant="outline"
              className="h-11 px-6 text-base"
              render={
                <a
                  href={whatsappLink(
                    'Olá! Gostaria de saber mais sobre os móveis da JHL.',
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

          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Truck className="size-4 text-accent" />
              Entrega combinada
            </span>
            <span className="flex items-center gap-2">
              <Wrench className="size-4 text-accent" />
              Montagem no local
            </span>
          </div>
        </div>

        <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-card">
          <Image
            src="/images/hero-living-room.png"
            alt="Sala de estar montada com sofá de linho bege e mesa de centro em madeira"
            fill
            priority
            sizes="(min-width: 1024px) 560px, 92vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
