// languages/languages.service.ts
/* Created By: Rahul 01-12-2023 */
import { Injectable, ConflictException, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language, LanguageDocument } from './languages.model';

@Injectable()
export class LanguagesService {
  constructor(@InjectModel(Language.name) private readonly languageModel: Model<LanguageDocument>) {}

  async createLanguage(language: Language): Promise<Language> {    
    const { name } = language;

    // Check if the email already exists in the database
    const existingLanguage = await this.languageModel.findOne({ name }).exec();
    if (existingLanguage) {
      throw new ConflictException('name already exists');
    }

    try {
      const createdLanguage = new this.languageModel(language);
      return await createdLanguage.save();
    } catch (error) {
      console.error('Error creating language:', error.message);
      throw new BadRequestException('Unable to create language',error.message);
    }
  }

  async getAllLanguages(): Promise<Language[]> {
    try {
      return await this.languageModel.find().exec();
    } catch (error) {
      console.error('Error getting all languages:', error.message);
      throw new BadRequestException('Unable to retrieve languages',error.message);
    }
  }

  async getLanguageById(id: string): Promise<Language> {
    try {
      const language = await this.languageModel.findById(id).exec();
      if (!language) {
        throw new NotFoundException(`Language with ID ${id} not found`);
      }
      return language;
    } catch (error) {
      console.error('Error getting language by ID:', error.message);
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException as it is a client error
      } else {
        throw new BadRequestException('Unable to retrieve language',error.message);
      }
    }
  }

  async updateLanguage(id: string, updatedLanguage: Language): Promise<Language> {
    const { name } = updatedLanguage;

    // Check if the email already exists in the database for other languages
    const existingLanguage = await this.languageModel.findOne({ name, _id: { $ne: id } }).exec();
    if (existingLanguage) {
      throw new ConflictException('Email already exists for another language');
    }

    try {
      const language = await this.languageModel.findByIdAndUpdate(id, updatedLanguage, { new: true }).exec();
      if (!language) {
        throw new NotFoundException(`Language with ID ${id} not found`);
      }
      return language;
    } catch (error) {
      console.error('Error updating language:', error.message);
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException as it is a client error
      } else {
        throw new BadRequestException('Unable to update language',error.message);
      }
    }
  }

  async deleteLanguage(id: string): Promise<Language> {
    try {
      const language = await this.languageModel.findByIdAndDelete(id).exec();
      if (!language) {
        throw new NotFoundException(`Language with ID ${id} not found`);
      }
      return language;
    } catch (error) {
      console.error('Error deleting language:', error.message);
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException as it is a client error
      } else {
        throw new BadRequestException('Unable to delete language',error.message);
      }
    }
  }
}
