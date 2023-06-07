import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserInput } from './dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessToken } from './entities/user.entity';

const userDataPayload = {
  id: true,
  username: true,
};
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(createUserInput: UserInput) {
    // generate the password hash
    const hashPassword = await argon.hash(createUserInput.password);
    // save new user in DB
    try {
      const user = await this.prisma.user.create({
        data: {
          username: createUserInput.username.toUpperCase(),
          hash: hashPassword,
        },
        select: { ...userDataPayload },
      });
      return this.signToken(user.id, user.username);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credentials already taken.');
        }
      }
      throw error;
    }
  }

  async signIn(userInput: UserInput) {
    const user = await this.prisma.user.findUnique({
      where: { username: userInput.username.toUpperCase() },
      select: { ...userDataPayload, hash: true },
    });

    if (!user) throw new ForbiddenException('Incorrect credentials!.');

    const pwMatches = await argon.verify(user.hash, userInput.password);

    if (!pwMatches) throw new ForbiddenException('Wrong password.');

    return this.signToken(user.id, user.username);
  }

  async signToken(userId: string, username: string): Promise<AccessToken> {
    const payload = {
      sub: userId,
      username,
    };

    const secret = this.config.get('JWT_SECRET');

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '45m',
      secret,
    });

    return {
      access_token: accessToken,
    };
  }
}
