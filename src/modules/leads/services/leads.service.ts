import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead, LeadStatus } from '@/database/entities/lead.entity';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadStatusDto } from '../dto/update-lead-status.dto';
import { PaginationQuery } from '@/common/interfaces/api-response.interface';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {
    const lead = this.leadRepository.create(createLeadDto);
    return this.leadRepository.save(lead);
  }

  async findAll(query: PaginationQuery = {}) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const [leads, total] = await this.leadRepository.findAndCount({
      relations: ['bootcamp'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: leads,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async findOne(id: string): Promise<Lead> {
    const lead = await this.leadRepository.findOne({
      where: { id },
      relations: ['bootcamp'],
    });

    if (!lead) {
      throw new NotFoundException(`Lead avec l'ID ${id} non trouvé`);
    }

    return lead;
  }

  async updateStatus(id: string, updateLeadStatusDto: UpdateLeadStatusDto): Promise<Lead> {
    const lead = await this.findOne(id);
    lead.status = updateLeadStatusDto.status;
    return this.leadRepository.save(lead);
  }
} 