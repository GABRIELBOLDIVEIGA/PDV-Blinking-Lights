import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  NotImplementedException,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../common/base-repository';
import { Mesa } from './entities/mesa.entity';
import { Comanda } from '../comandas/entities/comanda.entity';
import { MesaComanda } from './entities/mesa_comanda.entity';
import { StatusComanda } from '../comandas/enums/StatusComanda';

@Injectable({ scope: Scope.REQUEST })
export class MesaRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async abrirMesa(id: number) {
    const mesa = await this.getRepository(Mesa).findOne({
      where: { id },
      relations: ['comanda'],
    });
    if (!mesa) throw new NotFoundException('Mesa não encontrada.');
    if (mesa.comanda || !mesa.disponivel)
      throw new ForbiddenException(
        'Mesa já possui uma comanda ou se encontra aberta.',
      );

    const comanda = await this.getRepository(Comanda).save(
      this.getRepository(Comanda).create({ mesa }),
    );

    const result = await this.getRepository(Mesa).update(
      { id },
      { disponivel: false, comanda: comanda },
    );

    if (!result.affected) throw new NotImplementedException();

    await this.getRepository(MesaComanda).save(
      this.getRepository(MesaComanda).create({
        mesa,
        comanda,
      }),
    );

    return await this.getRepository(Mesa).findOne({
      where: { id },
      relations: ['comanda'],
    });
  }

  async fecharMesa(id: number) {
    const mesa = await this.getRepository(Mesa).findOne({
      where: { id },
      relations: ['comanda.produtos.produto'],
    });

    if (!mesa) throw new NotFoundException('Mesa não encontrada.');
    if (!mesa.comanda || mesa.disponivel)
      throw new ForbiddenException(
        'Mesa não possui uma comanda ou se encontra fechada.',
      );

    await this.getRepository(Mesa).update(
      { id },
      { disponivel: true, comanda: null },
    );

    const total = mesa.comanda.produtos.reduce(
      (accumulator, item) => accumulator + item.produto.preco_venda,
      0,
    );

    await this.getRepository(Comanda).update(
      { id: mesa.comanda.id },
      { status: StatusComanda.AGUARDANDO_PAGAMENTO, total },
    );

    return await this.getRepository(MesaComanda).findOne({
      where: {
        mesa: { id: mesa.id },
        comanda: { id: mesa.comanda.id },
      },
      relations: ['comanda.produtos.produto', 'comanda.mesa'],
    });
  }
}
