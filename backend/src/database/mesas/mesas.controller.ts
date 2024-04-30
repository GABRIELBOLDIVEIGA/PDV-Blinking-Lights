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
import {
  MesaProdutoResponseDto,
  MesaResponseDto,
} from './dto/mesa-response.tdo';
import { plainToInstance } from 'class-transformer';
import { AdicionarProdutoDto } from './dto/adicionar-produto.dto';
import { EditarQuantidadeDto } from './dto/editar-quandidade.dto';
import { FecharMesaDto } from './dto/fechar-mesa.tdo';
import { AuthGuard } from 'src/auth/auth.guard';
import { MesaGateway } from 'src/database/mesas/mesas.gateway';

@ApiTags('Mesas')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
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

  @Post('adicionar-produto')
  async adicionarProduto(
    @Body() adicionarProdutoDto: AdicionarProdutoDto,
  ): Promise<string> {
    const response =
      await this.mesasService.adicionarProduto(adicionarProdutoDto);

    return response;
  }

  @Post('editar-quantidade-produto')
  async editarQuantidade(
    @Body() EditarQuantidadeDto: EditarQuantidadeDto,
  ): Promise<MesaProdutoResponseDto> {
    const response =
      await this.mesasService.editarQuantidade(EditarQuantidadeDto);
    return plainToInstance(MesaProdutoResponseDto, response);
  }

  @Post('fechar-mesa')
  async fecharMesa(@Body() fecharMesaDto: FecharMesaDto) {
    return this.mesasService.fecharMesa(fecharMesaDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMesaDto: UpdateMesaDto,
  ): Promise<Mesa> {
    const mesa = await this.mesasService.update(id, updateMesaDto);

    if (updateMesaDto.aberta != null) {
      this.mesaGateway.disponibilidadeMesa(mesa.id, mesa.aberta);
    }

    return mesa;
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
