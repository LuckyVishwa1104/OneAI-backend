import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly googleClient = new OAuth2Client();

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.googleClient = new OAuth2Client(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
    );
  }

  async verifyGoogleToken(idToken: string) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
    });

    const payload = ticket.getPayload();

    return payload;
  }

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
