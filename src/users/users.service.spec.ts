import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';

// Mock PrismaService module to avoid loading the generated Prisma client.
jest.mock('../prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('UsersService', () => {
  let service: UsersService;

  const mockPrismaService = {
    authIdentity: {
      findUnique: jest.fn<(...args: any[]) => Promise<any>>(),
    },
    user: {
      findUnique: jest.fn<(...args: any[]) => Promise<any>>(),
    },
    create: jest.fn<(...args: any[]) => Promise<any>>(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            ...mockPrismaService,
            user: {
              ...mockPrismaService.user,
              create: mockPrismaService.create,
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});