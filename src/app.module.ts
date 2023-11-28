// app.module.ts

import { Module } from '@nestjs/common';
import { MongodbModule } from './mongodb.module';
import { UsersModule } from './users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongodbModule,UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
