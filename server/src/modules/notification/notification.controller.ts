import { Controller, Get, Post } from '@nestjs/common';
import { UseJwtAuthGuard } from 'src/decorators/guard.decorator.ts';
import { JoiBody, JoiQuery } from 'src/decorators/joi.decorator';
import Joi from 'src/joi';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Get('/api/notifications')
  @UseJwtAuthGuard()
  create(@JoiQuery({ receiverId: Joi.number().required() }) query: { receiverId: number }) {
    return this.notificationService.getList(query.receiverId);
  }

  @Post('/api/notifications')
  @UseJwtAuthGuard()
  update(@JoiBody({ id: Joi.number().required() }) body: { id: number }) {
    return this.notificationService.readed(body.id);
  }
}
