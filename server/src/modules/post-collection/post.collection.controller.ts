import { Controller, Post, Request } from '@nestjs/common';
import { UseJwtAuthGuard } from 'src/decorators/guard.decorator.ts';
import { JoiBody } from 'src/decorators/joi.decorator';
import Joi from 'src/joi';
import { PostCollectionService } from './post.collection.service';

@Controller()
export class PostCollectionController {
  constructor(private readonly service: PostCollectionService) {}

  @Post('/api/post-collection/create')
  @UseJwtAuthGuard()
  create(@Request() req, @JoiBody({ postId: Joi.number().required() }) params: { postId: number }) {
    return this.service.create(req.user.id, params.postId);
  }

  @Post('/api/post-collection/delete')
  @UseJwtAuthGuard()
  delete(@Request() req, @JoiBody({ postId: Joi.number().required() }) params: { postId: number }) {
    return this.service.delete(req.user.id, params.postId);
  }
}
