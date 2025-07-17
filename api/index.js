const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');

let app;

async function bootstrap() {
  if (!app) {
    try {
      app = await NestFactory.create(AppModule);
      await app.init();
      console.log('✅ Application NestJS initialisée avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation:', error);
      throw error;
    }
  }
  return app;
}

module.exports = async (req, res) => {
  try {
    const app = await bootstrap();
    const expressApp = app.getHttpAdapter().getInstance();
    
    // Gérer les requêtes Vercel
    return expressApp(req, res);
  } catch (error) {
    console.error('❌ Erreur dans la fonction serverless:', error);
    
    // Réponse d'erreur en cas de problème
    res.status(500).json({
      success: false,
      error: 'Erreur interne du serveur',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}; 