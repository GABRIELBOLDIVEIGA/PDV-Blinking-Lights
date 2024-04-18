import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario-dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  getUsuario() {
    return this.usuariosService.getAll();
  }

  @Post()
  createUsuario(@Body() usuario: CreateUsuarioDto) {
    console.log('[Create] => ', usuario);
    return this.usuariosService.createUsuario(usuario);
  }
}
