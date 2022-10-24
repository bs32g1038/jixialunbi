import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import ROLES from 'src/common/roles.enum';
import { CategoryService } from './category.service';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/api/category/create')
  @UseGuards(JwtAuthGuard({ role: ROLES.superAdmin }))
  async createCategory(@Request() req) {
    const { name, description } = req.body;
    return this.categoryService.createCategory(name, description);
  }

  @Get('/api/categories')
  async categories() {
    return this.categoryService.getAll();
  }

  @Post('/api/category/update')
  @UseGuards(JwtAuthGuard({ role: ROLES.superAdmin }))
  async updateCategory(@Request() req) {
    return this.categoryService.updateCategory(req.body);
  }
}
