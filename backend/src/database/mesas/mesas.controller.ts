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
  MessageEvent,
  Res,
} from '@nestjs/common';
import { MesasService } from './mesas.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { ApiTags } from '@nestjs/swagger';
import { Mesa } from './entities/mesa.entity';
import { Observable, defer, map, repeat, tap } from 'rxjs';
import { Response } from 'express';

@ApiTags('Mesas')
@Controller('mesa')
export class MesasController {
  constructor(private readonly mesasService: MesasService) {}

  @Post()
  async create(@Body() createMesaDto: CreateMesaDto): Promise<Mesa> {
    return this.mesasService.create(createMesaDto);
  }

  @Get()
  async findAll(): Promise<Mesa[]> {
    return this.mesasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Mesa> {
    return this.mesasService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMesaDto: UpdateMesaDto,
  ): Promise<Mesa> {
    return this.mesasService.update(id, updateMesaDto);
  }

  // @Patch('abrir-mesa/:id')
  // async abrirMesa(@Param('id', ParseIntPipe) id: number,) {
  // }

  @Sse('sse/:id/events')
  events(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): Observable<MessageEvent> {
    return defer(() => this.mesasService.findOne(id)).pipe(
      repeat({ delay: 1000 }),
      tap((report) => {
        if (report.aberta === true) {
          setTimeout(() => {
            console.log('[Aberto]');
            response.end();
          }, 1000);
        }
        console.log('[Fechado]');
      }),
      map((report) => ({ type: 'message', data: report })),
    );
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.mesasService.remove(id);
  }
}
