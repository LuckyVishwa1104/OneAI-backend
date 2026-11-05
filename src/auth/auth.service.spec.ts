import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';

// Mock UsersService to avoid loading Prisma.
jest.mock('../users/users.service', () => ({
  UsersService: class UsersService {},
}));

// Mock ConfigService to avoid ESM loading issues.
jest.mock('@nestjs/config', () => ({
  ConfigService: class ConfigService {},
}));

// Mock Firebase Admin because these tests don't cover Google authentication.
jest.mock('../firebase/firebase-admin', () => ({
  firebaseAdminAuth: {
    verifyIdToken: jest.fn(),
  },
}));

// Mock jose because these tests mock verifyAppleToken directly.
jest.mock('jose', () => ({
  createRemoteJWKSet: jest.fn(() => ({})),
  jwtVerify: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findByUserId: jest.fn<(...args: any[]) => Promise<any>>(),
    findOrCreateAppleUser: jest.fn<(...args: any[]) => Promise<any>>(),
  };

  const mockJwtService = {
    signAsync: jest.fn<(...args: any[]) => Promise<string>>(),
  };

  const mockConfigService = {
    get: jest.fn<(...args: any[]) => any>(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('appleLogin', () => {
    const appleAuthDto = {
      identityToken: 'mock-apple-token',
      nonce: 'mock-raw-nonce',
      givenName: 'Lucky',
      familyName: 'Vishwakarma',
    };

    const mockAppleUser = {
      sub: 'apple-user-123',
      email: 'lucky@example.com',
      emailVerified: true,
    };

    const mockUser = {
      id: 1,
      name: 'Lucky Vishwakarma',
      userId: null,
      email: 'lucky@example.com',
    };

    it('should authenticate Apple user and generate JWT', async () => {
      jest.spyOn(service, 'verifyAppleToken').mockResolvedValue(mockAppleUser);

      mockUsersService.findOrCreateAppleUser.mockResolvedValue(mockUser);
      mockJwtService.signAsync.mockResolvedValue('mock-oneai-jwt');

      const result = await service.appleLogin(appleAuthDto);

      expect(service.verifyAppleToken).toHaveBeenCalledWith(
        appleAuthDto.identityToken,
        appleAuthDto.nonce,
      );

      expect(mockUsersService.findOrCreateAppleUser).toHaveBeenCalledWith({
        providerUserId: 'apple-user-123',
        email: 'lucky@example.com',
        givenName: 'Lucky',
        familyName: 'Vishwakarma',
      });

      expect(mockJwtService.signAsync).toHaveBeenCalledWith({
        sub: 1,
        userId: null,
      });

      expect(result).toEqual({
        accessToken: 'mock-oneai-jwt',
        user: mockUser,
      });
    });

    it('should reject login when Apple token verification fails', async () => {
      jest
        .spyOn(service, 'verifyAppleToken')
        .mockRejectedValue(new UnauthorizedException('Invalid Apple token'));

      await expect(service.appleLogin(appleAuthDto)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(mockUsersService.findOrCreateAppleUser).not.toHaveBeenCalled();
      expect(mockJwtService.signAsync).not.toHaveBeenCalled();
    });
  });
});

