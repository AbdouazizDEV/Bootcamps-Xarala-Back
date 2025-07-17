#!/bin/bash

echo "🧪 Tests de l'API Xarala Bootcamps"
echo "=================================="

BASE_URL="http://localhost:3000"
API_URL="$BASE_URL/api/v1"

# Couleurs pour les tests
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour tester un endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    local token=$5
    
    echo -e "\n${YELLOW}Testing: $description${NC}"
    echo "Endpoint: $method $endpoint"
    
    if [ -n "$token" ]; then
        if [ -n "$data" ]; then
            response=$(curl -s -X $method "$API_URL$endpoint" -H "Content-Type: application/json" -H "Authorization: Bearer $token" -d "$data")
        else
            response=$(curl -s -X $method "$API_URL$endpoint" -H "Authorization: Bearer $token")
        fi
    else
        if [ -n "$data" ]; then
            response=$(curl -s -X $method "$API_URL$endpoint" -H "Content-Type: application/json" -d "$data")
        else
            response=$(curl -s -X $method "$API_URL$endpoint")
        fi
    fi
    
    if echo "$response" | jq -e '.success' > /dev/null 2>&1; then
        echo -e "${GREEN}✅ SUCCESS${NC}"
        echo "$response" | jq '.'
    else
        echo -e "${RED}❌ FAILED${NC}"
        echo "$response"
    fi
}

# Test 1: Liste des bootcamps (public)
test_endpoint "GET" "/bootcamps" "" "Liste des bootcamps (public)"

# Test 2: Détails d'un bootcamp (public)
BOOTCAMP_ID=$(curl -s "$API_URL/bootcamps" | jq -r '.data[0].id')
test_endpoint "GET" "/bootcamps/$BOOTCAMP_ID" "" "Détails d'un bootcamp (public)"

# Test 3: Connexion admin
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" -H "Content-Type: application/json" -d '{"email": "admin@xarala.com", "password": "admin123"}')
test_endpoint "POST" "/auth/login" '{"email": "admin@xarala.com", "password": "admin123"}' "Connexion admin"

# Extraire le token JWT
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.access_token')

if [ "$TOKEN" != "null" ] && [ "$TOKEN" != "" ]; then
    echo -e "\n${GREEN}✅ Token JWT obtenu avec succès${NC}"
    
    # Test 4: Profil admin (protégé)
    test_endpoint "GET" "/auth/profile" "" "Profil admin (protégé)" "$TOKEN"
    
    # Test 5: Liste des leads (protégé)
    test_endpoint "GET" "/leads" "" "Liste des leads (protégé)" "$TOKEN"
    
    # Test 6: Créer un nouveau bootcamp (protégé)
    test_endpoint "POST" "/bootcamps" '{"title": "Test Bootcamp", "description": "Description de test", "duration": "8 semaines", "price": 80000, "nextSession": "2024-06-01T00:00:00.000Z", "isActive": true}' "Créer un bootcamp (protégé)" "$TOKEN"
    
else
    echo -e "\n${RED}❌ Échec de l'obtention du token JWT${NC}"
fi

# Test 7: Créer un lead (public)
test_endpoint "POST" "/leads" "{\"name\": \"Test Lead\", \"email\": \"test.lead@example.com\", \"phone\": \"+221701234567\", \"message\": \"Je suis intéressé par ce bootcamp\", \"bootcampId\": \"$BOOTCAMP_ID\"}" "Créer un lead (public)"

# Test 8: Accès sans authentification (doit échouer)
echo -e "\n${YELLOW}Testing: Accès protégé sans token (doit échouer)${NC}"
response=$(curl -s -X GET "$API_URL/leads")
if echo "$response" | jq -e '.error' > /dev/null 2>&1; then
    echo -e "${GREEN}✅ SUCCESS - Accès refusé comme attendu${NC}"
else
    echo -e "${RED}❌ FAILED - L'accès aurait dû être refusé${NC}"
fi

echo -e "\n${GREEN}🎉 Tests terminés !${NC}"
echo -e "\n📚 Documentation Swagger disponible sur: $BASE_URL/api/docs"
echo -e "🔑 Admin: admin@xarala.com / admin123" 