import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [JwtService],
})
export class AuthModule {}
