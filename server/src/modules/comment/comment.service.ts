import { BadRequestException, Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) { }
  async findAll(postId: number): Promise<{ items: Comment[]; count: number }> {
    const items = await this.prisma.comment.findMany({
      where: {
        postId,
        parentId: null
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            image: true,
            about: true,
            createdAt: true
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                image: true,
                about: true,
                createdAt: true
              },
            },
            replyComments: {
              include: {
                author: {
                  select: {
                    id: true,
                    username: true,
                    image: true,
                    about: true,
                    createdAt: true
                  },
                },
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const count = await this.prisma.comment.count();
    return { items, count };
  }

  async create(authorId: number, input: Comment): Promise<Comment> {
    if (!input.content) {
      throw new BadRequestException('content 不能为空！');
    }
    const increaseUserCommentCount = this.increaseUserCommentCount(authorId);
    const increasePostCommentCount = this.increasePostCommentCount(input.postId);
    const createPostParticipant = this.prisma.postParticipant.create({
      data: {
        postId: input.postId,
        authorId,
      },
    });
    const createComment = this.prisma.comment.create({
      data: {
        ...input,
        authorId,
      },
    });
    const res = await this.prisma.$transaction([
      createComment,
      increaseUserCommentCount,
      increasePostCommentCount,
      createPostParticipant,
    ]);
    return res[0];
  }

  increasePostCommentCount(postId: number) {
    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    });
  }

  increaseUserCommentCount(authorId: number) {
    return this.prisma.user.update({
      where: {
        id: authorId,
      },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    });
  }
}
