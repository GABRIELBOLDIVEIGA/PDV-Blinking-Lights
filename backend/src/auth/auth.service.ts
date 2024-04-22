import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SinginAuthDto } from './dto/singin-auth.dto';
import { UsuariosService } from 'src/database/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { JwtDTO } from './dto/jwt.dto';
import { Permissao } from 'src/database/usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(singinAuthDto: SinginAuthDto): Promise<any> {
    const user = await this.usuariosService.getByEmail(singinAuthDto.email);

    if (!(await bcrypt.compare(singinAuthDto.senha, user.senha))) {
      throw new UnauthorizedException();
    }

    const payload: Partial<JwtDTO> = {
      sub: user.id,
      nome: user.nome,
      email: user.email,
      permissao: Permissao[user.permissao],
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: 7 * 24 * 60 * 1000,
      }),
    };
  }
}
