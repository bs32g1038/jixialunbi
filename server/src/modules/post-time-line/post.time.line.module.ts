import { Module } from '@nestjs/common';
import { PostTimeLineService } from './post.timeline.service';
import { PostTimeLineController } from './post.time.line.controller';

@Module({
  controllers: [PostTimeLineController],
  providers: [PostTimeLineService],
})
export class PostTimeLineModule {}
