import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';

// Mock authentication service.
jest.mock('./auth.service', () => ({
  AuthService: class AuthService {},
}));

// Mock users service.
jest.mock('../users/users.service', () => ({
  UsersService: class UsersService {},
}));

// Mock JWT guard to avoid loading @nestjs/passport.
jest.mock('./guards/jwt-auth.guard', () => ({
  JwtAuthGuard: class JwtAuthGuard {},
}));

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {};
  const mockUsersService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});