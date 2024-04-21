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

@ApiTags('Usuario')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  getAll(): Promise<Usuario[]> {
    return this.usuariosService.getAll();
  }

  @Get(':id')
  getUsuarioById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuariosService.getById(id);
  }

  @Post()
  createUsuario(@Body() usuario: CreateUsuarioDto): Promise<Usuario> {
    return this.usuariosService.createUsuario(usuario);
  }

  @Patch(':id')
  updateUsuarioById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuario: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return this.usuariosService.updateUsuario(id, updateUsuario);
  }

  @Delete(':id')
  softDeleteUsuarioById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string> {
    return this.usuariosService.softDeleteById(id);
  }
}
