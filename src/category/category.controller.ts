// categories/categories.controller.ts
/* Created By: Rahul 01-12-2023 */
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { Category } from './category.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllCategories(): Promise<Category[]> {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.getCategoryById(id);
  }

  @Post()
  async createCategory(@Body() cat: Category): Promise<Category> {
    return this.categoriesService.createCategory(cat);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() cat: Category): Promise<Category> {
    return this.categoriesService.updateCategory(id, cat);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.deleteCategory(id);
  }
}
