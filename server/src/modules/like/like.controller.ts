import { Controller, Post, Request } from '@nestjs/common';
import { UseJwtAuthGuard } from 'src/decorators/guard.decorator.ts';
import { JoiBody } from 'src/decorators/joi.decorator';
import Joi from 'src/joi';
import { LikeService } from './like.service';

@Controller()
export class LikeController {
  constructor(private readonly linkService: LikeService) {}

  @Post('/api/likes/create')
  @UseJwtAuthGuard()
  create(@Request() req, @JoiBody({ postId: Joi.number().required() }) params: { postId: number }) {
    return this.linkService.create(req.user.id, params.postId);
  }

  @Post('/api/likes/delete')
  @UseJwtAuthGuard()
  delete(@Request() req, @JoiBody({ postId: Joi.number().required() }) params: { postId: number }) {
    return this.linkService.delete(req.user.id, params.postId);
  }
}
