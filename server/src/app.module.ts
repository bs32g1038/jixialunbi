import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RateLimitMiddleware } from './middlewares/rate-limit.middleware';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { FileModule } from './modules/file/file.module';
import { LikeModule } from './modules/like/like.module';
import { NotificationModule } from './modules/notification/notification.module';
import { PostCollectionModule } from './modules/post-collection/post.collection.module';
import { PostTimeLineModule } from './modules/post-time-line/post.time.line.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    PostsModule,
    CategoryModule,
    CommentModule,
    LikeModule,
    PostCollectionModule,
    FileModule,
    NotificationModule,
    PostTimeLineModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes('api');
  }
}
