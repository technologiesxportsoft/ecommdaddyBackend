// app.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  /* Created By: Rahul 30-11-2023 */
  @Post('login')
  async login(@Body() user: any): Promise<{ accessToken: string }> {
    // Authenticate user (e.g., validate credentials)
    // ...

    // Generate and return JWT token upon successful authentication
    const accessToken = this.authService.generateToken({ sub: user.id, username: user.username });
    return { accessToken };
  }
}
