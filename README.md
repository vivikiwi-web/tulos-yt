# Tulos — E-commerce Store

A full-stack e-commerce web application built with **Next.js 16**, **Sanity CMS**, **Clerk Authentication**, and **Stripe Payments**. Features a product catalog, shopping cart, category browsing, order history, and a fully integrated checkout flow.

---

## Tech Stack

| Layer            | Technology                       |
| ---------------- | -------------------------------- |
| Framework        | Next.js 16 (App Router)          |
| Language         | TypeScript                       |
| Styling          | Tailwind CSS v4                  |
| UI Components    | shadcn/ui + Radix UI             |
| CMS              | Sanity v4 (with embedded Studio) |
| Auth             | Clerk                            |
| Payments         | Stripe Checkout                  |
| State Management | Zustand (persisted cart)         |
| Animations       | Motion (motion/react)            |
| Font             | Raleway (Google Fonts)           |

---

## Features

- **Product catalog** — browse all products with filtering by category
- **Product detail pages** — images, pricing, discount, stock, variant info
- **Shopping cart** — add/remove/adjust quantities, persisted in `localStorage` via Zustand
- **Stripe Checkout** — secure hosted checkout with invoice creation and promotion code support
- **Order history** — protected orders page (requires authentication)
- **Success page** — server-side redirect guard + cart reset after successful payment
- **Clerk authentication** — sign-in / sign-up flows with protected routes
- **Sanity Studio** — embedded CMS at `/studio` for managing products and categories
- **Responsive design** — mobile menu, fixed mobile cart summary, full desktop layout
- **Static pages** — About, Contact, FAQs, Privacy Policy, Terms & Conditions

---

## Project Structure

```
├── actions/
│   ├── createCheckoutSession.ts   # Server action — creates Stripe Checkout session
│   └── types.ts                   # Shared TypeScript types (Metadata interface)
│
├── app/
│   ├── (client)/                  # Main storefront layout (Header + Footer)
│   │   ├── page.tsx               # Home page — banner + product grid
│   │   ├── cart/page.tsx          # Shopping cart page
│   │   ├── product/[slug]/        # Dynamic product detail page
│   │   ├── category/[slug]/       # Dynamic category page
│   │   ├── orders/page.tsx        # Protected order history page
│   │   ├── success/               # Post-checkout success page (server-side redirect)
│   │   └── (user)/                # Static info pages (about, contact, faqs, privacy, terms)
│   ├── sign-in/ & sign-up/        # Clerk auth pages
│   └── studio/                    # Embedded Sanity Studio
│
├── components/                    # Reusable UI components
│   └── ui/                        # shadcn/ui primitives
│
├── constants/index.ts             # Static data (product types, nav links, FAQs, contact info)
├── hooks/useRequiredUser.ts       # Server-side auth guard hook (redirects if not signed in)
├── lib/stripe.ts                  # Stripe client instance
├── sanity/
│   ├── schemaTypes/               # Sanity document schemas (product, category)
│   ├── helpers/queries.ts         # GROQ query helpers
│   └── lib/                       # Sanity client, image builder, live content
├── scripts/import-products.mjs   # Seed script — imports products into Sanity
└── store.ts                       # Zustand cart store
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-28
SANITY_API_TOKEN=your_sanity_write_token

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the storefront.
Open [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

---

## Scripts

| Script                    | Description                                                                     |
| ------------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`             | Start the Next.js development server                                            |
| `npm run build`           | Build the application for production                                            |
| `npm start`               | Start the production server                                                     |
| `npm run lint`            | Run ESLint across the project                                                   |
| `npm run typegen`         | Extract Sanity schema and generate TypeScript types into `sanity.types.ts`      |
| `npm run import:products` | Seed the Sanity dataset with sample products from `scripts/import-products.mjs` |

> **Note:** `import:products` requires `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_TOKEN` to be set in `.env` or `.env.local`.

---

## Key Dependencies

### Runtime

| Package                    | Purpose                                                                |
| -------------------------- | ---------------------------------------------------------------------- |
| `next`                     | React framework with App Router, Server Components, and Server Actions |
| `react` / `react-dom`      | React 19                                                               |
| `@clerk/nextjs`            | Authentication — sign-in, sign-up, protected routes, user session      |
| `sanity`                   | Headless CMS SDK + embedded Studio                                     |
| `next-sanity`              | Next.js integration for Sanity (live content, image helpers)           |
| `@sanity/image-url`        | Generates optimised image URLs from Sanity image references            |
| `stripe`                   | Stripe Node.js SDK for creating Checkout sessions                      |
| `zustand`                  | Lightweight state management for the shopping cart (persisted)         |
| `motion`                   | Animation library (motion/react) used on the success page              |
| `react-hot-toast`          | Toast notifications for cart and checkout feedback                     |
| `lucide-react`             | Icon library                                                           |
| `tailwind-merge` / `clsx`  | Utility for conditional Tailwind class merging                         |
| `class-variance-authority` | Variant-based component styling (used by shadcn/ui)                    |
| `radix-ui`                 | Accessible headless UI primitives                                      |
| `cmdk`                     | Command palette component (used in search)                             |
| `next-themes`              | Dark/light theme support                                               |
| `styled-components`        | CSS-in-JS (used internally by Sanity Studio)                           |
| `sonner`                   | Alternative toast notification system                                  |

### Dev

| Package                                  | Purpose                             |
| ---------------------------------------- | ----------------------------------- |
| `typescript`                             | Static type checking                |
| `tailwindcss` v4                         | Utility-first CSS framework         |
| `@tailwindcss/postcss`                   | PostCSS plugin for Tailwind CSS v4  |
| `tailwindcss-animate` / `tw-animate-css` | Animation utilities for Tailwind    |
| `eslint` + `eslint-config-next`          | Linting with Next.js rules          |
| `prettier`                               | Code formatting                     |
| `shadcn`                                 | CLI for adding shadcn/ui components |

---

## Sanity Schema

### Product

Fields: `name`, `slug`, `intro`, `description`, `price`, `discount`, `stock`, `category` (reference array), `status` (new/hot/sale), `variant` (tshirt/jacket/pants/hoodie/shorts), `images`

### Category

Fields: `title`, `slug`, `description`, `image`

---

## Deployment

Deploy on [Vercel](https://vercel.com) — the easiest option for Next.js apps. Add all environment variables from `.env.local` to your Vercel project settings.

```bash
npm run build   # verify the build passes before deploying
```
