import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SinginAuthDto } from './dto/singin-auth.dto';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor() {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  create(@Body() singinAuthDto: SinginAuthDto) {
    return 'Sem Singin nessa aplicação';
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get('teste')
  getProfile(@Request() req) {
    return req.user;
  }
}
