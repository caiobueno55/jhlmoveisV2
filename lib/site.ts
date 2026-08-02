export const SITE = {
  name: 'JHL Móveis',
  tagline: 'Qualidade e Confiança',
  whatsappNumber: '5511999999999',
  phoneLabel: '(11) 99999-9999',
  email: 'contato@jhlmoveis.com.br',
  hours: 'Seg a Sex, 8h às 18h · Sáb, 8h às 13h',
  address: 'Atendimento e entrega na região metropolitana',
}

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}
