import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/typeorm/entities/Usuario';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario-dto';
import { CreateUsuarioParams } from './types/CreateUsuarioParams';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async getAll() {
    console.log('getAll');
    return await this.usuarioRepository.find();
  }

  async createUsuario(usuario: CreateUsuarioParams) {
    console.log('[createUsuario] => ', usuario);
    const newUser = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(newUser);
  }
}
