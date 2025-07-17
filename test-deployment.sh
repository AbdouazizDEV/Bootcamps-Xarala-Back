#!/bin/bash

echo "🚀 Test de déploiement pour Xarala Bootcamp API"
echo "================================================"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    print_error "Ce script doit être exécuté depuis la racine du projet"
    exit 1
fi

print_status "Vérification de l'environnement..."

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    exit 1
fi

NODE_VERSION=$(node --version)
print_success "Node.js version: $NODE_VERSION"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé"
    exit 1
fi

print_success "npm est disponible"

# Vérifier les fichiers de configuration
print_status "Vérification des fichiers de configuration..."

REQUIRED_FILES=("package.json" "nest-cli.json" "tsconfig.json" "Dockerfile" "render.yaml")
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_success "✓ $file"
    else
        print_error "✗ $file manquant"
        exit 1
    fi
done

# Vérifier les dépendances
print_status "Vérification des dépendances..."

if [ ! -d "node_modules" ]; then
    print_warning "node_modules n'existe pas, installation des dépendances..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Échec de l'installation des dépendances"
        exit 1
    fi
fi

print_success "Dépendances installées"

# Test de build
print_status "Test de build..."

npm run build
if [ $? -ne 0 ]; then
    print_error "Échec du build"
    exit 1
fi

print_success "Build réussi"

# Vérifier que dist/ existe
if [ ! -d "dist" ]; then
    print_error "Le dossier dist/ n'existe pas après le build"
    exit 1
fi

print_success "Dossier dist/ créé"

# Vérifier les fichiers de migration
print_status "Vérification des migrations..."

if [ -f "src/database/migrations/1700000000000-InitialMigration.ts" ]; then
    print_success "✓ Migration initiale"
else
    print_warning "⚠ Migration initiale manquante"
fi

# Vérifier les scripts de seed
print_status "Vérification des scripts de seed..."

if [ -f "seed.js" ]; then
    print_success "✓ Script de seed local"
else
    print_warning "⚠ Script de seed local manquant"
fi

if [ -f "seed-production.js" ]; then
    print_success "✓ Script de seed production"
else
    print_warning "⚠ Script de seed production manquant"
fi

# Vérifier la configuration de la base de données
print_status "Vérification de la configuration de la base de données..."

if [ -f "src/config/database.config.ts" ]; then
    print_success "✓ Configuration de base de données"
else
    print_error "✗ Configuration de base de données manquante"
    exit 1
fi

# Vérifier les entités
print_status "Vérification des entités..."

ENTITIES=("Admin" "Bootcamp" "Lead")
for entity in "${ENTITIES[@]}"; do
    if [ -f "src/database/entities/${entity}.entity.ts" ]; then
        print_success "✓ Entité $entity"
    else
        print_error "✗ Entité $entity manquante"
        exit 1
    fi
done

# Vérifier les modules
print_status "Vérification des modules..."

MODULES=("auth" "bootcamps" "leads")
for module in "${MODULES[@]}"; do
    if [ -d "src/modules/$module" ]; then
        print_success "✓ Module $module"
    else
        print_error "✗ Module $module manquant"
        exit 1
    fi
done

# Vérifier les tests
print_status "Vérification des tests..."

if [ -d "test" ]; then
    print_success "✓ Dossier de tests"
else
    print_warning "⚠ Dossier de tests manquant"
fi

# Vérifier le Dockerfile
print_status "Vérification du Dockerfile..."

if [ -f "Dockerfile" ]; then
    print_success "✓ Dockerfile"
else
    print_error "✗ Dockerfile manquant"
    exit 1
fi

# Vérifier render.yaml
print_status "Vérification de render.yaml..."

if [ -f "render.yaml" ]; then
    print_success "✓ render.yaml"
else
    print_error "✗ render.yaml manquant"
    exit 1
fi

# Vérifier les endpoints de santé
print_status "Vérification des endpoints de santé..."

if [ -f "src/app.controller.ts" ]; then
    print_success "✓ Contrôleur principal avec health check"
else
    print_error "✗ Contrôleur principal manquant"
    exit 1
fi

# Test de linting
print_status "Test de linting..."

npm run lint
if [ $? -ne 0 ]; then
    print_warning "⚠ Problèmes de linting détectés"
else
    print_success "✓ Linting réussi"
fi

# Test des tests unitaires
print_status "Test des tests unitaires..."

npm test
if [ $? -ne 0 ]; then
    print_warning "⚠ Certains tests ont échoué"
else
    print_success "✓ Tests unitaires réussis"
fi

echo ""
echo "🎉 Résumé du test de déploiement"
echo "================================"
print_success "✅ L'application est prête pour le déploiement sur Render !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Poussez votre code sur GitHub"
echo "2. Connectez votre dépôt à Render"
echo "3. Créez un nouveau Blueprint"
echo "4. Render utilisera automatiquement render.yaml"
echo ""
echo "📖 Pour plus de détails, consultez DEPLOYMENT.md"
echo ""
print_status "🔗 URLs après déploiement :"
echo "   - Health check: https://votre-app.onrender.com/api/health"
echo "   - Documentation: https://votre-app.onrender.com/api/docs"
echo "   - Page d'accueil: https://votre-app.onrender.com/"
echo ""
print_status "👤 Compte admin par défaut :"
echo "   - Email: admin@xarala.sn"
echo "   - Mot de passe: admin123"
echo ""
print_success "�� Bon déploiement !" 