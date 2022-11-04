import { Injectable } from '@nestjs/common';
import { Collection, PostTimeLine } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostTimeLineService {
  constructor(private prisma: PrismaService) {}
  async create(authorId: number, data: PostTimeLine): Promise<Collection> {
    const res = await this.prisma.postTimeLine.create({
      data: {
        ...data,
        authorId,
      },
    });
    return res;
  }

  async get(id: number) {
    return await this.prisma.postTimeLine.findFirst({
      where: {
        id,
      },
    });
  }

  async getAll() {
    return await this.prisma.postTimeLine.findMany();
  }

  async update(authorId: number, id: number, title: string) {
    return this.prisma.postTimeLine.updateMany({
      where: {
        id,
        authorId,
      },
      data: {
        title,
        updatedAt: new Date(),
      },
    });
  }

  async delete(authorId: number, id: number) {
    const res = await this.prisma.postTimeLine.findFirst({
      where: {
        id,
        authorId,
      },
    });
    if (!res) {
      return null;
    }
    const deleteCollection = this.prisma.postTimeLine.deleteMany({
      where: {
        authorId,
        id,
      },
    });
    return deleteCollection;
  }
}
