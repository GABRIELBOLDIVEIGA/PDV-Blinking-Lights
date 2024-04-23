import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { ClientesModule } from './clientes/clientes.module';
import { FormaDePagamentoModule } from './forma-de-pagamento/forma-de-pagamento.module';
import { VendasModule } from './vendas/vendas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProdutosModule } from './produtos/produtos.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { EstoqueModule } from './estoque/estoque.module';
import { MesasModule } from './mesas/mesas.module';
import { SubCategoriasModule } from './sub-categorias/sub-categorias.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: configService.getOrThrow('MYSQL_PORT'),
        database: configService.getOrThrow('MYSQL_DATA_BASE'),
        username: configService.getOrThrow('MYSQL_USER_NAME'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    CategoriasModule,
    ClientesModule,
    EnderecosModule,
    EstoqueModule,
    FormaDePagamentoModule,
    FornecedorModule,
    MesasModule,
    ProdutosModule,
    UsuariosModule,
    VendasModule,
    SubCategoriasModule,
  ],
})
export class DataBaseModule {}
