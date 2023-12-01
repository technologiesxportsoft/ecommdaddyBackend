// app.module.ts

import { Module } from '@nestjs/common';
import { MongodbModule } from './mongodb.module';
import { UsersModule } from './users/users.module';

//Coded by: Rahul 01-12-2023
import { CategoriesModule } from './category/category.module';
import { BrandsModule } from './brands/brands.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { LanguagesModule } from './languages/languages.module';
import { CountriesModule } from './country/country.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

/* Created By: Rahul 30-11-2023 */
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    MongodbModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    BrandsModule,
    TestimonialsModule,
    LanguagesModule,
    CountriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
