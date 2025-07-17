import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BootcampsController } from './controllers/bootcamps.controller';
import { BootcampsService } from './services/bootcamps.service';
import { Bootcamp } from '@/database/entities/bootcamp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bootcamp])],
  controllers: [BootcampsController],
  providers: [BootcampsService],
  exports: [BootcampsService],
})
export class BootcampsModule {} 