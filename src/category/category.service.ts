// categories/categories.service.ts
/* Created By: Rahul 01-12-2023 */
import { Injectable, ConflictException, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) {}

  async createCategory(category: Category): Promise<Category> {    
    const { name } = category;

    // Check if the email already exists in the database
    const existingCategory = await this.categoryModel.findOne({ name }).exec();
    if (existingCategory) {
      throw new ConflictException('name already exists');
    }

    try {
      const createdCategory = new this.categoryModel(category);
      return await createdCategory.save();
    } catch (error) {
      console.error('Error creating category:', error.message);
      throw new BadRequestException('Unable to create category',error.message);
    }
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryModel.find().exec();
    } catch (error) {
      console.error('Error getting all categories:', error.message);
      throw new BadRequestException('Unable to retrieve categories',error.message);
    }
  }

  async getCategoryById(id: string): Promise<Category> {
    try {
      const category = await this.categoryModel.findById(id).exec();
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      console.error('Error getting category by ID:', error.message);
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException as it is a client error
      } else {
        throw new BadRequestException('Unable to retrieve category',error.message);
      }
    }
  }

  async updateCategory(id: string, updatedCategory: Category): Promise<Category> {
    const { name } = updatedCategory;

    // Check if the email already exists in the database for other categories
    const existingCategory = await this.categoryModel.findOne({ name, _id: { $ne: id } }).exec();
    if (existingCategory) {
      throw new ConflictException('Email already exists for another category');
    }

    try {
      const category = await this.categoryModel.findByIdAndUpdate(id, updatedCategory, { new: true }).exec();
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      console.error('Error updating category:', error.message);
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException as it is a client error
      } else {
        throw new BadRequestException('Unable to update category',error.message);
      }
    }
  }

  async deleteCategory(id: string): Promise<Category> {
    try {
      const category = await this.categoryModel.findByIdAndDelete(id).exec();
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      console.error('Error deleting category:', error.message);
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException as it is a client error
      } else {
        throw new BadRequestException('Unable to delete category',error.message);
      }
    }
  }
}
