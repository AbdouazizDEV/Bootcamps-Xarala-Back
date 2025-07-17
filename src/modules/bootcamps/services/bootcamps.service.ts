import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bootcamp } from '@/database/entities/bootcamp.entity';
import { CreateBootcampDto } from '../dto/create-bootcamp.dto';
import { UpdateBootcampDto } from '../dto/update-bootcamp.dto';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectRepository(Bootcamp)
    private bootcampRepository: Repository<Bootcamp>,
  ) {}

  async findAll(): Promise<Bootcamp[]> {
    return this.bootcampRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Bootcamp> {
    const bootcamp = await this.bootcampRepository.findOne({
      where: { id, isActive: true },
    });

    if (!bootcamp) {
      throw new NotFoundException(`Bootcamp avec l'ID ${id} non trouvé`);
    }

    return bootcamp;
  }

  async create(createBootcampDto: CreateBootcampDto): Promise<Bootcamp> {
    const bootcamp = this.bootcampRepository.create({
      ...createBootcampDto,
      nextSession: new Date(createBootcampDto.nextSession),
    });

    return this.bootcampRepository.save(bootcamp);
  }

  async update(id: string, updateBootcampDto: UpdateBootcampDto): Promise<Bootcamp> {
    const bootcamp = await this.findOne(id);

    if (updateBootcampDto.nextSession) {
      updateBootcampDto.nextSession = new Date(updateBootcampDto.nextSession) as any;
    }

    Object.assign(bootcamp, updateBootcampDto);
    return this.bootcampRepository.save(bootcamp);
  }

  async remove(id: string): Promise<void> {
    const bootcamp = await this.findOne(id);
    await this.bootcampRepository.softDelete(id);
  }
} 