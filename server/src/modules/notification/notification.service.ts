import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) { }
  async getList(receiverId: number) {
    const res = await this.prisma.notification.findMany({
      where: {
        read: false,
        receiverId,
      },
    });
    return res;
  }

  async readed(id: number) {
    const res = await this.prisma.notification.update({
      where: {
        id,
      },
      data: {
        read: true
      }
    });
    return res;
  }
}
