# ??? WEARING MIND - E-Commerce Platform

Modern, minimalist streetwear e-commerce platform built with Next.js 15, NestJS, and Supabase.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![NestJS](https://img.shields.io/badge/NestJS-10-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

---

## ? Features

### ?? E-Commerce Core
- ? Product catalog with categories
- ? Multi-image product pages
- ? Size and color variants
- ? Shopping cart with persistence
- ? Complete checkout flow
- ? Order management system
- ? Customer accounts

### ?? Email System
- ? Order confirmation emails (Resend)
- ? Admin notifications
- ? Professional HTML templates
- ? Responsive email design

### ?? Design
- ? Modern minimalist UI
- ? Framer Motion animations
- ? Fully responsive
- ? Dark mode ready
- ? Custom brand colors

### ?? Admin Panel
- ? Dashboard with analytics
- ? Product management (CRUD)
- ? Order tracking
- ? Customer management
- ? Image upload (Supabase Storage)
- ? Real-time statistics

### ?? Performance
- ? Server-side rendering (Next.js 15)
- ? Image optimization
- ? API caching
- ? Optimized bundle size

---

## ??? Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State**: Zustand
- **Forms**: React Hook Form (planned)
- **Icons**: Lucide React

### Backend
- **Framework**: NestJS 10
- **Language**: TypeScript 5
- **Database**: PostgreSQL (Supabase)
- **Storage**: Supabase Storage
- **Email**: Resend
- **Authentication**: Supabase Auth (ready)

### Infrastructure
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Email**: Resend
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

---

## ?? Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Resend account (for emails)

### 1. Clone Repository
```bash
git clone https://github.com/ElieFritz/wearing-mind.git
cd wearing-mind
```

### 2. Setup Backend
```bash
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials
```

**backend/.env**:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=WEARING MIND <noreply@yourdomain.com>
ADMIN_EMAIL=admin@yourdomain.com

PORT=3001
FRONTEND_URL=http://localhost:3000
```

**Start backend**:
```bash
npm run start:dev
# Backend runs on http://localhost:3001
```

### 3. Setup Frontend
```bash
cd frontend
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local
```

**frontend/.env.local**:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

**Start frontend**:
```bash
npm run dev
# Frontend runs on http://localhost:3000
```

### 4. Setup Database
1. Go to Supabase SQL Editor
2. Execute `database/migrate-add-sizes-colors.sql`
3. Verify tables are created

### 5. Setup Storage
1. Supabase Dashboard ? Storage
2. Create bucket named `products`
3. Set public access for read

---

## ?? Project Structure

```
wearing-mind/
??? frontend/                 # Next.js 15 Frontend
?   ??? src/
?   ?   ??? app/             # App Router pages
?   ?   ?   ??? page.tsx     # Homepage
?   ?   ?   ??? shop/        # Product catalog
?   ?   ?   ??? checkout/    # Checkout flow
?   ?   ?   ??? admin/       # Admin panel
?   ?   ??? components/      # React components
?   ?   ??? lib/             # Utilities
?   ?   ??? store/           # Zustand stores
?   ??? public/              # Static assets
?
??? backend/                 # NestJS Backend
?   ??? src/
?   ?   ??? products/        # Products module
?   ?   ??? orders/          # Orders module
?   ?   ??? customers/       # Customers module
?   ?   ??? email/           # Email service (Resend)
?   ?   ??? upload/          # Upload service
?   ?   ??? supabase/        # Supabase client
?   ??? test/                # Tests
?
??? database/                # Database scripts
    ??? schema.sql           # Complete schema
    ??? migrate-*.sql        # Migration scripts
```

---

## ?? Key Features Explained

### Featured Products
Homepage displays products marked as "featured" in admin panel. Automatic fallback if API is unavailable.

### Checkout Flow
1. Add products to cart
2. Fill shipping information
3. Review order
4. Submit (payment integration ready)
5. Receive confirmation email
6. Order success page

### Email System
- **Client**: Beautiful order confirmation with all details
- **Admin**: Notification with customer info and order details
- **Powered by**: Resend (100 emails/day free tier)

### Image Management
- Upload via admin panel
- Stored in Supabase Storage
- Automatic optimization
- SafeImage component handles Supabase private IP issue

### Size & Color Variants
- Multiple sizes per product
- Multiple colors per product
- Stock tracking per variant
- Dynamic variant selection on product page

---

## ?? Environment Variables

### Required
```env
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend (for emails)
RESEND_API_KEY=

# API
NEXT_PUBLIC_API_URL=
```

### Optional
```env
# Email customization
EMAIL_FROM=WEARING MIND <noreply@yourdomain.com>
ADMIN_EMAIL=admin@yourdomain.com

# Custom domain
FRONTEND_URL=https://yourdomain.com
```

---

## ?? Testing

### Backend API
```bash
cd backend
npm run test
```

### Frontend
```bash
cd frontend
npm run build
npm run start
```

### Quick Tests
```powershell
# Test API
.\test-api.ps1

# Test email
.\test-resend-email.ps1

# Test product page
.\test-product-page.ps1
```

---

## ?? Documentation

Complete documentation available in:
- `CHECKOUT_ORDER_SYSTEM_COMPLETE.md` - Checkout & Orders
- `RESEND_EMAIL_INTEGRATION.md` - Email setup
- `ADMIN_PANEL_COMPLETE.md` - Admin features
- `IMAGE_UPLOAD_COMPLETE.md` - Image management
- `PROJECT_COMPLETE_PRODUCTION_READY.md` - Overview

---

## ?? Deployment

### Frontend (Vercel)
1. Import repository on Vercel
2. Set environment variables
3. Deploy

**Environment variables**:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Backend (Railway/Render)
1. Create new service
2. Connect GitHub repository
3. Set build command: `cd backend && npm install && npm run build`
4. Set start command: `cd backend && npm run start:prod`
5. Set environment variables

**Environment variables**:
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
EMAIL_FROM=
ADMIN_EMAIL=
FRONTEND_URL=https://your-frontend-url.vercel.app
PORT=3001
```

---

## ?? Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ?? License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ?? Brand

**WEARING MIND** - Where consciousness meets style

**Colors**:
- Primary: `#1E2A5A` (Navy)
- Secondary: `#F8F8FA` (Light Gray)
- Accent: `#64748B` (Slate)

**Typography**:
- Headings: Geist (Bold, Black)
- Body: Geist (Regular)

---

## ?? Author

**Elie Fritz**
- GitHub: [@ElieFritz](https://github.com/ElieFritz)

---

## ? Support

Give a ?? if this project helped you!

---

## ?? Roadmap

### Phase 2
- [ ] Stripe Payment Integration
- [ ] User Authentication (Supabase Auth)
- [ ] Order Tracking
- [ ] Product Reviews
- [ ] Wishlist
- [ ] Newsletter System

### Phase 3
- [ ] Multi-currency Support
- [ ] Shipping Calculation API
- [ ] Discount Codes
- [ ] Loyalty Program
- [ ] Advanced Analytics
- [ ] Mobile App (React Native)

---

**Built with ?? for modern streetwear brands**
