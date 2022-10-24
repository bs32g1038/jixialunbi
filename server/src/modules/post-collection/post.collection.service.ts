import { Injectable } from '@nestjs/common';
import { Collection } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostCollectionService {
  constructor(private prisma: PrismaService) {}
  async create(authorId: number, postId: number): Promise<Collection> {
    const res = await this.prisma.collection.findFirst({
      where: {
        postId,
        authorId,
      },
    });
    if (res) {
      return res;
    }
    const increaseCollectCount = this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        collectCount: {
          increment: 1,
        },
      },
    });
    const createCollection = this.prisma.collection.create({
      data: {
        postId,
        authorId,
      },
    });
    return await this.prisma.$transaction([createCollection, increaseCollectCount])[0];
  }

  async delete(authorId: number, postId: number) {
    const res = await this.prisma.collection.findFirst({
      where: {
        postId,
        authorId,
      },
    });
    if (!res) {
      return null;
    }
    const decrementCollectCount = this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        collectCount: {
          decrement: 1,
        },
      },
    });
    const deleteCollection = this.prisma.collection.deleteMany({
      where: {
        authorId,
        postId,
      },
    });
    return this.prisma.$transaction([deleteCollection, decrementCollectCount])[0];
  }
}
