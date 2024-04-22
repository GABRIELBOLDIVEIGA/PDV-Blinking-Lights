import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/database/usuarios/usuarios.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsuariosModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
