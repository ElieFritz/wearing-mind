# ?? Fix : Erreur "use client" avec Guillemets Invalides

## ? Problème

**Erreurs dans la console** :
```
./src/app/checkout/page.tsx:3:20
You're importing a component that needs `useEffect`. 
This React Hook only works in a Client Component. 
To fix, mark the file (or its parent) with the "use client" directive.

./src/app/checkout/page.tsx:4:10
You're importing a component that needs `useRouter`. 
This React Hook only works in a Client Component.

./src/app/checkout/page.tsx:3:10
You're importing a component that needs `useState`. 
This React Hook only works in a Client Component.
```

---

## ?? Cause Racine

**Ligne 1 du fichier** :
```typescript
`use client`;  // ? MAUVAIS - Guillemets typographiques (backticks)
```

**Ce qui devrait être** :
```typescript
"use client";  // ? BON - Guillemets droits
```

### **Différence visuelle**

| Type | Caractère | Code Unicode | Valide Next.js |
|------|-----------|--------------|----------------|
| **Backtick** | `` ` `` | U+0060 | ? Non |
| **Guillemet simple** | `'` | U+0027 | ? Oui |
| **Guillemet double** | `"` | U+0022 | ? Oui |

---

## ? Solution

**Remplacer** :
```typescript
`use client`;
```

**Par** :
```typescript
"use client";
```

---

## ?? Vérification

### **Test 1 : Console navigateur**

**Avant** :
```
? Ecmascript file had an error (x3)
? You're importing a component that needs useEffect
? You're importing a component that needs useRouter
? You're importing a component that needs useState
```

**Après** :
```
? Aucune erreur
? Page charge correctement
? Hooks React fonctionnent
```

### **Test 2 : Page Checkout**

```
1. http://localhost:3000/checkout
2. Page s'affiche sans erreur
3. Formulaire interactif
4. Validation fonctionne
5. Submit possible
```

---

## ?? Pourquoi cette erreur ?

### **1. Directive Next.js stricte**

Next.js 13+ App Router utilise **Server Components** par défaut.

Pour utiliser des **Client Components** (avec hooks React), il faut la directive :
```typescript
"use client";
```

Cette directive **DOIT** :
- ? Être en **première ligne** du fichier
- ? Utiliser des **guillemets droits** (`"` ou `'`)
- ? Être suivie d'un **point-virgule**
- ? **PAS** de backticks (`` ` ``)

### **2. Confusion backticks**

Les **backticks** (`` ` ``) sont utilisés pour :
- Template literals : `` `Hello ${name}` ``
- Multiline strings

Mais **PAS** pour les directives Next.js.

### **3. Copier/Coller depuis documentation**

Certains éditeurs riches (Word, Google Docs, etc.) convertissent automatiquement les guillemets droits en guillemets typographiques.

Si vous copiez du code depuis ces sources :
```
"use client"  ?  "use client"  (guillemets courbes)
```

Next.js ne reconnaît **PAS** ces guillemets courbes.

---

## ?? Comment éviter ce problème ?

### **1. Toujours utiliser un éditeur de code**

? **Bons éditeurs** :
- VS Code
- WebStorm
- Sublime Text
- Vim / Neovim

? **Éviter** :
- Microsoft Word
- Google Docs
- Notepad (peut introduire des caractères invisibles)

### **2. Vérifier l'encodage**

Assurez-vous que vos fichiers sont en **UTF-8** :
```
VS Code ? Bottom right ? UTF-8
```

### **3. Linter / Formatter**

**ESLint** détectera ce genre d'erreur :
```json
// .eslintrc.json
{
  "rules": {
    "quotes": ["error", "double"]
  }
}
```

**Prettier** corrigera automatiquement :
```json
// .prettierrc
{
  "singleQuote": false,
  "semi": true
}
```

---

## ??? Commandes de Vérification

### **PowerShell - Trouver backticks invalides**

```powershell
# Chercher fichiers avec backticks en première ligne
Get-ChildItem -Path "frontend/src" -Recurse -Filter "*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match "^``use client``") {
        Write-Host "? Invalid: $($_.FullName)" -ForegroundColor Red
    }
}
```

### **Node.js - Script de vérification**

```javascript
const fs = require('fs');
const path = require('path');

function checkFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      checkFiles(fullPath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for backtick "use client"
      if (content.startsWith('`use client`')) {
        console.log('? Invalid backticks:', fullPath);
      }
      
      // Check for proper "use client"
      if (content.startsWith('"use client"') || content.startsWith("'use client'")) {
        console.log('? Valid directive:', fullPath);
      }
    }
  });
}

checkFiles('./frontend/src/app');
```

---

## ?? Autres Directives Next.js

Ces directives suivent les **mêmes règles** :

```typescript
"use client";     // Client Component
"use server";     // Server Action
"use strict";     // Strict mode JavaScript
```

**Toutes nécessitent** :
- Guillemets droits (`"` ou `'`)
- Première ligne du fichier
- Point-virgule

---

## ?? Diagnostic Rapide

**Si vous voyez l'erreur** :
```
You're importing a component that needs [Hook]. 
This React Hook only works in a Client Component.
```

**Vérifiez** :
1. ? Y a-t-il `"use client";` en ligne 1 ?
2. ? Est-ce avec des guillemets droits ?
3. ? Y a-t-il un point-virgule ?
4. ? Pas de backticks ?
5. ? Pas d'espace avant ?

---

## ? Checklist Post-Fix

- [x] Remplacé backticks par guillemets droits
- [x] Vérifié que `"use client";` est en ligne 1
- [x] Sauvegardé le fichier
- [x] Hot reload déclenché (Fast Refresh)
- [x] Console sans erreurs
- [x] Page checkout fonctionne
- [x] Hooks React opérationnels

---

## ?? Résultat

**Avant** :
```typescript
`use client`;  // ? Erreur
```

**Après** :
```typescript
"use client";  // ? Fonctionne
```

**Impact** :
- ? Page checkout charge
- ? useState fonctionne
- ? useEffect fonctionne
- ? useRouter fonctionne
- ? Formulaire interactif
- ? Système de commande opérationnel

---

## ?? Références

**Documentation Next.js** :
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Directives](https://nextjs.org/docs/app/api-reference/directives/use-client)

**React Docs** :
- [Client Components](https://react.dev/reference/react/use-client)

---

**Dernière mise à jour** : 2026-01-11  
**Status** : ? Problème Résolu - Backticks Remplacés
