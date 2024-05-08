import { PixService } from './pix.service';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  Sse,
  UseGuards,
  MessageEvent,
} from '@nestjs/common';
import { OriginalDTO } from './dto/valor.dto';
import { CobrancasQueryDTO } from './dto/cobrancas-query.dto';
import { CobrancasResponseDTO } from './dto/cobrancas.response.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Observable, defer, interval, map, repeat, tap } from 'rxjs';
import { Response } from 'express';
import yaml from 'js-yaml';

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

  // @ApiBearerAuth('JWT-auth')
  // @UseGuards(AuthGuard)
  @ApiQuery({ name: 'status', enum: ['ATIVA', 'CONCLUIDA'], required: false })
  @Get('cobrancas')
  async getCobrancas(
    @Query() cobrancasQuery: CobrancasQueryDTO,
  ): Promise<CobrancasResponseDTO> {
    return this.pixService.getCobrancas(cobrancasQuery);
  }

  @Sse('/docker/:txid')
  events(
    @Param('txid') txid: string,
    @Res() response: Response,
  ): Observable<MessageEvent> {
    console.log('[TXID] => ', txid);
    return defer(() => this.pixService.webhookAws(txid)).pipe(
      repeat({ delay: 1000 }),
      tap((report) => {
        if (report) {
          setTimeout(() => {
            response.end();
          }, 1000);
        }
      }),

      map((report) => ({ type: 'message', data: report })),
    );
  }
}
