# 🚀 Déploiement Rapide sur Render

## ⚡ Déploiement en 5 minutes

### 1. Connectez-vous à Render
- Allez sur [render.com](https://render.com)
- Créez un compte ou connectez-vous

### 2. Créez un nouveau Blueprint
- Cliquez sur "New +" → "Blueprint"
- Connectez votre dépôt GitHub : `AbdouazizDEV/Bootcamps-Xarala-Back`
- Cliquez sur "Connect"

### 3. Configurez le Blueprint
Render détectera automatiquement le fichier `render.yaml` et configurera :
- ✅ Service web Node.js
- ✅ Base de données PostgreSQL
- ✅ Variables d'environnement
- ✅ Health checks

### 4. Déployez
- Cliquez sur "Apply"
- Attendez 5-10 minutes pour le déploiement

## 🔗 URLs après déploiement

Une fois déployé, votre API sera disponible à :
```
https://votre-app.onrender.com
```

### Endpoints principaux :
- **Page d'accueil** : `https://votre-app.onrender.com/`
- **Health check** : `https://votre-app.onrender.com/api/health`
- **Documentation** : `https://votre-app.onrender.com/api/docs`
- **Bootcamps** : `https://votre-app.onrender.com/api/bootcamps`
- **Leads** : `https://votre-app.onrender.com/api/leads`

## 👤 Compte admin par défaut

Après le déploiement, vous pouvez vous connecter avec :
- **Email** : `admin@xarala.sn`
- **Mot de passe** : `admin123`

## 🧪 Test rapide

```bash
# Test de santé
curl https://votre-app.onrender.com/api/health

# Liste des bootcamps
curl https://votre-app.onrender.com/api/bootcamps

# Connexion admin
curl -X POST https://votre-app.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@xarala.sn","password":"admin123"}'
```

## 📖 Documentation complète

Pour plus de détails, consultez [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**🎉 Votre API Xarala Bootcamp est maintenant en ligne !** 