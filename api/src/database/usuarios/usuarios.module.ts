import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Endereco } from 'src/database/enderecos/entities/endereco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  // imports: [TypeOrmModule.forFeature([Usuario, Endereco])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
