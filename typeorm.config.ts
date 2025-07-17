import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Admin } from './src/database/entities/admin.entity';
import { Bootcamp } from './src/database/entities/bootcamp.entity';
import { Lead } from './src/database/entities/lead.entity';
import { InitialMigration1700000000000 } from './src/database/migrations/1700000000000-InitialMigration';

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', 'password'),
  database: configService.get('DB_NAME', 'xarala_bootcamp'),
  url: configService.get('DATABASE_URL'),
  entities: [Admin, Bootcamp, Lead],
  migrations: [InitialMigration1700000000000],
  synchronize: false,
  logging: configService.get('NODE_ENV') === 'development',
  ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
}); 