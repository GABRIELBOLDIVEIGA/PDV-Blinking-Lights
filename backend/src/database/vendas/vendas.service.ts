import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VendasService {
  constructor(
    @InjectRepository(Venda)
    private readonly vendaRepository: Repository<Venda>,
  ) {}
  create(createVendaDto: CreateVendaDto) {
    return 'This action adds a new venda';
  }

  async findAll() {
    try {
      const vendas = await this.vendaRepository.find({
        relations: ['formaDePagamento', 'status', 'cliente', 'usuario'],
      });

      return vendas;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} venda`;
  }

  update(id: number, updateVendaDto: UpdateVendaDto) {
    return `This action updates a #${id} venda`;
  }

  remove(id: number) {
    return `This action removes a #${id} venda`;
  }
}
