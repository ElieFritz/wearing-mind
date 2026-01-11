# WEARING MIND - Frontend

Next.js 15 e-commerce application for WEARING MIND fashion brand.

## ?? Quick Start

### Development

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your values
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Run development server
npm run dev
```

Visit http://localhost:3000

## ?? Build

```bash
npm run build
npm start
```

## ?? Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ElieFritz/wearing-mind&root-directory=frontend)

### Manual Deployment

1. Push to GitHub
2. Import project on Vercel: https://vercel.com/enollafritzs-projects
3. Set root directory to `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL`
5. Deploy

See [VERCEL_DEPLOYMENT_GUIDE.md](../VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions.

## ?? Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://api.wearingmind.com/api` |

## ?? Project Structure

```
frontend/
??? src/
?   ??? app/              # Next.js 15 App Router pages
?   ?   ??? admin/        # Admin panel
?   ?   ??? shop/         # Shop & product pages
?   ?   ??? cart/         # Shopping cart
?   ?   ??? checkout/     # Checkout flow
?   ?   ??? order-success/ # Order confirmation
?   ??? components/       # Reusable React components
?   ??? lib/              # Utilities & API client
?   ??? store/            # Zustand state management
??? public/               # Static assets
??? package.json
```

## ??? Tech Stack

- **Framework:** Next.js 15 (App Router)
- **React:** 19.2.3
- **Styling:** Tailwind CSS 4
- **State:** Zustand
- **Animations:** Framer Motion
- **HTTP Client:** Axios
- **Icons:** Lucide React

## ?? Features

- ? Responsive design
- ? Server-side rendering
- ? Shopping cart
- ? Product variants (sizes, colors)
- ? Checkout flow
- ? Admin panel
- ? Order management
- ? Image optimization

## ?? Related

- Backend API: [../backend](../backend)
- Database Schema: [../database](../database)
- Full Documentation: [../VERCEL_DEPLOYMENT_GUIDE.md](../VERCEL_DEPLOYMENT_GUIDE.md)

## ?? License

Private - WEARING MIND © 2026
