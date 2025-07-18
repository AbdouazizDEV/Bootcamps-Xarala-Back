const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');

let app;

async function bootstrap() {
  if (!app) {
    try {
      console.log('🚀 Démarrage de l\'application NestJS...');
      console.log('📊 Variables d\'environnement:', {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL ? 'Configurée' : 'Non configurée',
        JWT_SECRET: process.env.JWT_SECRET ? 'Configuré' : 'Non configuré'
      });
      
      app = await NestFactory.create(AppModule);
      await app.init();
      console.log('✅ Application NestJS initialisée avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation:', error);
      console.error('📋 Détails de l\'erreur:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      throw error;
    }
  }
  return app;
}

module.exports = async (req, res) => {
  try {
    console.log('📥 Requête reçue:', req.method, req.url);
    
    const app = await bootstrap();
    const expressApp = app.getHttpAdapter().getInstance();
    
    // Gérer les requêtes Vercel
    return expressApp(req, res);
  } catch (error) {
    console.error('❌ Erreur dans la fonction serverless:', error);
    
    // Réponse d'erreur détaillée
    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur',
      message: error.message,
      details: {
        name: error.name,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  }
}; 