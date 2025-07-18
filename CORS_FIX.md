# 🔧 Correction des Problèmes CORS

## 🚨 Problème Identifié

L'API Xarala Bootcamp rencontrait des erreurs CORS lors des requêtes depuis le frontend déployé sur Netlify :
- `https://bootcampsxaralafront.netlify.app`
- `https://bootcamps-xarala-front.netlify.app`

### Erreurs Observées
```
Access to XMLHttpRequest at 'https://bootcamps-xarala-back-production.up.railway.app/api/v1/auth/login' 
from origin 'https://bootcampsxaralafront.netlify.app' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## ✅ Solutions Implémentées

### 1. Configuration CORS Mise à Jour

**Fichier modifié :** `src/main.ts`

```typescript
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://bootcampsxaralafront.netlify.app',
  'https://bootcamps-xarala-front.netlify.app'
];

app.enableCors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
});
```

### 2. Middleware CORS Personnalisé

**Nouveau fichier :** `src/common/middleware/cors.middleware.ts`

- Gestion robuste des origines autorisées
- Support des requêtes OPTIONS (preflight)
- Headers CORS complets
- Gestion des environnements de développement

### 3. Configuration Vercel

**Fichier modifié :** `api/index.js`

Ajout de la configuration CORS explicite pour l'environnement serverless de Vercel.

### 4. Variables d'Environnement

**Fichier modifié :** `env.example`

```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://bootcampsxaralafront.netlify.app,https://bootcamps-xarala-front.netlify.app
```

## 🧪 Tests

### Script de Test CORS

**Nouveau fichier :** `test-cors.sh`

```bash
# Rendre le script exécutable
chmod +x test-cors.sh

# Exécuter les tests
./test-cors.sh
```

### Tests Manuels

```bash
# Test de health check
curl -X GET "https://bootcamps-xarala-back-production.up.railway.app/api/health" \
  -H "Origin: https://bootcampsxaralafront.netlify.app" \
  -v

# Test preflight CORS
curl -X OPTIONS "https://bootcamps-xarala-back-production.up.railway.app/api/v1/auth/login" \
  -H "Origin: https://bootcampsxaralafront.netlify.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type,Authorization" \
  -v
```

## 🔄 Déploiement

### Railway (Production)

1. **Variables d'environnement à configurer :**
   ```env
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://bootcampsxaralafront.netlify.app,https://bootcamps-xarala-front.netlify.app
   ```

2. **Redéploiement automatique** après push sur la branche principale

### Vercel (Alternative)

1. **Variables d'environnement dans Vercel Dashboard :**
   ```env
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://bootcampsxaralafront.netlify.app,https://bootcamps-xarala-front.netlify.app
   ```

2. **Déploiement automatique** depuis GitHub

## 📋 Vérification

### Headers CORS Attendus

Les réponses de l'API doivent inclure :

```
Access-Control-Allow-Origin: https://bootcampsxaralafront.netlify.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

### Endpoints Testés

- ✅ `GET /api/health`
- ✅ `POST /api/v1/auth/login`
- ✅ `GET /api/v1/auth/logout`
- ✅ `GET /api/v1/bootcamps`
- ✅ `POST /api/v1/leads`

## 🚀 Résultats Attendus

Après le déploiement des corrections :

1. **Frontend Netlify** peut communiquer avec l'API Railway
2. **Requêtes preflight** (OPTIONS) sont gérées correctement
3. **Headers CORS** sont présents dans toutes les réponses
4. **Authentification** fonctionne sans erreurs CORS
5. **Toutes les fonctionnalités** du frontend sont opérationnelles

## 🔍 Monitoring

### Logs à Surveiller

```bash
# Dans les logs de l'application
🌐 CORS configuré pour les origines: [array des origines]
✅ Application NestJS initialisée avec succès
```

### Métriques

- Taux de succès des requêtes CORS
- Temps de réponse des requêtes preflight
- Erreurs CORS dans les logs

## 📞 Support

En cas de problèmes persistants :

1. **Vérifier les variables d'environnement** sur Railway/Vercel
2. **Tester avec le script** `test-cors.sh`
3. **Vérifier les logs** de l'application
4. **Contacter l'équipe** de développement

---

**Développé avec ❤️ par le Baol-Baol Abdou Aziz DIOP** 