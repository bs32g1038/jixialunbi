import { Controller, Get, Post, Request } from '@nestjs/common';
import { UseJwtAuthGuard } from 'src/decorators/guard.decorator.ts';
import { JoiBody, JoiQuery } from 'src/decorators/joi.decorator';
import Joi from 'src/joi';
import { PostTimeLineService } from './post.timeline.service';

@Controller()
export class PostTimeLineController {
  constructor(private readonly service: PostTimeLineService) {}

  @Post('/api/post-time-line/create')
  @UseJwtAuthGuard()
  create(@Request() req, @JoiBody({ postId: Joi.number().required(), title: Joi.string().max(400) }) body) {
    return this.service.create(req.user.id, body);
  }

  @Get('/api/post-time-line/get')
  @UseJwtAuthGuard()
  get(@JoiQuery({ id: Joi.number().required() }) query) {
    return this.service.get(query.id);
  }

  @Get('/api/post-time-line/getAll')
  getAll() {
    return this.service.getAll();
  }

  @Post('/api/post-time-line/update')
  @UseJwtAuthGuard()
  update(@Request() req, @JoiBody({ id: Joi.number().required(), title: Joi.string().max(400) }) body) {
    return this.service.update(req.user.id, body.id, body.title);
  }

  @Post('/api/post-time-line/delete')
  @UseJwtAuthGuard()
  delete(@Request() req, @JoiBody({ id: Joi.number().required() }) params: { id: number }) {
    return this.service.delete(req.user.id, params.id);
  }
}
