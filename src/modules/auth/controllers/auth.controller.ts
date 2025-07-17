import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Authentification')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Connexion administrateur' })
  @ApiResponse({
    status: 200,
    description: 'Connexion réussie',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        data: {
          type: 'object',
          properties: {
            access_token: { type: 'string' },
            admin: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                name: { type: 'string' },
              },
            },
          },
        },
        timestamp: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Email ou mot de passe incorrect',
  })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtenir le profil administrateur' })
  @ApiResponse({
    status: 200,
    description: 'Profil récupéré avec succès',
  })
  @ApiResponse({
    status: 401,
    description: 'Token invalide',
  })
  async getProfile(@Request() req) {
    const profile = await this.authService.getProfile(req.user.id);
    return {
      success: true,
      data: profile,
      timestamp: new Date().toISOString(),
    };
  }
} 