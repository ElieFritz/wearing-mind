# ?? Resend Email Integration - Complete Guide

## ? Implémentation

### **1. Installation**

```bash
cd backend
npm install resend
```

**Version installée** : Latest (compatible NestJS)

---

## ?? Configuration

### **Étape 1 : Créer un compte Resend**

1. **Aller sur** : https://resend.com
2. **Sign up** avec GitHub ou Email
3. **Verify email** (vérification obligatoire)

### **Étape 2 : Obtenir API Key**

```
1. Dashboard Resend ? API Keys
2. Cliquer "Create API Key"
3. Nom: "WEARING MIND Production" (ou "Development")
4. Permissions: "Full Access" ou "Sending Access"
5. Copier la clé (commence par "re_...")
```

**Important** : La clé ne sera affichée qu'une seule fois !

### **Étape 3 : Configurer .env**

**backend/.env** :
```env
# Resend Configuration
RESEND_API_KEY=re_YOUR_ACTUAL_API_KEY_HERE
EMAIL_FROM=WEARING MIND <noreply@wearingmind.com>
ADMIN_EMAIL=admin@wearingmind.com
FRONTEND_URL=http://localhost:3000
```

**Variables requises** :
- ? `RESEND_API_KEY` - Clé API Resend (obligatoire pour envoi)
- ? `EMAIL_FROM` - Email expéditeur avec nom
- ? `ADMIN_EMAIL` - Email admin pour notifications
- ? `FRONTEND_URL` - URL frontend pour liens

---

## ?? Domaine Email

### **Option A : Email Resend (Par défaut - Gratuit)**

**Format** : `noreply@resend.dev`

**Avantages** :
- ? Aucune configuration domaine
- ? Fonctionne immédiatement
- ? Parfait pour développement
- ? 100 emails/jour gratuits

**Inconvénients** :
- ?? Domaine "resend.dev" visible
- ?? Peut finir en spam

**Usage** :
```env
EMAIL_FROM=WEARING MIND <noreply@resend.dev>
```

### **Option B : Domaine Personnalisé (Recommandé Production)**

**Prérequis** : Avoir un domaine (ex: wearingmind.com)

**Configuration DNS** :
```
1. Resend Dashboard ? Domains
2. Cliquer "Add Domain"
3. Entrer votre domaine: wearingmind.com
4. Ajouter les records DNS fournis:

   Type  | Name           | Value
   ------|----------------|------------------------
   TXT   | @              | resend-verification=...
   MX    | @              | mail.resend.com
   TXT   | resend._domainkey | v=DKIM1; k=rsa; p=...
```

**Vérification** :
```
? Attendre propagation DNS (5-60 min)
? Cliquer "Verify Domain" sur Resend
? Status "Verified" ?
```

**Usage** :
```env
EMAIL_FROM=WEARING MIND <noreply@wearingmind.com>
```

---

## ?? Tests

### **Test 1 : Mode Développement (Sans API Key)**

**Si `RESEND_API_KEY` n'est pas définie** :

```bash
cd backend
npm run start:dev
```

**Résultat** :
```
[EmailService] RESEND_API_KEY not found - emails will only be logged
[EmailService] Sending email to customer@example.com: Order Confirmation
[EmailService] [DEV MODE] Email content for customer@example.com:
[EmailService] Subject: Order Confirmation - WM-20260111-0001
[EmailService] HTML length: 5432 chars
```

**? Emails loggés mais pas envoyés**

---

### **Test 2 : Mode Production (Avec API Key)**

**Avec `RESEND_API_KEY` configurée** :

```bash
cd backend
npm run start:dev
```

**Résultat** :
```
[EmailService] Resend email service initialized
[EmailService] Sending email to customer@example.com: Order Confirmation
[EmailService] Email sent successfully to customer@example.com { id: 'abc123...' }
```

**? Emails envoyés via Resend**

---

### **Test 3 : Créer une commande**

**PowerShell** :
```powershell
$body = @{
  customer_email = "votre-email@example.com"
  customer_name = "Test User"
  items = @(
    @{
      product_id = "test-id"
      product_name = "Test Hoodie"
      product_sku = "TEST-001"
      size = "M"
      color = "Black"
      quantity = 1
      unit_price = 120
      total_price = 120
    }
  )
  subtotal = 120
  shipping_cost = 5
  total = 125
  shipping_address = @{
    firstName = "Test"
    lastName = "User"
    address = "123 Test St"
    city = "Paris"
    country = "France"
    postalCode = "75001"
    phone = "+33612345678"
  }
  payment_method = "credit_card"
  payment_status = "completed"
  status = "pending"
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:3001/api/orders" `
  -Method POST `
  -Body $body `
  -ContentType "application/json"
```

**Vérifier** :
1. ? Console backend : "Email sent successfully"
2. ? Inbox client : Email reçu
3. ? Inbox admin : Email reçu
4. ? Resend Dashboard : Logs visibles

---

## ?? Templates Email

### **Email Client - Confirmation Commande**

**Subject** : `Order Confirmation - WM-20260111-0001`

**Contenu** :
```
????????????????????????????????????
?       WEARING MIND               ?
?   Thank you for your order!      ?
????????????????????????????????????

Hi Jean Dupont,

We have received your order...

????????????????????????????????????
?      Order Number                ?
?   WM-20260111-0001               ?
????????????????????????????????????

Order Details:
- Mind Hoodie Black
  Size: M • Color: Black • Qty: 1
  EUR 120.00

Subtotal: EUR 120.00
Shipping: EUR 5.00
Total: EUR 125.00

Shipping Address:
Jean Dupont
123 Rue Example
75001 Paris
France
Phone: +33612345678

?? Estimated Delivery: 3-5 business days

Need help? support@wearingmind.com
```

---

### **Email Admin - Nouvelle Commande**

**Subject** : `New Order Received - WM-20260111-0001`

**Contenu** :
```
????????????????????????????????????
?   ?? NEW ORDER RECEIVED          ?
????????????????????????????????????
????????????????????????????????????
?     Order #WM-20260111-0001      ?
????????????????????????????????????

Customer Information:
Name: Jean Dupont
Email: jean@example.com
Phone: +33612345678

Shipping Address:
123 Rue Example
75001 Paris
France

Items Ordered:
- Mind Hoodie Black
  SKU: WM-H001-BLK • Size: M • Color: Black
  Qty: 1 • EUR 120.00 each
  EUR 120.00

Subtotal: EUR 120.00
Shipping: EUR 5.00
Total: EUR 125.00

[View in Admin Panel]
```

---

## ?? Monitoring

### **Resend Dashboard**

**Logs** : https://resend.com/logs

**Métriques disponibles** :
- ? Emails envoyés
- ? Emails délivrés
- ? Emails ouverts
- ? Clics
- ? Bounces
- ? Spam reports

**Filtres** :
```
- Par date
- Par destinataire
- Par statut (sent, delivered, bounced)
- Par domaine
```

---

## ?? Pricing Resend

### **Free Tier**
```
- 100 emails/jour
- 3,000 emails/mois
- 1 domaine
- API access
- Email logs (30 jours)
```

**Parfait pour** :
- ? Développement
- ? Petite boutique (< 3 commandes/jour)
- ? Tests

### **Pro Plan** ($20/mois)
```
- 50,000 emails/mois
- Domaines illimités
- Email logs (90 jours)
- Support prioritaire
```

**Recommandé pour** :
- ? Production
- ? 10-100 commandes/jour
- ? Multi-domaines

### **Business Plan** (Custom)
```
- 100,000+ emails/mois
- SLA garantie
- Dedicated IP
- Support 24/7
```

---

## ??? Troubleshooting

### **Erreur : "API key is invalid"**

**Cause** : Mauvaise clé API

**Solution** :
```
1. Vérifier RESEND_API_KEY dans .env
2. Clé doit commencer par "re_"
3. Pas d'espaces avant/après
4. Recréer clé si nécessaire
```

---

### **Emails ne sont pas reçus**

**Vérifier** :
```
1. Console backend : "Email sent successfully" ?
2. Resend Dashboard ? Logs : Email envoyé ?
3. Spam folder du destinataire
4. Email FROM valide
5. Domaine vérifié (si custom)
```

---

### **Emails en spam**

**Solutions** :
```
1. Utiliser domaine personnalisé
2. Configurer SPF, DKIM, DMARC
3. Réchauffer domaine (envoyer progressivement)
4. Éviter mots spam ("free", "urgent", etc.)
5. Bon ratio texte/images
```

---

## ?? Checklist Production

### **Avant déploiement** :
- [ ] Compte Resend créé
- [ ] API key générée
- [ ] `RESEND_API_KEY` dans .env production
- [ ] `EMAIL_FROM` configuré
- [ ] `ADMIN_EMAIL` configuré
- [ ] Domaine ajouté (recommandé)
- [ ] DNS configurés (si domaine custom)
- [ ] Domaine vérifié
- [ ] Tests envoi effectués
- [ ] Templates validés
- [ ] Monitoring configuré

### **Post-déploiement** :
- [ ] Premier email test envoyé
- [ ] Email reçu en inbox (pas spam)
- [ ] Logs Resend vérifiés
- [ ] Métriques suivies
- [ ] Plan upgrader si nécessaire

---

## ?? Ressources

**Documentation** :
- Resend Docs: https://resend.com/docs
- Node.js SDK: https://resend.com/docs/send-with-nodejs
- API Reference: https://resend.com/docs/api-reference

**Support** :
- Dashboard: https://resend.com
- Discord: https://resend.com/discord
- Email: support@resend.com

**Status** :
- https://status.resend.com

---

## ? Résultat

**Système Email Complet** :
```
Order créée
    ?
EmailService.sendOrderConfirmationToCustomer()
    ?
Resend.emails.send()
    ?
Email client envoyé ?
    ?
EmailService.sendOrderNotificationToAdmin()
    ?
Resend.emails.send()
    ?
Email admin envoyé ?
```

**Fonctionnel** :
- ? Templates HTML professionnels
- ? Responsive design
- ? Envoi via Resend
- ? Logs détaillés
- ? Gestion erreurs
- ? Mode dev (logs only)
- ? Mode prod (envoi réel)

---

**Dernière mise à jour** : 2026-01-11  
**Status** : ? Resend Integration Complete
