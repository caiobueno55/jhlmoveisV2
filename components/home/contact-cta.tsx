import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE, whatsappLink } from '@/lib/site'

export function ContactCta() {
  return (
    <section className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-16">
        <div className="flex flex-col gap-3">
          <h2 className="max-w-xl font-serif text-3xl text-balance sm:text-4xl">
            Achou uma peça que combina com você?
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-primary-foreground/80">
            Fale com a gente pelo WhatsApp e ajudamos com medidas, prazos e condições de
            pagamento. Atendimento {SITE.hours.toLowerCase()}.
          </p>
        </div>

        <Button
          variant="secondary"
          className="h-11 shrink-0 px-6 text-base"
          render={
            <a
              href={whatsappLink('Olá! Quero um orçamento de móveis com a JHL.')}
              target="_blank"
              rel="noreferrer"
            />
          }
        >
          <MessageCircle className="size-4" />
          Falar no WhatsApp
        </Button>
      </div>
    </section>
  )
}
