import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LeadStatus } from '@/database/entities/lead.entity';

export class UpdateLeadStatusDto {
  @ApiProperty({
    description: 'Nouveau statut du lead',
    enum: LeadStatus,
    example: LeadStatus.CONTACTE,
  })
  @IsEnum(LeadStatus)
  status: LeadStatus;
} 