// app.module.ts

import { Module } from '@nestjs/common';
import { MongodbModule } from './mongodb.module';
import { UsersModule } from './users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

/* Created By: Rahul 30-11-2023 */
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    MongodbModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
