import { PixService } from './pix.service';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { OriginalDTO } from './dto/valor.dto';
import { CobrancasQueryDTO } from './dto/cobrancas-query.dto';
import { CobrancasResponseDTO } from './dto/cobrancas.response.dto';

@ApiTags('Pix')
@Controller('pix')
export class PixController {
  constructor(private readonly pixService: PixService) {}

  @Post('auth')
  async auth() {
    return await this.pixService.oauth();
  }

  @Post('criar-cobranca-pix')
  async createCobranca(@Body() originalDTO: OriginalDTO) {
    return this.pixService.criarCobranca(originalDTO.original);
  }

  @Get('qrcode/:id')
  async getQrcode(@Param('id') id: number) {
    return this.pixService.getQrcode(id);
  }

  @ApiQuery({ name: 'status', enum: ['ATIVA', 'CONCLUIDA'], required: false })
  @Get('cobrancas')
  async getCobrancas(
    @Query() cobrancasQuery: CobrancasQueryDTO,
  ): Promise<CobrancasResponseDTO> {
    return this.pixService.getCobrancas(cobrancasQuery);
  }

  @Post('web-hook')
  async webhook(@Req() req: any) {
    console.log(req.body);
    return '200';
  }
}
