import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Page d\'accueil' })
  @ApiResponse({ status: 200, description: 'Bienvenue sur l\'API Xarala Bootcamp' })
  getHello(): { message: string; version: string; timestamp: string } {
    return {
      message: 'Bienvenue sur l\'API Xarala Bootcamp',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'Service en ligne' })
  healthCheck(): { status: string; timestamp: string } {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('api/health')
  @ApiOperation({ summary: 'Health check pour Render' })
  @ApiResponse({ status: 200, description: 'Service en ligne' })
  renderHealthCheck(): { status: string; timestamp: string } {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }
} 