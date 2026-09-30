import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        userId: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const {
      name,
      userId,
      password,
      confirmPassword,
    } = createUserDto;

    // Check password confirmation
    if (password !== confirmPassword) {
      throw new ConflictException(
        'Password and confirm password do not match',
      );
    }

    // Check if userId already exists
    const existingUser = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this user ID already exists',
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create User + LOCAL AuthIdentity
    return this.prisma.user.create({
      data: {
        name,
        userId,

        authIdentity: {
          create: {
            provider: 'LOCAL',
            passwordHash: hashedPassword,
          },
        },
      },

      select: {
        id: true,
        name: true,
        userId: true,
        createdAt: true,
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.user.findUnique({
      where: {
        userId,
      },
      include: {
        authIdentity: {
          where: {
            provider: 'LOCAL',
          },
        },
      },
    });
  }
}