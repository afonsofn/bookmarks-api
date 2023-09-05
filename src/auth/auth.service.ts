import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup({
    email,
    password,
  }: AuthDto): Promise<{ access_token: string }> {
    try {
      const hash = await argon.hash(password);

      const user = await this.prisma.user.create({
        data: { email, hash },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error.name === 'PrismaClientValidationError') {
        throw new BadRequestException('Credentials validation failed');
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credential taken');
        }
      }

      throw error;
    }
  }

  async signin({ email, password }: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw new ForbiddenException('Credentials incorrect');

      const pwMatches = await argon.verify(user.hash, password);
      if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credential taken');
        }
      }

      throw new BadRequestException('Credentials validation failed');
    }
  }

  async signToken(
    sub: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub, email };

    const secret = this.config.get('JWT_SECRET');

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return { access_token };
  }
}
