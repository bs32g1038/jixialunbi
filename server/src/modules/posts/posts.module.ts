import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostController } from './posts.controller';

@Module({
  controllers: [PostController],
  providers: [PostsService],
})
export class PostsModule {}
