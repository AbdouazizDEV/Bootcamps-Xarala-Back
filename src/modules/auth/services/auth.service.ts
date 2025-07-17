import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '@/database/entities/admin.entity';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { email, isActive: true },
    });

    if (admin && (await admin.validatePassword(password))) {
      return admin;
    }

    return null;
  }

  async login(loginDto: LoginDto) {
    const admin = await this.validateUser(loginDto.email, loginDto.password);

    if (!admin) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const payload = { email: admin.email, sub: admin.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    };
  }

  async getProfile(adminId: string) {
    const admin = await this.adminRepository.findOne({
      where: { id: adminId, isActive: true },
    });

    if (!admin) {
      throw new UnauthorizedException('Admin non trouvé');
    }

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    };
  }
} 