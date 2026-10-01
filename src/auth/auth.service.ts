import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { userId, password } = loginDto;

    const user = await this.usersService.findByUserId(userId);

    if (!user || user.authIdentity.length === 0) {
      throw new UnauthorizedException('Invalid user ID or password');
    }

    const authIdentity = user.authIdentity[0];

    const passwordMatches = await bcrypt.compare(
      password,
      authIdentity.passwordHash!,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid user ID or password');
    }

    const payload = {
      sub: user.id,
      userId: user.userId,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        userId: user.userId,
      },
    };
  }
}
