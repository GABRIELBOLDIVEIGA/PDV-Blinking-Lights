import { Module } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';
import { Endereco } from './entities/endereco.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEndereco } from './entities/cliente_endereco.entity';
import { ClientesModule } from 'src/clientes/clientes.module';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Module({
  imports: [
    ClientesModule,
    TypeOrmModule.forFeature([Endereco, ClienteEndereco, Cliente]),
  ],
  controllers: [EnderecosController],
  providers: [EnderecosService],
})
export class EnderecosModule {}
