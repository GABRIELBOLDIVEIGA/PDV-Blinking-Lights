import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario-dto';
import { UpdateUsuarioDto } from './dto/update-usuario-dto';

import { ApiTags } from '@nestjs/swagger';
import { Usuario } from './entities/usuario.entity';

@ApiTags('Usuarios')
@Controller('usuario')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  async getAll(): Promise<Usuario[]> {
    return this.usuariosService.getAll();
  }

  @Get(':id')
  async getUsuarioById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Usuario> {
    return this.usuariosService.getById(id);
  }

  @Post()
  async createUsuario(@Body() usuario: CreateUsuarioDto): Promise<Usuario> {
    return this.usuariosService.createUsuario(usuario);
  }

  @Patch(':id')
  async updateUsuarioById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuario: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return this.usuariosService.updateUsuario(id, updateUsuario);
  }

  @Delete(':id')
  async softDeleteUsuarioById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string> {
    return this.usuariosService.softDeleteById(id);
  }
}
