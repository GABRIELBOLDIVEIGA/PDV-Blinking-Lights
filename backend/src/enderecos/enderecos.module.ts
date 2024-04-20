import { Module } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';
import { Endereco } from './entities/endereco.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Endereco])],
  controllers: [EnderecosController],
  providers: [EnderecosService],
})
export class EnderecosModule {}
