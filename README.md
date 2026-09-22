# JHL Moveis V2

Site institucional e catalogo de produtos da JHL Moveis, criado com Next.js, React e Tailwind CSS.

## Sobre o projeto

O projeto apresenta a loja, categorias de moveis, produtos em destaque, diferenciais de atendimento e chamada direta para contato pelo WhatsApp.

Principais recursos:

- Pagina inicial com hero, categorias, produtos em destaque e contato
- Catalogo de produtos com filtro por categoria
- Pagina individual de produto
- Area administrativa para cadastro e gerenciamento
- Tema responsivo com paleta personalizada
- Tipografia configurada com `next/font`

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- lucide-react
- pnpm

## Como rodar localmente

Instale as dependencias:

```bash
pnpm install
```

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

Acesse no navegador:

```text
http://localhost:3000
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Estrutura principal

- `app/`: rotas e layout da aplicacao
- `components/`: componentes visuais e secoes da pagina
- `lib/`: dados, tipos e utilitarios
- `public/`: imagens e icones publicos

## Personalizacao visual

As cores globais e tokens do tema ficam em `app/globals.css`.
As fontes principais sao configuradas em `app/layout.tsx`.
