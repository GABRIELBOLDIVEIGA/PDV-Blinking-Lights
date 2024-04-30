import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../common/base-repository';
import { Mesa } from './entities/mesa.entity';

@Injectable({ scope: Scope.REQUEST })
export class MesaRepository extends BaseRepository {
  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  async fecharMesa(id: number) {
    await this.getRepository(Mesa).update(
      { id },
      { disponivel: true, comanda: null },
    );

    return await this.getRepository(Mesa).findOneBy({ id });
  }
}
