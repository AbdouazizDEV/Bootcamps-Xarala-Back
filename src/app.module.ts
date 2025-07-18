import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { BootcampsModule } from './modules/bootcamps/bootcamps.module';
import { LeadsModule } from './modules/leads/leads.module';
import { getDatabaseConfig } from './config/database.config';
import { Admin } from './database/entities/admin.entity';
import { Bootcamp } from './database/entities/bootcamp.entity';
import { Lead } from './database/entities/lead.entity';
import { AppController } from './app.controller';
import { CorsMiddleware } from './common/middleware/cors.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Admin, Bootcamp, Lead]),
    AuthModule,
    BootcampsModule,
    LeadsModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes('*');
  }
} 