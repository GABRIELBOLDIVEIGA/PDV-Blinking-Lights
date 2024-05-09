import { PixService } from './pix.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Sse,
  Res,
  UseGuards,
  Req,
  MessageEvent,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Observable,
  Subscription,
  defer,
  lastValueFrom,
  map,
  repeat,
  subscribeOn,
  tap,
} from 'rxjs';
import { Response } from 'express';
import { WebhookPostDTO } from './dto/webhook-post.dto';
import yaml from 'js-yaml';

@ApiTags('Pix')
@Controller('pix')
export class PixController {
  constructor(private readonly pixService: PixService) {}

  @Sse('/aws/:txid')
  events(
    @Param('txid') txid: string,
    @Res() response: Response,
  ): Observable<MessageEvent> {
    return defer(() => this.pixService.resolveJobs(txid)).pipe(
      repeat({ delay: 3000 }),
      tap((report) => {
        if (report.status === true) {
          setTimeout(() => {
            response.end();
          }, 1000);
        }
      }),
      map((report) => ({ type: 'message', data: report })),
    );
  }

  // enviaremos uma requisição sem certificado e seu servidor não deverá aceitar a requisição
  @Post('webhook')
  async webhook1(@Req() req: Request, @Body() body: WebhookPostDTO) {
    console.log(body);
    return '200';
  }

  //  rota 'POST' com uma resposta padrão como uma string "200"
  @Post('webhook/api')
  async webhook2(@Req() req: Request, @Body() body: WebhookPostDTO) {
    // remover na fila de tarefas a tarefa com txid
    console.log('[Body] => ', body);

    await this.pixService.recebePagamento(body.txid);

    return '200';
  }
}
