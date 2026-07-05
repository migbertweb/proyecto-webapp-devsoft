# DevSoft Turismo

> Proyecto de prueba de MoA de Hermes

Plataforma de turismo multi-cidades — Next.js 15 + TypeScript + Prisma + SQLite.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma ORM** + SQLite
- **Auth.js v5** (NextAuth) + bcrypt
- **React Hook Form** + Zod
- **Lucide Icons**

## Instalação

```bash
git clone <repo-url> devsoft-turismo
cd devsoft-turismo
npm install
```

## Configuração

```bash
cp .env.example .env
```

Gere um secret para o Auth.js:

```bash
openssl rand -base64 32
```

Substitua `AUTH_SECRET` no `.env` pelo valor gerado.

## Migrações

```bash
npx prisma migrate dev
```

## Execução

```bash
npm run dev
```

Acesse: http://localhost:3000

## Primeiro Acesso (Setup)

O sistema **não possui seed de usuários**. No primeiro acesso:

1. Acesse http://localhost:3000
2. Você será redirecionado automaticamente para `/setup`
3. Preencha nome, email e senha do administrador
4. Após criar o primeiro ADMIN, a rota `/setup` é bloqueada permanentemente

## Estrutura do Projeto

```
.
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login (email + senha)
│   │   └── register/       # Cadastro de turista
│   ├── (public)/
│   │   ├── favorites/      # Favoritos do usuário
│   │   ├── item/[id]/      # Detalhe do item turístico
│   │   └── page.tsx        # Homepage pública
│   ├── admin/
│   │   ├── cities/         # CRUD de cidades
│   │   ├── items/          # CRUD de itens turísticos
│   │   ├── settings/       # Configurações (WhatsApp)
│   │   └── page.tsx        # Dashboard admin
│   ├── api/
│   │   ├── auth/[...nextauth]/  # Auth.js API
│   │   ├── city/           # Cookie de cidade atual
│   │   └── upload/         # Upload de imagens
│   ├── setup/              # Setup inicial (primeiro admin)
│   ├── error.tsx           # Página de erro
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout raiz
│   └── not-found.tsx       # Página 404
├── components/
│   ├── city/               # CityProvider + CitySelectorModal
│   ├── empty/              # EmptyState
│   ├── items/              # ItemCard + FavoriteButton
│   ├── layout/             # Navbar
│   └── upload/             # ImageUpload
├── lib/
│   ├── actions/            # Server Actions (auth, cities, items, settings, favorites)
│   ├── categories.ts       # Enum de categorias
│   ├── prisma.ts           # Singleton Prisma
│   ├── utils.ts            # Utilitários (cn, formatPrice, parseGallery)
│   └── whatsapp.ts         # Geração de link WhatsApp
├── prisma/
│   └── schema.prisma       # Schema do banco
├── public/
│   └── uploads/            # Imagens enviadas
├── auth.config.ts          # Config Auth.js (callbacks)
├── auth.ts                 # Auth.js com credentials provider
├── middleware.ts            # Proteção de rotas
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Rotas

| Rota | Descrição | Acesso |
|------|-----------|--------|
| `/` | Homepage pública | Público |
| `/login` | Login | Público |
| `/register` | Cadastro turista | Público |
| `/setup` | Setup inicial admin | Bloqueado após uso |
| `/favorites` | Favoritos | Autenticado |
| `/item/[id]` | Detalhe do item | Público |
| `/admin` | Dashboard admin | ADMIN |
| `/admin/cities` | CRUD cidades | ADMIN |
| `/admin/items` | CRUD itens | ADMIN |
| `/admin/settings` | Configurações | ADMIN |

## Funcionalidades

- **Multi-cidades**: visitante escolhe cidade, conteúdo filtrado automaticamente
- **Autenticação**: login por email/senha com bcrypt, sessão JWT, controle por roles (ADMIN/TOURIST)
- **Painel Admin**: dashboard com stats, CRUD de cidades e itens, upload de imagens
- **Setup inicial**: primeiro ADMIN criado via `/setup`, rota bloqueada depois
- **Upload de imagens**: upload real para `/public/uploads`, suporte a imagem principal + galeria
- **Favoritos**: adicionar/remover, persistidos no banco
- **WhatsApp**: link gerado automaticamente; usa WhatsApp do item ou fallback para o padrão em Settings
- **Busca e filtros**: busca textual + filtro por categoria
- **Design premium**: estilo Airbnb/GetYourGuide, off-white, acentos roxo/vermelho, mobile-first

## Modelos

- **User**: id, name, email, password (bcrypt), role (ADMIN/TOURIST)
- **City**: id, name, state, image, active
- **TravelItem**: id, title, description, category, cityId, image, gallery, price, whatsapp, active
- **Favorite**: id, userId, itemId (unique pair)
- **Settings**: id, defaultWhatsapp

## Categorias

TOURIST_POINT, RESTAURANT, TOUR, PACKAGE, HOTEL, TRANSPORT, EXPERIENCE