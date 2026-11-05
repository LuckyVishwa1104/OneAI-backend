import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { firebaseAdminAuth } from '../firebase/firebase-admin';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { createHash } from 'crypto';
import { AppleAuthDto } from './dto/apple-auth.dto';

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
    try {
      const decodedToken = await firebaseAdminAuth.verifyIdToken(idToken);

      return {
        sub: decodedToken.uid,
        email: decodedToken.email,
        email_verified: decodedToken.email_verified,
        name: decodedToken.name,
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired Firebase ID token');
    }
  }

  async googleLogin(idToken: string) {
    const googleUser = await this.verifyGoogleToken(idToken);

    if (!googleUser?.sub || googleUser.email_verified !== true) {
      throw new UnauthorizedException(
        'Invalid Google account or unverified email',
      );
    }

    const user = await this.usersService.findOrCreateGoogleUser({
      providerUserId: googleUser.sub,
      email: googleUser.email,
      name: googleUser.name,
    });

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
        email: user.email,
      },
    };
  }

  async verifyAppleToken(identityToken: string, rawNonce: string) {
    const clientId = this.configService.get<string>('APPLE_CLIENT_ID');

    if (!clientId) {
      throw new InternalServerErrorException(
        'Apple authentication is not configured',
      );
    }

    try {
      const { payload } = await jwtVerify(identityToken, appleJwks, {
        issuer: 'https://appleid.apple.com',
        audience: clientId,
        algorithms: ['RS256'],
      });

      const expectedNonce = createHash('sha256').update(rawNonce).digest('hex');

      if (!payload.sub) {
        throw new UnauthorizedException('Invalid Apple user identity');
      }

      if (
        typeof payload.nonce !== 'string' ||
        payload.nonce !== expectedNonce
      ) {
        throw new UnauthorizedException('Invalid Apple authentication nonce');
      }

      return {
        sub: payload.sub,
        email: typeof payload.email === 'string' ? payload.email : undefined,
        emailVerified:
          payload.email_verified === true || payload.email_verified === 'true',
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      console.error('Apple token verification failed:', error);

      throw new UnauthorizedException(
        'Invalid or expired Apple identity token',
      );
    }
  }

  async appleLogin(data: AppleAuthDto) {
    const appleUser = await this.verifyAppleToken(
      data.identityToken!,
      data.nonce!,
    );

    const user = await this.usersService.findOrCreateAppleUser({
      providerUserId: appleUser.sub,
      email: appleUser.email,
      givenName: data.givenName,
      familyName: data.familyName,
    });

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
        email: user.email,
      },
    };
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

const appleJwks = createRemoteJWKSet(
  new URL('https://appleid.apple.com/auth/keys'),
);
