import { Module } from '@nestjs/common';
import { PostCollectionService } from './post.collection.service';
import { PostCollectionController } from './post.collection.controller';

@Module({
  controllers: [PostCollectionController],
  providers: [PostCollectionService],
})
export class PostCollectionModule {}
