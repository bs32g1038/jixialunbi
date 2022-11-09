import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import * as Joi from 'joi';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import HTTP_EXCEPTION from 'src/common/http.exception';
import ROLES from 'src/common/roles.enum';
import { UseJwtAuthGuard } from 'src/decorators/guard.decorator.ts';
import { JoiBody, JoiParam, JoiQuery } from 'src/decorators/joi.decorator';
import { RequestUser } from 'src/decorators/request.decorator';
import { PostSchema } from 'src/joi/schemas/comment.schema';
import { postsMeiliSearchIndex } from 'src/utils/meilisearch.util';
import { PostsService } from './posts.service';

@Controller()
export class PostController {
  constructor(private readonly postService: PostsService) {}

  @Get('/api/posts')
  getPosts(
    @JoiQuery({
      id: Joi.number(),
      authorId: Joi.number(),
      categoryId: Joi.number(),
      isHot: Joi.boolean(),
      pinned: Joi.boolean(),
      good: Joi.boolean(),
      page: Joi.number().default(1),
      pageSize: Joi.number().default(20),
    })
    query: {
      id: number;
      categoryId: number;
      authorId: number;
      isHot: boolean;
      page: number;
      pageSize: number;
    }
  ) {
    return this.postService.findPostList({
      ...query,
      ids: [query.id],
    });
  }

  @Get('/api/posts/:id')
  getPostById(@JoiParam({ id: Joi.number().required() }) params: { id: number }) {
    return this.postService.get(params.id);
  }

  @Post('/api/posts/create')
  @UseJwtAuthGuard()
  async createPost(@RequestUser() user, @JoiBody(PostSchema) post) {
    if (!user.isActived) {
      throw HTTP_EXCEPTION.USER_NOT_ACTIVED;
    }
    return await this.postService.create(user.id, post);
  }

  @Post('/api/posts/update')
  @UseJwtAuthGuard()
  async updatePost(@Request() req) {
    return await this.postService.update(req.user.id, req.body);
  }

  @Post('/api/posts/delete')
  @UseJwtAuthGuard()
  deletePost(@Request() req) {
    return this.postService.delete(req.user.id, req.body.postId);
  }

  @Get('/api/posts-search')
  async postsSearch(@Request() req) {
    if (!req.query.query) {
      return {
        items: [],
        count: 0,
      };
    }
    const res = await postsMeiliSearchIndex.search(req.query.query);
    const ids = res.hits.map((item) => item.id);
    if (ids.length > 0) {
      const { items } = await this.postService.findPostList({
        categoryId: 0,
        authorId: 0,
        isHot: false,
        ids,
        page: req.query.page ?? 1,
        pageSize: req.query.pageSize ?? 20,
      });
      return {
        items,
        count: res.estimatedTotalHits,
      };
    }
    return {
      items: [],
      count: 0,
    };
  }

  @Post('/api/posts/pin')
  @UseGuards(JwtAuthGuard({ role: ROLES.superAdmin }))
  async pinPost(@Request() req, @JoiBody({ id: Joi.number(), pinned: Joi.boolean() }) body) {
    return await this.postService.update(req.user.id, {
      id: body.id,
      pinned: body.pinned,
    });
  }
}
