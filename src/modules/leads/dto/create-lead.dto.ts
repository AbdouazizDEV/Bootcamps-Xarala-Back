import { IsString, IsEmail, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeadDto {
  @ApiProperty({
    description: 'Nom complet',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Numéro de téléphone',
    example: '+221701234567',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Message',
    example: 'Je suis intéressé par ce bootcamp et j\'aimerais plus d\'informations.',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'ID du bootcamp',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  bootcampId: string;
} 