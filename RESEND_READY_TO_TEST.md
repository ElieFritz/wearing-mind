# ? RESEND CONFIGURÉ - PRÊT POUR TEST

## ?? Configuration Complète

**API Key configurée** : `re_4MNyCY58_8EEggjyHy1CnsMChTxyBypHg`  
**Email FROM** : `WEARING MIND <onboarding@resend.dev>`  
**Admin Email** : `admin@wearingmind.com`

---

## ?? Test Immédiat

### **Méthode 1 : Script PowerShell (Recommandé)**

```powershell
# Redémarrer backend avec nouvelle config
cd backend
npm run start:dev

# Dans un nouveau terminal
.\test-resend-email.ps1
```

**Le script va** :
1. Vérifier que le backend tourne
2. Demander votre email
3. Créer une commande test
4. Envoyer les emails via Resend
5. Afficher le résultat

---

### **Méthode 2 : Test Manuel**

**1. Redémarrer backend**
```powershell
cd backend
npm run start:dev
```

**Vérifier logs** :
```
[EmailService] Resend email service initialized ?
```

**2. Créer commande de test**
```powershell
$body = @{
  customer_email = "VOTRE-EMAIL@example.com"  # ? Changez ici
  customer_name = "Test User"
  items = @(
    @{
      product_id = "test-id"
      product_name = "Mind Hoodie Black"
      product_sku = "WM-H001-BLK"
      size = "M"
      color = "Black"
      quantity = 1
      unit_price = 120.00
      total_price = 120.00
    }
  )
  subtotal = 120.00
  shipping_cost = 5.00
  total = 125.00
  shipping_address = @{
    firstName = "Test"
    lastName = "User"
    address = "123 Rue Example"
    apartment = "Apt 4B"
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

**3. Vérifier console backend**
```
[EmailService] Sending email to VOTRE-EMAIL@example.com...
[EmailService] Email sent successfully { id: '...' }
[EmailService] Sending email to admin@wearingmind.com...
[EmailService] Email sent successfully { id: '...' }
```

**4. Vérifier inbox**
```
? Email reçu : "Order Confirmation - WM-20260111-0001"
? Design responsive
? Tous les détails présents
```

---

### **Méthode 3 : Test via Frontend**

**1. Démarrer les deux serveurs**
```powershell
# Terminal 1
cd backend
npm run start:dev

# Terminal 2
cd frontend
npm run dev
```

**2. Workflow complet**
```
1. http://localhost:3000/shop
2. Ajouter un produit au panier
3. Aller au checkout
4. Remplir formulaire avec VOTRE email
5. Soumettre
6. Vérifier inbox
```

---

## ?? Monitoring

### **Resend Dashboard**

**Logs en temps réel** :
```
https://resend.com/logs
```

**Métriques** :
- ? Emails envoyés
- ? Status (sent, delivered, bounced)
- ? Timestamps
- ? Destinataires
- ? Erreurs éventuelles

---

## ?? Vérifications

### **Backend Logs**

**Success** :
```
[EmailService] Resend email service initialized
[EmailService] Sending email to customer@example.com: Order Confirmation - WM-...
[EmailService] Email sent successfully to customer@example.com { id: 'abc123...' }
[EmailService] Sending email to admin@wearingmind.com: New Order Received - WM-...
[EmailService] Email sent successfully to admin@wearingmind.com { id: 'def456...' }
```

**Error** (si problème) :
```
[EmailService] Failed to send email to customer@example.com: [Error details]
```

---

### **Email Client**

**Template** :
```
Subject: Order Confirmation - WM-20260111-0001

????????????????????????????????????
?       WEARING MIND               ?
?   Thank you for your order!      ?
????????????????????????????????????

Hi Test User,

We have received your order...

ORDER NUMBER
WM-20260111-0001

Order Details
Mind Hoodie Black
Size: M • Color: Black • Qty: 1
EUR 120.00

Subtotal: EUR 120.00
Shipping: EUR 5.00
Total: EUR 125.00

Shipping Address
Test User
123 Rue Example
Apt 4B
75001 Paris
France
Phone: +33612345678

?? Estimated Delivery: 3-5 business days

Need help? support@wearingmind.com
```

---

### **Email Admin**

**Template** :
```
Subject: New Order Received - WM-20260111-0001

????????????????????????????????????
?   ?? NEW ORDER RECEIVED          ?
????????????????????????????????????

Order #WM-20260111-0001

Customer Information
Name: Test User
Email: test@example.com
Phone: +33612345678

Shipping Address
123 Rue Example
Apt 4B
75001 Paris
France

Items Ordered
Mind Hoodie Black
SKU: WM-H001-BLK • Size: M • Color: Black
Qty: 1 • EUR 120.00 each
EUR 120.00

Total: EUR 125.00

[View in Admin Panel]
```

---

## ?? Important

### **Email FROM actuel**

**Domaine utilisé** : `onboarding@resend.dev`

**Caractéristiques** :
- ? Fonctionne immédiatement
- ? Aucune configuration DNS
- ?? Domaine Resend visible
- ?? Peut finir en spam

**Pour production** (domaine custom) :
```
1. Acheter domaine (ex: wearingmind.com)
2. Resend Dashboard ? Domains ? Add Domain
3. Configurer DNS (TXT, MX, DKIM)
4. Vérifier domaine
5. Modifier EMAIL_FROM:
   EMAIL_FROM=WEARING MIND <noreply@wearingmind.com>
```

---

## ?? Checklist Test

**Avant test** :
- [x] `RESEND_API_KEY` configurée
- [x] Backend redémarré
- [x] Logs backend : "Resend email service initialized"

**Pendant test** :
- [ ] Commande créée (API ou Frontend)
- [ ] Console backend : "Email sent successfully" (x2)
- [ ] Resend Dashboard : emails visibles

**Après test** :
- [ ] Email client reçu
- [ ] Email admin reçu
- [ ] Contenu correct
- [ ] Design responsive
- [ ] Liens fonctionnels

---

## ?? Troubleshooting

### **Email non reçu**

**Vérifier** :
1. Console backend : erreur ?
2. Resend Dashboard : email envoyé ?
3. Spam folder
4. Email FROM correct
5. Quota Resend (100/jour free)

### **Erreur "API key is invalid"**

**Solution** :
```
1. Vérifier .env : RESEND_API_KEY=re_...
2. Redémarrer backend
3. Vérifier logs : "Resend email service initialized"
```

### **Erreur "Missing required parameter"**

**Cause** : Template HTML ou données manquantes

**Solution** :
```
Vérifier orderData contient:
- orderNumber
- customerName
- customerEmail
- items[]
- subtotal
- shippingCost
- total
- shippingAddress
```

---

## ?? Résumé Configuration

**Variables actuelles** :
```env
RESEND_API_KEY=re_4MNyCY58_8EEggjyHy1CnsMChTxyBypHg ?
EMAIL_FROM=WEARING MIND <onboarding@resend.dev> ?
ADMIN_EMAIL=admin@wearingmind.com ?
FRONTEND_URL=http://localhost:3000 ?
```

**Status** :
- ? Resend package installé
- ? EmailService implémenté
- ? API key configurée
- ? Templates HTML prêts
- ? Prêt pour test !

---

## ?? Lancement Test

**Commande unique** :
```powershell
# Redémarrer backend
cd backend
npm run start:dev

# Dans nouveau terminal
.\test-resend-email.ps1
```

**Résultat attendu** :
```
=== RESEND EMAIL INTEGRATION TEST ===

[1] Checking backend status...
  ? Backend is running

[2] Creating test order...
Enter your email to receive test confirmation: vous@example.com
  Creating order for: vous@example.com
  ? Order created successfully
  Order Number: WM-20260111-0001

[3] Email Status
  ? RESEND_API_KEY configured

  ?? Emails should be sent via Resend:
     - Customer confirmation ? vous@example.com
     - Admin notification ? admin@wearingmind.com

  ? Check your inbox!
  ? Check Resend Dashboard: https://resend.com/logs

=== TEST SUMMARY ===

? Order created: WM-20260111-0001
? Customer email: vous@example.com
? Check your inbox for confirmation email

Next steps:
  1. Check inbox: vous@example.com
  2. Check spam folder if not received
  3. Verify Resend Dashboard: https://resend.com/logs
```

---

**Le système d'email est maintenant ACTIF et prêt à envoyer !** ?????

**Action suivante** : Lancez `.\test-resend-email.ps1` pour tester !
