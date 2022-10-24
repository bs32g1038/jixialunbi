import { Module } from '@nestjs/common';
import { UserController } from './users.contoller';
import { UserService } from './users.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
