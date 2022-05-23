import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(createUserInput: CreateUserInput) {
    // generate the password hash
    const hashPassword = await argon.hash(createUserInput.password);
    // save new user in DB
    try {
      const user = await this.prisma.user.create({
        data: { username: createUserInput.username, hash: hashPassword },
        select: {
          id: true,
          username: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('Credentials already taken.');
        }
      }
      throw error;
    }
  }
}
