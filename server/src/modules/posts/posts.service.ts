import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { postsMeiliSearchIndex } from 'src/utils/meilisearch.util';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number): Promise<Post | null> {
    return this.prisma.post.findFirst({
      where: {
        id,
        deleted: null,
      },
    });
  }

  async findAllByCategoryId(filters: {
    ids: number[];
    authorId: number;
    categoryId: number;
    isHot?: boolean;
  }): Promise<{ items: Post[]; count: number }> {
    const { categoryId, authorId, isHot, ids } = filters;
    const where = {
      deleted: null,
    };
    if (ids.filter((_) => _).length > 0) {
      Object.assign(where, { id: { in: ids } });
    }
    if (categoryId) {
      Object.assign(where, { categoryId });
    }
    if (authorId) {
      Object.assign(where, { authorId });
    }
    const items = await this.prisma.post.findMany({
      where: { ...where },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            image: true,
            about: true,
          },
        },
        category: true,
        participants: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                image: true,
                about: true,
              },
            },
          },
          take: 10,
        },
        likes: {
          where: {
            authorId,
          },
        },
        collections: {
          where: {
            authorId,
          },
        },
        timeLines: true,
      },
      orderBy: {
        ...((isHot
          ? {
              commentCount: 'desc',
            }
          : { createdAt: 'desc' }) as any),
      },
    });
    const count = await this.prisma.post.count();
    return { items, count };
  }

  async findAllByAuthorId(
    authorId: number,
    categoryId: number,
    loginUserId: number
  ): Promise<{ items: Post[]; count: number }> {
    const where = { deleted: null };
    if (categoryId) {
      Object.assign(where, { categoryId });
    }
    if (authorId) {
      Object.assign(where, { authorId });
    }
    const items = await this.prisma.post.findMany({
      where,
      include: {
        author: true,
        category: true,
        participants: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                image: true,
              },
            },
          },
          take: 10,
        },
        likes: {
          where: {
            authorId: loginUserId,
          },
        },
        collections: {
          where: {
            authorId: loginUserId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const count = await this.prisma.post.count();
    return { items, count };
  }

  async create(authorId: number, input: Post): Promise<Post> {
    const creatPost = this.prisma.post.create({
      data: {
        ...input,
        authorId,
      },
    });
    const res = await this.prisma.$transaction([
      creatPost,
      this.prisma.user.update({
        where: {
          id: authorId,
        },
        data: {
          postCount: {
            increment: 1,
          },
        },
      }),
    ]);
    const post = res[0];
    postsMeiliSearchIndex.addDocuments([
      {
        id: post.id,
        title: post.title,
      },
    ]);
    return post;
  }

  async get(id: number): Promise<Post> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  async update(authorId: number, params: Post) {
    const { id, ...params_without_id } = params;
    await this.prisma.post.updateMany({
      where: {
        id,
        authorId,
      },
      data: {
        ...params_without_id,
      },
    });
    const post = await this.get(id);
    postsMeiliSearchIndex.updateDocuments([
      {
        id: post.id,
        title: post.title,
      },
    ]);
    return post;
  }

  async delete(authorId: number, postId: number) {
    const deletePost = this.prisma.post.updateMany({
      where: {
        id: postId,
        authorId,
      },
      data: {
        deleted: new Date(),
      },
    });
    const res = await this.prisma.$transaction([
      deletePost,
      this.prisma.user.update({
        where: {
          id: authorId,
        },
        data: {
          postCount: {
            decrement: 1,
          },
        },
      }),
    ]);
    postsMeiliSearchIndex.deleteDocument(postId);
    return res[0];
  }
}
