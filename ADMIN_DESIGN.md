# ?? ADMIN PANEL - WEARING MIND

## Architecture Admin Frontend

### Pages a creer
1. `/admin` - Dashboard principal
2. `/admin/products` - Gestion produits
3. `/admin/orders` - Gestion commandes
4. `/admin/customers` - Gestion clients
5. `/admin/analytics` - Statistiques
6. `/admin/settings` - Parametres

### Structure fichiers
```
frontend/src/app/admin/
??? layout.tsx              # Layout admin avec sidebar
??? page.tsx               # Dashboard
??? products/
?   ??? page.tsx          # Liste produits
?   ??? new/page.tsx      # Nouveau produit
?   ??? [id]/page.tsx     # Edit produit
??? orders/
?   ??? page.tsx          # Liste commandes
?   ??? [id]/page.tsx     # Detail commande
??? customers/
?   ??? page.tsx          # Liste clients
??? analytics/
?   ??? page.tsx          # Statistiques
??? settings/
    ??? page.tsx          # Parametres
```

### Composants admin
```
frontend/src/components/admin/
??? Sidebar.tsx           # Navigation laterale
??? StatCard.tsx          # Carte statistique
??? ProductTable.tsx      # Table produits
??? OrderTable.tsx        # Table commandes
??? ProductForm.tsx       # Formulaire produit
??? Chart.tsx            # Graphiques
```

---

## Design System Admin

### Palette couleurs
- Primary: #1E2A5A (Deep Blue)
- Success: #10B981 (Green)
- Warning: #F59E0B (Orange)
- Danger: #EF4444 (Red)
- Background: #F9FAFB (Light gray)
- Sidebar: #1F2937 (Dark gray)

### Layout
- Sidebar fixe gauche: 240px
- Header haut: 64px
- Content: Reste de l'espace
- Responsive: Sidebar collapse sur mobile

---

## Fonctionnalites

### Dashboard
- Stats principales (ventes, commandes, clients)
- Graphique revenus
- Dernieres commandes
- Produits bas stock

### Products
- Liste avec recherche/filtre
- CRUD complet
- Upload images
- Gestion variantes (tailles, couleurs)
- Stock tracking

### Orders
- Liste commandes avec statuts
- Detail commande
- Mise a jour statut
- Export CSV

### Customers
- Liste clients
- Historique achats
- Stats par client

### Analytics
- Graphiques ventes
- Top produits
- Revenus par periode
- KPIs

---

## Technologies

- Next.js App Router
- TypeScript
- Tailwind CSS
- Recharts (graphiques)
- React Hook Form (formulaires)
- Zustand (state management)
- NextAuth (authentification)

---

## Securite

### Middleware auth
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session || !isAdmin(session)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}
```

### Variables env
```env
ADMIN_EMAIL=admin@wearingmind.com
ADMIN_PASSWORD_HASH=...
SUPABASE_SERVICE_KEY=...
```

---

## API Routes

### Products
- GET /api/admin/products
- POST /api/admin/products
- PUT /api/admin/products/[id]
- DELETE /api/admin/products/[id]

### Orders
- GET /api/admin/orders
- PUT /api/admin/orders/[id]/status

### Analytics
- GET /api/admin/analytics/sales
- GET /api/admin/analytics/products

---

Status: Pret a implementer
