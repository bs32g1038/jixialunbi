import { Controller, Get, Post } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { UseJwtAuthGuard } from 'src/decorators/guard.decorator.ts';
import { JoiBody, JoiQuery } from 'src/decorators/joi.decorator';
import { RequestUser } from 'src/decorators/request.decorator';
import Joi from 'src/joi';
import { CommentSchema } from 'src/joi/schemas/comment.schema';
import { CommentService } from './comment.service';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/api/comments')
  getComments(@JoiQuery({ postId: Joi.number().required() }) query: { postId: number }) {
    return this.commentService.findAll(query.postId);
  }

  @Post('/api/comments/create')
  @UseJwtAuthGuard()
  createComment(@RequestUser() user, @JoiBody(CommentSchema) comment: Comment) {
    return this.commentService.create(user.id, comment);
  }
}
