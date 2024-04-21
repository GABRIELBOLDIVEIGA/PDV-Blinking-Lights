import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { ApiTags } from '@nestjs/swagger';
import { Endereco } from './entities/endereco.entity';
import { ClienteEndereco } from './entities/cliente_endereco.entity';

@ApiTags('Endereço')
@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Post()
  create(@Body() createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
    return this.enderecosService.create(createEnderecoDto);
  }

  @Post('cliente-endereco/:cliente_id')
  createEnderecoCliente(
    @Param('cliente_id', ParseIntPipe) cliente_id: number,
    @Body() createEnderecoDto: CreateEnderecoDto,
  ) {
    return this.enderecosService.createEnderecoCliente(
      cliente_id,
      createEnderecoDto,
    );
  }

  @Get('cliente/:id')
  enderecosByClienteId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClienteEndereco[]> {
    return this.enderecosService.getEnderecosByClienteId(id);
  }

  @Get()
  findAll(): Promise<Endereco[]> {
    return this.enderecosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Endereco> {
    return this.enderecosService.getById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnderecoDto: UpdateEnderecoDto,
  ): Promise<Endereco> {
    return this.enderecosService.update(id, updateEnderecoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.enderecosService.softDeleteById(id);
  }
}
