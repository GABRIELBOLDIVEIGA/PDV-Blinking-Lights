import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './database/usuarios/entities/usuario.entity';
import { Endereco } from './database/enderecos/entities/endereco.entity';
import { Cliente } from './database/clientes/entities/cliente.entity';
import { ClienteEndereco } from './database/enderecos/entities/cliente_endereco.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './database/usuarios/usuarios.module';
import { EnderecosModule } from './database/enderecos/enderecos.module';
import { ClientesModule } from './database/clientes/clientes.module';
import { DataBaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.MYSQL_HOST,
    //   port: +process.env.MYSQL_PORT,
    //   username: process.env.MYSQL_USER_NAME,
    //   password: process.env.MYSQL_PASSWORD,
    //   database: process.env.MYSQL_DATA_BASE,
    //   entities: [Usuario, Endereco, Cliente, ClienteEndereco],
    //   synchronize: true,
    // }),

    // UsuariosModule,
    // EnderecosModule,
    // ClientesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
