import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getHello() {
    return {
      success: true,
      data: {
        message: 'Bienvenue sur l\'API Xarala Bootcamp',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health')
  getHealth() {
    return {
      success: true,
      data: {
        status: 'OK',
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Get('api/health')
  getApiHealth() {
    return {
      success: true,
      data: {
        status: 'OK',
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Get('debug')
  getDebug() {
    const nodeEnv = this.configService.get('NODE_ENV');
    const databaseUrl = this.configService.get('DATABASE_URL');
    const dbHost = this.configService.get('DB_HOST');
    const dbPort = this.configService.get('DB_PORT');
    const dbUsername = this.configService.get('DB_USERNAME');
    const dbName = this.configService.get('DB_NAME');
    
    return {
      success: true,
      data: {
        nodeEnv,
        hasDatabaseUrl: !!databaseUrl,
        databaseUrl: databaseUrl ? `${databaseUrl.substring(0, 20)}...` : null,
        dbHost,
        dbPort,
        dbUsername,
        dbName,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    };
  }
} 