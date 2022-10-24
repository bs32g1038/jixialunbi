import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { isPlainObject, omit } from 'lodash';

const prisma = new PrismaClient();

const removePassword = (user) => {
  if (isPlainObject(user)) {
    return omit(user, 'password');
  }
  return user;
};

@Injectable()
export class UserService {
  async getAuthUser(account: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        account,
        password,
      },
    });
    return removePassword(user);
  }
  async getUser(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return removePassword(user);
  }
  async getUserByAccount(account: string) {
    const user = await prisma.user.findUnique({
      where: {
        account,
      },
    });
    return removePassword(user);
  }
  async createUser(input: User) {
    const user = await prisma.user.create({
      data: input,
    });
    return removePassword(user);
  }
  async updateUserById(id: number, input: User) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: input,
    });
    return removePassword(user);
  }
}
