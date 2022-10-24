import { Injectable } from '@nestjs/common';
import { Category, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CategoryService {
  async createCategory(name: string, description: string) {
    const user = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    return user;
  }

  async updateCategory(data: Category) {
    const { id, ...params } = data;
    return await prisma.category.update({
      where: { id },
      data: params,
    });
  }

  async getAll() {
    return await prisma.category.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }
}
