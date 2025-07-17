# 🚀 Déploiement Rapide sur Vercel

## ⚡ Déploiement en 5 minutes

### 1. Connectez-vous à Vercel
- Allez sur [vercel.com](https://vercel.com)
- Créez un compte ou connectez-vous

### 2. Importez votre projet
- Cliquez sur **"New Project"**
- Connectez votre dépôt GitHub : `AbdouazizDEV/Bootcamps-Xarala-Back`
- Vercel détectera automatiquement la configuration NestJS

### 3. Configurez la base de données
**Option 1 : Vercel Postgres (Recommandé)**
- Dans votre projet Vercel, allez dans **"Storage"**
- Cliquez sur **"Create Database"**
- Choisissez **"Postgres"**
- Vercel générera automatiquement `DATABASE_URL`

**Option 2 : Supabase (Gratuit)**
- Créez un compte sur [supabase.com](https://supabase.com)
- Créez un nouveau projet
- Copiez l'URL de connexion
- Ajoutez-la comme `DATABASE_URL` dans Vercel

### 4. Variables d'environnement
Dans l'onglet **"Environment Variables"** :
```bash
NODE_ENV=production
DATABASE_URL=votre-url-base-de-donnees
JWT_SECRET=votre-secret-jwt-super-securise
JWT_REFRESH_SECRET=votre-secret-refresh-super-securise
```

### 5. Déployez
- Cliquez sur **"Deploy"**
- Attendez 2-3 minutes pour le déploiement

## 🔗 URLs après déploiement

Une fois déployé, votre API sera disponible à :
```
https://votre-app.vercel.app
```

### Endpoints principaux :
- **Page d'accueil** : `https://votre-app.vercel.app/`
- **Health check** : `https://votre-app.vercel.app/api/health`
- **Documentation** : `https://votre-app.vercel.app/api/docs`
- **Bootcamps** : `https://votre-app.vercel.app/api/bootcamps`
- **Leads** : `https://votre-app.vercel.app/api/leads`

## 👤 Compte admin par défaut

Après le déploiement :
- **Email** : `admin@xarala.sn`
- **Mot de passe** : `admin123`

## 🧪 Test rapide

```bash
# Test de santé
curl https://votre-app.vercel.app/api/health

# Liste des bootcamps
curl https://votre-app.vercel.app/api/bootcamps

# Connexion admin
curl -X POST https://votre-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@xarala.sn","password":"admin123"}'
```

## 📖 Documentation complète

Pour plus de détails, consultez [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

---

**🎉 Votre API Xarala Bootcamp est maintenant en ligne sur Vercel !**

**Avantages de Vercel :**
- ✅ Support complet de NestJS
- ✅ Base de données PostgreSQL
- ✅ Déploiement automatique
- ✅ SSL et CDN
- ✅ Analytics intégrés 