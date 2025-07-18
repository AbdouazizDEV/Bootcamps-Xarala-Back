import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const databaseUrl = configService.get('DATABASE_URL');
  const nodeEnv = configService.get('NODE_ENV', 'development');
  const isProduction = nodeEnv === 'production';
  
  console.log(`🌍 Environnement: ${nodeEnv}`);
  console.log(`🔗 DATABASE_URL disponible: ${!!databaseUrl}`);
  
  // En production, forcer l'utilisation de DATABASE_URL
  if (databaseUrl && isProduction) {
    console.log('🔗 Utilisation de DATABASE_URL pour la production');
    return {
      type: 'postgres',
      url: databaseUrl,
      entities: [__dirname + '/../database/entities/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      synchronize: false, // Ne jamais synchroniser en production
      logging: false, // Pas de logging en production
      ssl: { rejectUnauthorized: false },
    };
  }
  
  // En développement, utiliser DATABASE_URL si disponible, sinon configuration locale
  if (databaseUrl) {
    console.log('🔗 Utilisation de DATABASE_URL pour le développement');
    return {
      type: 'postgres',
      url: databaseUrl,
      entities: [__dirname + '/../database/entities/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      synchronize: true,
      logging: true,
      ssl: false,
    };
  }

  // Configuration locale (fallback) - seulement si pas en production
  if (!isProduction) {
    console.log('🏠 Utilisation de la configuration locale');
    return {
      type: 'postgres',
      host: configService.get('DB_HOST', 'localhost'),
      port: configService.get('DB_PORT', 5432),
      username: configService.get('DB_USERNAME', 'postgres'),
      password: configService.get('DB_PASSWORD', 'password'),
      database: configService.get('DB_NAME', 'xarala_bootcamp'),
      entities: [__dirname + '/../database/entities/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      synchronize: true,
      logging: true,
      ssl: false,
    };
  }
  
  // En production sans DATABASE_URL, erreur
  throw new Error('DATABASE_URL est requise en production');
}; 