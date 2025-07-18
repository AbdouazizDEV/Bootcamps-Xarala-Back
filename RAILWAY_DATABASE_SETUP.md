# Configuration de la Base de Données PostgreSQL sur Railway

## Problème Actuel
L'application ne peut pas se connecter à la base de données en production car `DATABASE_URL` n'est pas configurée sur Railway.

## Solution 1: Ajouter une Base de Données PostgreSQL sur Railway

### Étapes :
1. **Aller sur votre projet Railway**
   - Ouvrez https://railway.app/project/[votre-projet-id]

2. **Ajouter un service PostgreSQL**
   - Cliquez sur "New Service"
   - Sélectionnez "Database" → "PostgreSQL"
   - Railway créera automatiquement une base de données

3. **Vérifier la variable DATABASE_URL**
   - Allez dans l'onglet "Variables" de votre service principal
   - Vous devriez voir `DATABASE_URL` automatiquement configurée
   - La valeur ressemble à : `postgresql://postgres:password@containers-us-west-XX.railway.app:XXXX/railway`

4. **Redéployer l'application**
   - Railway redéploiera automatiquement avec la nouvelle variable

## Solution 2: Utiliser une Base de Données Externe

### Option A: Neon PostgreSQL (Gratuit)
1. Créez un compte sur https://neon.tech
2. Créez un nouveau projet
3. Copiez l'URL de connexion
4. Ajoutez-la comme `DATABASE_URL` dans Railway

### Option B: Railway PostgreSQL (Payant)
1. Ajoutez un service PostgreSQL comme décrit ci-dessus
2. Railway facturera selon l'utilisation

## Vérification

Après configuration, testez l'endpoint de debug :
```bash
curl https://votre-app.railway.app/debug
```

Vous devriez voir :
```json
{
  "success": true,
  "data": {
    "nodeEnv": "production",
    "hasDatabaseUrl": true,
    "databaseUrl": "postgresql://postgres:...",
    "dbHost": null,
    "dbPort": null,
    "dbUsername": null,
    "dbName": null,
    "timestamp": "2025-07-18T01:35:00.000Z"
  }
}
```

## Migration des Données

Une fois la base de données configurée, exécutez les migrations :

```bash
# Dans Railway, ajoutez cette commande dans les variables d'environnement
NPM_RUN_COMMAND=db:migrate:run
```

Ou manuellement via le terminal Railway :
```bash
railway run npm run db:migrate:run
```

## Seeds (Données de Test)

Pour ajouter des données de test :
```bash
railway run npm run db:seed:run
```

## Troubleshooting

### Erreur "ECONNREFUSED ::1:5432"
- Signifie que l'application essaie de se connecter à localhost
- Vérifiez que `DATABASE_URL` est bien configurée

### Erreur "SSL required"
- Ajoutez `?sslmode=require` à la fin de votre `DATABASE_URL`

### Erreur "Database does not exist"
- Créez la base de données ou vérifiez l'URL de connexion 