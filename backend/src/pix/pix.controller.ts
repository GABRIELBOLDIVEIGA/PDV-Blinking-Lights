import { PixService } from './pix.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post } from '@nestjs/common';

@ApiTags('Pix')
@Controller('pix')
export class PixController {
  constructor(private readonly pixService: PixService) {}

  @Post()
  async auth() {
    return await this.pixService.oauth();
  }

  @Get('via-cep')
  async viaCep() {
    return await this.pixService.viaCep();
  }
}
