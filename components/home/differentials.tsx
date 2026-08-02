import { Factory, HandCoins, Ruler, Wrench } from 'lucide-react'

const ITEMS = [
  {
    icon: Factory,
    title: 'Preço de fábrica',
    text: 'Sem intermediários: você fala direto com quem produz e monta o móvel.',
  },
  {
    icon: Ruler,
    title: 'Medidas conferidas',
    text: 'Ajudamos a checar largura, altura e passagem antes de fechar o pedido.',
  },
  {
    icon: Wrench,
    title: 'Montagem no local',
    text: 'A entrega inclui a montagem, com o ambiente organizado no final.',
  },
  {
    icon: HandCoins,
    title: 'Condições combinadas',
    text: 'Formas de pagamento e prazos alinhados por WhatsApp, sem surpresa.',
  },
]

export function Differentials() {
  return (
    <section id="diferenciais" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="flex flex-col gap-3">
        <span className="text-[11px] uppercase tracking-[0.18em] text-accent">
          Como funciona
        </span>
        <h2 className="font-serif text-3xl text-balance sm:text-4xl">
          Do orçamento à sala montada
        </h2>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6"
          >
            <span className="flex size-10 items-center justify-center rounded-md bg-accent/12 text-accent">
              <item.icon className="size-5" />
            </span>
            <h3 className="font-serif text-lg">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
