import { Injectable } from '@nestjs/common';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { Comanda } from './entities/comanda.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComandaRepository } from './comanda.repository';

@Injectable()
export class ComandasService {
  constructor(
    @InjectRepository(Comanda)
    private readonly comandaRepository: Repository<Comanda>,

    private comandaRepository_teste: ComandaRepository,
  ) {}

  create(createComandaDto: CreateComandaDto) {
    return 'This action adds a new comanda';
  }

  async findAll() {
    return await this.comandaRepository_teste.getAllComandas();
  }

  async findOne(id: number) {
    return await this.comandaRepository.findOne({
      where: { id },
      relations: ['produtos.produto', 'mesa'],
    });
  }

  update(id: number, updateComandaDto: UpdateComandaDto) {
    return `This action updates a #${id} comanda`;
  }

  remove(id: number) {
    return `This action removes a #${id} comanda`;
  }
}
