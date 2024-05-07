import { Module } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';
import { Endereco } from './entities/endereco.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from 'src/database/clientes/clientes.module';
import { Cliente } from 'src/database/clientes/entities/cliente.entity';
import { ClienteEndereco } from './entities/cliente_endereco.entity';

@Module({
  imports: [
    ClientesModule,
    TypeOrmModule.forFeature([Endereco, ClienteEndereco, Cliente]),
  ],
  controllers: [EnderecosController],
  providers: [EnderecosService],
})
export class EnderecosModule {}
