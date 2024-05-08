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
  UseGuards,
} from '@nestjs/common';
import { MesasService } from './mesas.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Mesa } from './entities/mesa.entity';
import { Observable, defer, map, repeat, tap } from 'rxjs';
import { Response } from 'express';
import { MesaResponseDto } from './dto/response/mesa-response.dto';
import { plainToInstance } from 'class-transformer';
import { FecharMesaDto } from './dto/fechar-mesa.dto';
import { MesaGateway } from 'src/database/mesas/mesas.gateway';
import { AuthGuard } from 'src/auth/auth.guard';
import { MesaComandaResponseDto } from './dto/response/mesa-comanda-response.dto';
import { FecharMesaResponseDto } from './dto/response/fechar-mesa-response.dto';

@ApiTags('Mesas')
// @ApiBearerAuth('JWT-auth')
// @UseGuards(AuthGuard)
@Controller('mesa')
export class MesasController {
  constructor(
    private readonly mesasService: MesasService,
    private readonly mesaGateway: MesaGateway,
  ) {}

  @Post()
  async create(@Body() createMesaDto: CreateMesaDto): Promise<Mesa> {
    return this.mesasService.create(createMesaDto);
  }

  @Get()
  async findAll(): Promise<MesaResponseDto[]> {
    const mesas = await this.mesasService.findAll();
    return plainToInstance(MesaResponseDto, mesas);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MesaResponseDto> {
    const mesa = await this.mesasService.findOne(id);

    return plainToInstance(MesaResponseDto, mesa);
  }

  @Patch('abrir-mesa/:id')
  async abrirMesa(@Param('id', ParseIntPipe) id: number) {
    const mesa = await this.mesasService.abrirMesa(id);
    this.mesaGateway.disponibilidadeMesa(mesa.id, mesa.nome, mesa.disponivel);

    return plainToInstance(MesaResponseDto, mesa);
  }

  @Patch('fechar-mesa/:id')
  async fecharMesa(@Param('id', ParseIntPipe) id: number) {
    const comanda_mesa = plainToInstance(
      FecharMesaResponseDto,
      await this.mesasService.fecharMesa(id),
    );

    this.mesaGateway.disponibilidadeMesa(
      comanda_mesa.comanda.mesa.id,
      comanda_mesa.comanda.mesa.nome,
      comanda_mesa.comanda.mesa.disponivel,
    );
    return comanda_mesa;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMesaDto: UpdateMesaDto,
  ): Promise<Mesa> {
    const mesa = await this.mesasService.update(id, updateMesaDto);
    if (updateMesaDto.disponivel != null) {
      this.mesaGateway.disponibilidadeMesa(
        mesa.id,
        mesa.comanda.mesa.nome,
        mesa.disponivel,
      );
    }
    return mesa;
  }

  @Sse('sse/:id/events')
  events(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): Observable<MessageEvent> {
    return defer(() => this.mesasService.findOne(id)).pipe(
      repeat({ delay: 1000 }),
      tap((report) => {
        if (report.disponivel === true) {
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
