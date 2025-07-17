import { IsString, IsNumber, IsDateString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBootcampDto {
  @ApiProperty({
    description: 'Titre du bootcamp',
    example: 'Développement Web Full-Stack',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description du bootcamp',
    example: 'Apprenez à développer des applications web modernes avec les dernières technologies.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Durée du bootcamp',
    example: '12 semaines',
  })
  @IsString()
  duration: string;

  @ApiProperty({
    description: 'Prix du bootcamp',
    example: 150000,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Date de la prochaine session',
    example: '2024-03-01T00:00:00.000Z',
  })
  @IsDateString()
  nextSession: string;

  @ApiProperty({
    description: 'Statut actif du bootcamp',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 