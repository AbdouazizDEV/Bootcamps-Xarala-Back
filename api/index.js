const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/src/app.module');

let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    await app.init();
  }
  return app;
}

module.exports = async (req, res) => {
  const app = await bootstrap();
  const expressApp = app.getHttpAdapter().getInstance();
  
  // Gérer les requêtes Vercel
  return expressApp(req, res);
}; 