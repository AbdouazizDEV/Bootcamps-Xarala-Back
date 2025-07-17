import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { BootcampsService } from '../services/bootcamps.service';
import { CreateBootcampDto } from '../dto/create-bootcamp.dto';
import { UpdateBootcampDto } from '../dto/update-bootcamp.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Bootcamps')
@Controller('api/v1/bootcamps')
export class BootcampsController {
  constructor(private readonly bootcampsService: BootcampsService) {}

  @Get()
  @ApiOperation({ summary: 'Liste tous les bootcamps actifs' })
  @ApiResponse({
    status: 200,
    description: 'Liste des bootcamps récupérée avec succès',
  })
  async findAll() {
    const bootcamps = await this.bootcampsService.findAll();
    return {
      success: true,
      data: bootcamps,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détails d\'un bootcamp' })
  @ApiParam({ name: 'id', description: 'ID du bootcamp' })
  @ApiResponse({
    status: 200,
    description: 'Détails du bootcamp récupérés avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Bootcamp non trouvé',
  })
  async findOne(@Param('id') id: string) {
    const bootcamp = await this.bootcampsService.findOne(id);
    return {
      success: true,
      data: bootcamp,
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un bootcamp (Admin)' })
  @ApiResponse({
    status: 201,
    description: 'Bootcamp créé avec succès',
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé',
  })
  async create(@Body() createBootcampDto: CreateBootcampDto) {
    const bootcamp = await this.bootcampsService.create(createBootcampDto);
    return {
      success: true,
      data: bootcamp,
      message: 'Bootcamp créé avec succès',
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modifier un bootcamp (Admin)' })
  @ApiParam({ name: 'id', description: 'ID du bootcamp' })
  @ApiResponse({
    status: 200,
    description: 'Bootcamp modifié avec succès',
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé',
  })
  @ApiResponse({
    status: 404,
    description: 'Bootcamp non trouvé',
  })
  async update(
    @Param('id') id: string,
    @Body() updateBootcampDto: UpdateBootcampDto,
  ) {
    const bootcamp = await this.bootcampsService.update(id, updateBootcampDto);
    return {
      success: true,
      data: bootcamp,
      message: 'Bootcamp modifié avec succès',
      timestamp: new Date().toISOString(),
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un bootcamp (Admin)' })
  @ApiParam({ name: 'id', description: 'ID du bootcamp' })
  @ApiResponse({
    status: 204,
    description: 'Bootcamp supprimé avec succès',
  })
  @ApiResponse({
    status: 401,
    description: 'Non autorisé',
  })
  @ApiResponse({
    status: 404,
    description: 'Bootcamp non trouvé',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.bootcampsService.remove(id);
    return {
      success: true,
      message: 'Bootcamp supprimé avec succès',
      timestamp: new Date().toISOString(),
    };
  }
} 