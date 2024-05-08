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

// export interface MessageEvent {
//   data: string | object;
//   id?: string;
//   type?: string;
//   retry?: number;
// }

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

  @Sse('sse')
  events(@Res() response: Response): Observable<MessageEvent> {
    const milliseconds = 1000;

    const promise = new Promise<{ tentativas: number }>((resolve, reject) => {
      var count = 1;

      var rand = (Math.random() * 10).toFixed();

      while (Number(rand) != 1) {
        console.log('[Tentativa] => ', count);
        count++;

        rand = (Math.random() * 200).toFixed();
      }

      const data = { tentativas: count };

      setTimeout(resolve, milliseconds, data);
    });

    return defer(() => promise).pipe(
      repeat({ delay: 1000 }),
      tap((report) => {
        console.log('[Report] => ', report);
        if (report) {
          response.end();
        }
      }),
      // map((report) => ({ type: 'message', data: report })),
      map((report) => ({ data: report })),
    );
  }

  @Post('web-hook')
  async webhook(@Req() req: any) {
    console.log(req.body);
    return '200';
  }
}
