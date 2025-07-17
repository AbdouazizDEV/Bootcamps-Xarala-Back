import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsController } from './controllers/leads.controller';
import { LeadsService } from './services/leads.service';
import { Lead } from '@/database/entities/lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {} 