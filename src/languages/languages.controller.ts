// languages/languages.controller.ts
/* Created By: Rahul 01-12-2023 */
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { Language } from './languages.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllLanguages(): Promise<Language[]> {
    return this.languagesService.getAllLanguages();
  }

  @Get(':id')
  async getLanguageById(@Param('id') id: string): Promise<Language> {
    return this.languagesService.getLanguageById(id);
  }

  @Post()
  async createLanguage(@Body() lang: Language): Promise<Language> {
    return this.languagesService.createLanguage(lang);
  }

  @Put(':id')
  async updateLanguage(@Param('id') id: string, @Body() lang: Language): Promise<Language> {
    return this.languagesService.updateLanguage(id, lang);
  }

  @Delete(':id')
  async deleteLanguage(@Param('id') id: string): Promise<Language> {
    return this.languagesService.deleteLanguage(id);
  }
}
