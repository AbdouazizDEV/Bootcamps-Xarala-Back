import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  @Post('setup-admin')
  async setupAdmin() {
    try {
      const adminRepository = getRepository('Admin');
      
      // Vérifier si l'admin existe déjà
      const existingAdmin = await adminRepository.findOne({ where: { email: 'admin@xarala.sn' } });
      
      if (existingAdmin) {
        return {
          success: true,
          message: 'L\'administrateur existe déjà',
          data: {
            email: 'admin@xarala.sn',
            password: 'admin123'
          },
          timestamp: new Date().toISOString(),
        };
      }
      
      // Créer l'admin
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const admin = adminRepository.create({
        email: 'admin@xarala.sn',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'Xarala',
        role: 'admin',
      });
      
      await adminRepository.save(admin);
      
      return {
        success: true,
        message: 'Administrateur créé avec succès',
        data: {
          email: 'admin@xarala.sn',
          password: 'admin123'
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
} 