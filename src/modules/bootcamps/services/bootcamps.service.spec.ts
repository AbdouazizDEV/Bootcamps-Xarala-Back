import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { BootcampsService } from './bootcamps.service';
import { Bootcamp } from '@/database/entities/bootcamp.entity';
import { CreateBootcampDto } from '../dto/create-bootcamp.dto';

describe('BootcampsService', () => {
  let service: BootcampsService;
  let repository: Repository<Bootcamp>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    softDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BootcampsService,
        {
          provide: getRepositoryToken(Bootcamp),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BootcampsService>(BootcampsService);
    repository = module.get<Repository<Bootcamp>>(getRepositoryToken(Bootcamp));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all active bootcamps', async () => {
      const mockBootcamps = [
        { id: '1', title: 'Test Bootcamp', isActive: true },
      ];
      mockRepository.find.mockResolvedValue(mockBootcamps);

      const result = await service.findAll();

      expect(result).toEqual(mockBootcamps);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { isActive: true },
        order: { createdAt: 'DESC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a bootcamp if found', async () => {
      const mockBootcamp = { id: '1', title: 'Test Bootcamp', isActive: true };
      mockRepository.findOne.mockResolvedValue(mockBootcamp);

      const result = await service.findOne('1');

      expect(result).toEqual(mockBootcamp);
    });

    it('should throw NotFoundException if bootcamp not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new bootcamp', async () => {
      const createDto: CreateBootcampDto = {
        title: 'New Bootcamp',
        description: 'Description',
        duration: '12 weeks',
        price: 100000,
        nextSession: '2024-03-01T00:00:00.000Z',
      };

      const mockBootcamp = { id: '1', ...createDto };
      mockRepository.create.mockReturnValue(mockBootcamp);
      mockRepository.save.mockResolvedValue(mockBootcamp);

      const result = await service.create(createDto);

      expect(result).toEqual(mockBootcamp);
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createDto,
        nextSession: new Date(createDto.nextSession),
      });
    });
  });
}); 