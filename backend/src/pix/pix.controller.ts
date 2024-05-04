import { PixService } from './pix.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, StreamableFile, Header } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@ApiTags('Pix')
@Controller('pix')
export class PixController {
  constructor(private readonly pixService: PixService) {}

  @Get()
  async auth() {
    return await this.pixService.oauth();
  }

  @Get('cert1')
  @Header('Content-Type', 'application/json')
  @Header(
    'Content-Disposition',
    'attachment; filename="homologacao-568341-PDV.p12"',
  )
  getStaticFile(): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), 'src/certs/homologacao-568341-PDV.p12'),
    );
    return new StreamableFile(file);
  }
}
