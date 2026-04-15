# A/B Testing E-Commerce Application

A modern e-commerce platform built with Next.js designed to collect data for conducting A/B testing experiments on user purchase behavior. The application tracks user interactions, assigns experiment variants, and records events to analyze which product presentations and checkout flows yield better conversion rates.

## Overview

This application is a data collection platform for e-commerce A/B testing research. It combines:

- **E-commerce functionality**: Product browsing, shopping cart, checkout flow
- **Clerk authentication**: User sign-up/sign-in with automatic experiment assignment
- **A/B Testing infrastructure**: Variant assignment, event tracking, statistical analysis ready
- **Admin dashboard**: Order management and analytics

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: Clerk
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Styling**: Tailwind CSS + shadcn/ui
- **TypeScript**: Full type safety

## Features

### Customer Features

- **Product Catalog**: Browse products with images, prices, descriptions
- **Shopping Cart**: Guest cart (localStorage) + synced cart for logged-in users
- **Checkout Flow**: Shipping form, order placement
- **Authentication**: Clerk sign-in/sign-up with webhook user creation

### Experiment Features

- **Variant Assignment**: Users automatically assigned to experiment variants on signup
- **Event Tracking**: Browse, add-to-cart, checkout events recorded
- **Assignment Storage**: User-variant mappings stored for consistent experience

### Admin Features

- **Dashboard**: Revenue, orders, products, customers stats
- **Order Management**: View all placed orders with details
- **Protected Access**: Email-based admin authorization

## Project Structure

```
src/
├── app/
│   ├── (landing)/           # Public shop pages
│   │   ├── products/        # Product catalog
│   │   ├── cart/           # Shopping cart
│   │   └── checkout/       # Checkout flow
│   ├── admin/              # Admin dashboard
│   │   ├── page.tsx        # Dashboard stats
│   │   └── orders/         # Order management
│   ├── api/               # API routes
│   │   ├── admin/          # Admin endpoints
│   │   ├── cart/          # Cart CRUD
│   │   ├── checkout/      # Order placement
│   │   ├── products/      # Product listing
│   │   ├── event/        # Event tracking
│   │   ├── experiment/   # Experiment configs
│   │   ├── assignment/  # Variant assignments
│   │   └── webhooks/    # Clerk webhooks
│   └── order-confirmation/ # Post-checkout
├── components/
│   ├── context/          # CartContext
│   ├── molecule/          # ProductsGrid, StatsSection
│   ├── shared/           # NavBar, Footer
│   └── ui/               # shadcn components
├── config/               # Site and route configs
├── lib/                 # Prisma client
└── prisma/              # Database schema
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn/bun)
- PostgreSQL database (Neon)
- Clerk account

### Installation

1. Clone and install dependencies:

```bash
cd ab-testing-app
npm install
# or
pnpm install
```

2. Set up environment variables:

Create `.env.local` with:

```env
# Database (Neon)
DATABASE_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
CLERK_WEBHOOK_SECRET="whsec_..."

# Experiment IDs (from Prisma database)
HOMEPAGE_EXPERIMENT_ID="uuid-here"
PRODUCT_EXPERIMENT_ID="uuid-here"

# Admin email (for admin dashboard access)
ADMIN_EMAIL="your-email@example.com"
NEXT_PUBLIC_ADMIN_EMAIL="your-email@example.com"
```

3. Initialize database:

```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable                            | Description                                |
| ----------------------------------- | ------------------------------------------ |
| `DATABASE_URL`                      | Neon PostgreSQL connection string          |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (starts with `pk_`)  |
| `CLERK_SECRET_KEY`                  | Clerk secret key (starts with `sk_`)       |
| `CLERK_WEBHOOK_SECRET`              | Clerk webhook signing secret               |
| `HOMEPAGE_EXPERIMENT_ID`            | UUID of homepage experiment                |
| `PRODUCT_EXPERIMENT_ID`             | UUID of products page experiment           |
| `ADMIN_EMAIL`                       | Admin email for dashboard access           |
| `NEXT_PUBLIC_ADMIN_EMAIL`           | Same as ADMIN_EMAIL for client-side checks |

## A/B Testing Flow

### Experiment Setup

1. **Create experiments** in database:

```bash
# Via Prisma Studio
npx prisma studio
```

2. **Create Variants** for each experiment:

- Homepage Experiment: "Control" (A), "Variant B" (B)
- Products Experiment: "Grid View" (A), "List View" (B)

3. **Assign Users**: When a user signs up via Clerk:
   - Webhook triggers `user.created` event
   - Variant assigned deterministically based on user ID
   - Assignment stored in `Assignment` table

### Event Tracking

Events tracked via `/api/event`:

- `browse`: Product/page views
- `add_to_cart`: Cart additions
- `checkout_start`: Checkout initiated
- `order_placed`: Purchase completed

### Data Export

Export experiment data via `/api/export` for analysis in R/Python.

## API Routes

### Public Routes

| Endpoint              | Method     | Description              |
| --------------------- | ---------- | ------------------------ |
| `/api/products`       | GET        | List products            |
| `/api/categories`     | GET        | List categories          |
| `/api/cart`           | GET/POST   | Get/create cart          |
| `/api/cart/[id]`      | PUT/DELETE | Update/remove item       |
| `/api/checkout`       | GET/POST   | Get orders / Place order |
| `/api/webhooks/clerk` | POST       | Clerk user webhooks      |

### Protected Routes (Authenticated)

| Endpoint          | Method | Description          |
| ----------------- | ------ | -------------------- |
| `/api/event`      | POST   | Track event          |
| `/api/assignment` | GET    | Get user assignments |

### Admin Routes

| Endpoint            | Method | Description          |
| ------------------- | ------ | -------------------- |
| `/api/admin/stats`  | GET    | Dashboard statistics |
| `/api/admin/orders` | GET    | All orders           |
| `/admin`            | -      | Admin dashboard      |
| `/admin/orders`     | -      | Order management     |

### Experiment Routes

| Endpoint          | Method | Description              |
| ----------------- | ------ | ------------------------ |
| `/api/experiment` | GET    | List experiments         |
| `/api/variant`    | GET    | List variants            |
| `/api/export`     | GET    | Export data for analysis |

## User Roles

### Regular Users

- Browse products
- Add items to cart (guest or signed-in)
- Checkout with shipping info
- Sign in via Clerk

### Admin User

- Access `/admin` dashboard
- View all orders and statistics
- Export data for analysis
- Denied access for non-admin emails

Set admin email in `.env`:

```
ADMIN_EMAIL="your-admin@email.com"
```

## Database Schema

### Core Models

- **User**: Clerk user ID + email
- **Experiment**: A/B test definition
- **Variant**: Experiment arm (Control vs Treatment)
- **Assignment**: User → Variant mapping
- **Event**: User interaction log
- **Product**: E-commerce product
- **Category**: Product category
- **Order**: Customer order
- **OrderItem**: Line item in order

## Scripts

| Command                   | Description                |
| ------------------------- | -------------------------- |
| `pnpm dev`             | Start dev server           |
| `pnpm build`           | Production build (no lint) |
| `pnpm start`           | Start production server    |
| `pnpm lint`            | Run ESLint                 |
| `pnpm prisma:generate` | Generate Prisma client     |
| `pnpm prisma:push`     | Push schema to DB          |
| `pnpm prisma:studio`   | Open Prisma Studio         |

## License

MIT
