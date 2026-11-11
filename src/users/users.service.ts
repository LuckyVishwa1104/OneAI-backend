import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name, userId, password, confirmPassword } = createUserDto;

    // Check password confirmation
    if (password !== confirmPassword) {
      throw new ConflictException('Password and confirm password do not match');
    }

    // Check if userId already exists
    const existingUser = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (existingUser) {
      throw new ConflictException('User with this user ID already exists');
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

  async findOrCreateGoogleUser(data: {
    providerUserId: string;
    email?: string;
    name?: string;
  }) {
    const { providerUserId, email, name } = data;

    // 1. Check whether this Google account already exists.
    const existingIdentity = await this.prisma.authIdentity.findUnique({
      where: {
        provider_providerUserId: {
          provider: 'GOOGLE',
          providerUserId,
        },
      },
      include: {
        user: true,
      },
    });

    if (existingIdentity) {
      return existingIdentity.user;
    }

    // 2. Avoid silently creating a duplicate account when
    // the email already belongs to another OneAI user.
    if (email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingEmail) {
        throw new ConflictException(
          'An account with this email already exists. Sign in with that account or implement account linking.',
        );
      }
    }

    // 3. Create the OneAI user and Google identity together.
    return this.prisma.user.create({
      data: {
        name: name || 'Google User',
        email: email || null,
        authIdentity: {
          create: {
            provider: 'GOOGLE',
            providerUserId,
          },
        },
      },
    });
  }

  async findOrCreateAppleUser(data: {
    providerUserId: string;
    email?: string;
    givenName?: string;
    familyName?: string;
  }) {
    const { providerUserId, email, givenName, familyName } = data;

    // 1. Check whether this Apple identity already exists.
    const existingIdentity = await this.prisma.authIdentity.findUnique({
      where: {
        provider_providerUserId: {
          provider: 'APPLE',
          providerUserId,
        },
      },
      include: {
        user: true,
      },
    });

    if (existingIdentity) {
      // Preserve the existing user profile.
      // Apple may not return the name on subsequent logins.
      return existingIdentity.user;
    }

    // 2. Check whether this email already belongs to another account.
    if (email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingEmail) {
        throw new ConflictException(
          'An account with this email already exists. Sign in with that account or implement account linking.',
        );
      }
    }

    // 3. Capture the name received during first authorization.
    const fullName = [givenName, familyName]
      .filter((part) => part?.trim())
      .join(' ')
      .trim();

    // 4. Create User + APPLE AuthIdentity together.
    return this.prisma.user.create({
      data: {
        name: fullName || 'Apple User',
        email: email || null,
        authIdentity: {
          create: {
            provider: 'APPLE',
            providerUserId,
          },
        },
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

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
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
}
