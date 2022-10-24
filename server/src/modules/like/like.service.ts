import { Injectable } from '@nestjs/common';
import { Like } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}
  async create(authorId: number, postId: number): Promise<Like> {
    const res = await this.prisma.like.findFirst({
      where: {
        postId,
        authorId,
      },
    });
    if (res) {
      return res;
    }
    const increaseLikeCount = this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likeCount: {
          increment: 1,
        },
      },
    });
    const createLike = this.prisma.like.create({
      data: {
        postId,
        authorId,
      },
    });
    return await this.prisma.$transaction([createLike, increaseLikeCount])[0];
  }
  async delete(authorId: number, postId: number) {
    const res = await this.prisma.like.findFirst({
      where: {
        postId,
        authorId,
      },
    });
    if (!res) {
      return null;
    }
    const descreaseLikeCount = this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likeCount: {
          decrement: 1,
        },
      },
    });
    const deleteLike = this.prisma.like.deleteMany({
      where: {
        authorId,
        postId,
      },
    });
    return await this.prisma.$transaction([deleteLike, descreaseLikeCount])[0];
  }
}
