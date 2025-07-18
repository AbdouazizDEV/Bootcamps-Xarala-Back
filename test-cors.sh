#!/bin/bash

echo "🧪 Test de la configuration CORS pour l'API Xarala Bootcamp"
echo "=================================================="

# URL de l'API (à modifier selon votre déploiement)
API_URL="https://bootcamps-xarala-back-production.up.railway.app"

echo "📍 URL de l'API: $API_URL"
echo ""

# Test 1: Health check simple
echo "🔍 Test 1: Health check"
curl -s -X GET "$API_URL/api/health" \
  -H "Origin: https://bootcampsxaralafront.netlify.app" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v

echo ""
echo ""

# Test 2: Test CORS preflight
echo "🔍 Test 2: Preflight CORS (OPTIONS)"
curl -s -X OPTIONS "$API_URL/api/v1/auth/login" \
  -H "Origin: https://bootcampsxaralafront.netlify.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type,Authorization" \
  -v

echo ""
echo ""

# Test 3: Test de connexion (simulation)
echo "🔍 Test 3: Test de connexion (simulation)"
curl -s -X POST "$API_URL/api/v1/auth/login" \
  -H "Origin: https://bootcampsxaralafront.netlify.app" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}' \
  -v

echo ""
echo ""

# Test 4: Test avec localhost
echo "🔍 Test 4: Test avec localhost"
curl -s -X GET "$API_URL/api/health" \
  -H "Origin: http://localhost:3000" \
  -v

echo ""
echo "✅ Tests terminés"
echo ""
echo "📋 Résultats attendus:"
echo "- Les requêtes doivent retourner des headers CORS appropriés"
echo "- Access-Control-Allow-Origin doit inclure les origines autorisées"
echo "- Les requêtes OPTIONS doivent être gérées correctement" 