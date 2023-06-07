import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CredentialsInput } from './dto';
import * as argon from 'argon2';
import { MyUserPayload } from './entity/myuser';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async changePassword(credentials: CredentialsInput): Promise<MyUserPayload> {
    const user = await this.prisma.user.findUnique({
      where: { id: credentials.id },
      select: { hash: true },
    });

    if (!user) throw new ForbiddenException('Incorrect credentials!.');

    const pwMatches = await argon.verify(user.hash, credentials.password);

    if (!pwMatches) throw new ForbiddenException('Wrong current password.');
    // generate the password hash.
    const hashPassword = await argon.hash(credentials.newPassword);
    // update hash with newer password.
    const { username, id } = await this.prisma.user.update({
      where: {
        id: credentials.id,
      },
      data: {
        hash: hashPassword,
      },
    });

    return { username, id };
  }

  async deleteUser(targetId: string): Promise<MyUserPayload> {
    try {
      const { username, id } = await this.prisma.user.delete({
        where: { id: targetId },
      });
      return { username, id };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
