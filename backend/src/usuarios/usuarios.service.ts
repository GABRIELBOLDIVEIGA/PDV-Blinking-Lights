import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioParams } from './types/CreateUsuarioParams';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioParams } from './types/UpdateUsuarioParams';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async getAll(): Promise<Usuario[]> {
    try {
      return await this.usuarioRepository.find({ relations: ['endereco'] });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getById(user_id: number): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id: user_id },
      });
      if (!usuario) throw new NotFoundException();

      console.log(usuario);

      return usuario;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createUsuario(usuario: CreateUsuarioParams): Promise<Usuario> {
    try {
      const newUser = this.usuarioRepository.create({
        ...usuario,
        senha: await bcrypt.hash(usuario.senha, 12),
      });

      return this.usuarioRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateUsuario(
    id: number,
    updateUsuario: UpdateUsuarioParams,
  ): Promise<Usuario> {
    try {
      const result = await this.usuarioRepository.update(
        { id },
        { ...updateUsuario },
      );

      console.log(result);

      if (result.affected === 0) throw new NotFoundException();

      return await this.getById(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async softDeleteById(id: number): Promise<string> {
    try {
      const result = await this.usuarioRepository.softDelete({ id });

      if (result.affected === 0) throw new NotFoundException();

      return 'Usuário deletado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
