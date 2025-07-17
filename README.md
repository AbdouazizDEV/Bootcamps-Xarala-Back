<<<<<<< HEAD
# API Xarala Bootcamps 🚀

API REST complète pour la plateforme d'inscription aux bootcamps Xarala, développée avec NestJS et PostgreSQL.

## 🛠️ Stack Technique

- **Framework**: NestJS (dernière version)
- **Base de données**: PostgreSQL avec TypeORM
- **Authentification**: JWT avec Passport
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator + class-transformer
- **Architecture**: Clean Architecture + principes SOLID

## 📋 Fonctionnalités

### 🔐 Authentification Admin
- Connexion sécurisée avec JWT
- Gestion des tokens d'accès
- Profil administrateur

### 🎓 Gestion des Bootcamps
- **Endpoints publics**:
  - `GET /api/v1/bootcamps` - Liste tous les bootcamps actifs
  - `GET /api/v1/bootcamps/:id` - Détails d'un bootcamp

- **Endpoints admin** (protégés):
  - `POST /api/v1/bootcamps` - Créer un bootcamp
  - `PUT /api/v1/bootcamps/:id` - Modifier un bootcamp
  - `DELETE /api/v1/bootcamps/:id` - Supprimer un bootcamp

### 📝 Gestion des Leads
- **Endpoints publics**:
  - `POST /api/v1/leads` - Créer un lead (formulaire d'intérêt)

- **Endpoints admin** (protégés):
  - `GET /api/v1/leads` - Liste tous les leads avec pagination
  - `GET /api/v1/leads/:id` - Détails d'un lead
  - `PATCH /api/v1/leads/:id/status` - Changer le statut d'un lead

## 🚀 Installation et Configuration

### Prérequis
- Node.js (v18+)
- PostgreSQL (v15+)
- Docker (optionnel)

### 1. Cloner le projet
```bash
git clone <repository-url>
cd xarala-bootcamp-api
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
```bash
cp env.example .env
```

Modifiez le fichier `.env` avec vos paramètres :
```env
# Configuration de la base de données
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=xarala_bootcamp

# Configuration JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

# Configuration de l'application
PORT=3000
NODE_ENV=development
```

### 4. Configuration de la base de données

#### Option A: Docker Compose (Recommandé)
```bash
docker-compose up -d postgres
```

#### Option B: PostgreSQL local
```sql
CREATE DATABASE xarala_bootcamp;
```

### 5. Remplir la base de données avec les données de test
```bash
npm run seed
```

### 6. Démarrer l'application
```bash
# Développement
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 🐳 Docker

### Développement avec Docker Compose
```bash
docker-compose up
```

### Build de l'image
```bash
docker build -t xarala-api .
```

## 📚 Documentation API

Une fois l'application démarrée, la documentation Swagger est disponible à :
```
http://localhost:3000/api/docs
```

### 🔑 Authentification

1. **Connexion admin**:
   ```bash
   POST /api/v1/auth/login
   {
     "email": "admin@xarala.com",
     "password": "admin123"
   }
   ```

2. **Utiliser le token**:
   - Ajoutez le header: `Authorization: Bearer <token>`
   - Ou utilisez l'interface Swagger avec le bouton "Authorize"

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests avec coverage
npm run test:cov

# Tests d'intégration
npm run test:e2e

# Tests en mode watch
npm run test:watch
```

## 📊 Données de Test

Après avoir exécuté `npm run seed`, vous aurez accès à :

### 👤 Admin
- **Email**: admin@xarala.com
- **Mot de passe**: admin123

### 🎓 Bootcamps
1. **Développement Web Full-Stack** (12 semaines, 150000 FCFA)
2. **Data Science & Machine Learning** (16 semaines, 200000 FCFA)
3. **Mobile Development avec React Native** (10 semaines, 120000 FCFA)

### 📝 Leads
3 leads d'exemple avec différents statuts

## 🔧 Scripts Disponibles

```bash
npm run start:dev        # Développement avec hot reload
npm run build           # Build production
npm run start:prod      # Démarrer en production
npm run test           # Tests unitaires
npm run test:e2e       # Tests d'intégration
npm run test:cov       # Tests avec coverage
npm run seed           # Remplir données test
npm run migration:generate  # Générer migration
npm run migration:run  # Exécuter migrations
```

## 🏗️ Architecture

```
src/
├── common/           # Utilitaires communs
│   ├── decorators/  # Décorateurs personnalisés
│   ├── filters/     # Filtres d'exception
│   ├── guards/      # Guards d'authentification
│   ├── interceptors/ # Intercepteurs de réponse
│   └── pipes/       # Pipes de validation
├── config/          # Configuration
├── database/        # Base de données
│   ├── entities/    # Entités TypeORM
│   ├── migrations/  # Migrations
│   └── seeds/       # Données de test
└── modules/         # Modules métier
    ├── auth/        # Authentification
    ├── bootcamps/   # Gestion des bootcamps
    └── leads/       # Gestion des leads
```

## 🔒 Sécurité

- **Validation stricte** des données avec class-validator
- **Hachage des mots de passe** avec bcrypt
- **JWT sécurisé** avec refresh tokens
- **Rate limiting** pour prévenir les abus
- **CORS configuré** pour la sécurité
- **Helmet** pour les headers de sécurité

## 📈 Monitoring

- **Health checks** intégrés
- **Logging structuré** avec Winston
- **Gestion d'erreurs** standardisée
- **Métriques** disponibles

## 🚀 Déploiement

### Variables d'environnement de production
```env
NODE_ENV=production
DB_HOST=your-db-host
DB_PASSWORD=your-secure-password
JWT_SECRET=your-super-secure-jwt-secret
```

### Docker Compose pour production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe Xarala

---

**Développé avec ❤️ par l'équipe Xarala** 
=======
# Bootcamps-Xarala-Back
>>>>>>> fb4500e0eee251e27fca193f58da19edaacc674c
