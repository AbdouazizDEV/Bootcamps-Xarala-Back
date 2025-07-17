# 🚀 Déploiement sur Vercel

Guide complet pour déployer l'API Xarala Bootcamp sur Vercel.

## ✅ Avantages de Vercel

- ✅ Support complet de Node.js
- ✅ Base de données PostgreSQL (avec Vercel Postgres)
- ✅ Variables d'environnement
- ✅ Déploiement automatique depuis GitHub
- ✅ SSL automatique
- ✅ CDN global
- ✅ Analytics intégrés

## 📋 Configuration

### Fichiers créés :
- `vercel.json` - Configuration Vercel
- `VERCEL_DEPLOYMENT.md` - Ce guide

### Base de données recommandée :
- **Vercel Postgres** (intégré)
- **Supabase** (PostgreSQL gratuit)
- **PlanetScale** (MySQL)
- **Neon** (PostgreSQL serverless)

## 🚀 Déploiement

### Option 1 : Déploiement automatique (Recommandé)

1. **Connectez votre dépôt GitHub**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "New Project"
   - Importez votre dépôt GitHub
   - Vercel détectera automatiquement la configuration

2. **Configuration automatique**
   - Framework : NestJS (détecté automatiquement)
   - Build Command : `npm run build`
   - Output Directory : `dist`
   - Install Command : `npm ci`

3. **Variables d'environnement**
   ```bash
   NODE_ENV=production
   DATABASE_URL=votre-url-base-de-donnees
   JWT_SECRET=votre-secret-jwt-super-securise
   JWT_REFRESH_SECRET=votre-secret-refresh-super-securise
   ```

### Option 2 : Déploiement manuel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Suivre les instructions
```

## 🗄️ Base de données

### Option 1 : Vercel Postgres (Recommandé)

1. Dans votre projet Vercel, allez dans "Storage"
2. Cliquez sur "Create Database"
3. Choisissez "Postgres"
4. Vercel générera automatiquement `DATABASE_URL`

### Option 2 : Supabase (Gratuit)

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Copiez l'URL de connexion
4. Ajoutez-la comme `DATABASE_URL` dans Vercel

### Option 3 : PlanetScale (MySQL)

1. Créez un compte sur [planetscale.com](https://planetscale.com)
2. Créez une base de données MySQL
3. Utilisez l'URL de connexion comme `DATABASE_URL`

## 🔗 URLs après déploiement

```
https://votre-app.vercel.app/
https://votre-app.vercel.app/api/health
https://votre-app.vercel.app/api/docs
https://votre-app.vercel.app/api/bootcamps
https://votre-app.vercel.app/api/leads
```

## 🧪 Test local

```bash
# Installer Vercel CLI
npm i -g vercel

# Tester localement
vercel dev
```

## 🔧 Configuration avancée

### Variables d'environnement

Dans l'onglet "Environment Variables" de Vercel :

```bash
# Production
NODE_ENV=production
DATABASE_URL=votre-url-production
JWT_SECRET=votre-secret-production
JWT_REFRESH_SECRET=votre-refresh-production

# Preview (optionnel)
NODE_ENV=development
DATABASE_URL=votre-url-staging
JWT_SECRET=votre-secret-staging
JWT_REFRESH_SECRET=votre-refresh-staging
```

### Domaine personnalisé

1. Allez dans "Settings" → "Domains"
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions

## 📊 Monitoring

Vercel fournit :
- **Analytics** : Visiteurs, pages vues
- **Functions** : Logs des fonctions serverless
- **Performance** : Core Web Vitals
- **Errors** : Erreurs en temps réel

## 🔄 Déploiement automatique

- **Push sur main** → Déploiement automatique
- **Pull Request** → Preview automatique
- **Merge** → Déploiement en production

## 🧪 Test des endpoints

```bash
# Health check
curl https://votre-app.vercel.app/api/health

# Liste des bootcamps
curl https://votre-app.vercel.app/api/bootcamps

# Connexion admin
curl -X POST https://votre-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@xarala.sn","password":"admin123"}'
```

## 👤 Compte admin par défaut

Après le déploiement :
- **Email** : `admin@xarala.sn`
- **Mot de passe** : `admin123`

## 🚨 Dépannage

### Problèmes courants

1. **Build échoue**
   - Vérifiez les logs dans Vercel
   - Assurez-vous que `npm run build` fonctionne localement

2. **Base de données non connectée**
   - Vérifiez `DATABASE_URL` dans les variables d'environnement
   - Testez la connexion localement

3. **Fonction timeout**
   - Augmentez `maxDuration` dans `vercel.json`
   - Optimisez les requêtes de base de données

### Logs utiles

```bash
# Voir les logs en temps réel
vercel logs

# Voir les logs d'une fonction spécifique
vercel logs --function=dist/main.js
```

## 📖 Documentation

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**🎉 Votre API Xarala Bootcamp est maintenant prête pour Vercel !**

Vercel est parfait pour votre API car il supporte :
- ✅ NestJS nativement
- ✅ Base de données PostgreSQL
- ✅ Variables d'environnement
- ✅ Déploiement automatique
- ✅ SSL et CDN 