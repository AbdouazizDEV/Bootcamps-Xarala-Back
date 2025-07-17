import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { LeadsService } from '../services/leads.service';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadStatusDto } from '../dto/update-lead-status.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { PaginationQuery } from '@/common/interfaces/api-response.interface';

@ApiTags('Leads')
@Controller('api/v1/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un lead (formulaire d\'intérêt)' })
  @ApiResponse({
    status: 201,
    description: 'Lead créé avec succès',
  })
  @ApiResponse({
    status: 400,
    description: 'Données invalides',
  })
  async create(@Body() createLeadDto: CreateLeadDto) {
    const lead = await this.leadsService.create(createLeadDto);
    return {
      success: true,
      data: lead,
      message: 'Votre demande a été enregistrée avec succès',
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Liste tous les leads avec pagination (Admin)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Liste des leads récupérée avec succès',
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé',
  })
  async findAll(@Query() query: PaginationQuery) {
    const result = await this.leadsService.findAll(query);
    return {
      success: true,
      data: result.data,
      pagination: result.pagination,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Détails d\'un lead (Admin)' })
  @ApiParam({ name: 'id', description: 'ID du lead' })
  @ApiResponse({
    status: 200,
    description: 'Détails du lead récupérés avec succès',
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé',
  })
  @ApiResponse({
    status: 404,
    description: 'Lead non trouvé',
  })
  async findOne(@Param('id') id: string) {
    const lead = await this.leadsService.findOne(id);
    return {
      success: true,
      data: lead,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Changer le statut d\'un lead (Admin)' })
  @ApiParam({ name: 'id', description: 'ID du lead' })
  @ApiResponse({
    status: 200,
    description: 'Statut du lead modifié avec succès',
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé',
  })
  @ApiResponse({
    status: 404,
    description: 'Lead non trouvé',
  })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateLeadStatusDto: UpdateLeadStatusDto,
  ) {
    const lead = await this.leadsService.updateStatus(id, updateLeadStatusDto);
    return {
      success: true,
      data: lead,
      message: 'Statut du lead modifié avec succès',
      timestamp: new Date().toISOString(),
    };
  }
} 