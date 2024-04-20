import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Endereco } from './enderecos/entities/endereco.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: +process.env.DB_PORT,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATA_BASE,
      entities: [Usuario, Endereco],
      synchronize: true,
    }),
    UsuariosModule,
    EnderecosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
