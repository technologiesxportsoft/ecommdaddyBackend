// auth/jwt-auth.guard.ts
/* Created By: Rahul 30-11-2023 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
