import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const getJwtConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get('JWT_SECRET', 'your-super-secret-key'),
  signOptions: {
    expiresIn: configService.get('JWT_EXPIRES_IN', '1h'),
  },
});

export const getJwtRefreshConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get('JWT_REFRESH_SECRET', 'your-refresh-secret'),
  signOptions: {
    expiresIn: configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
  },
}); 