import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEstoqueHistoricoDto } from './dto/create-estoque-historico.dto';
import { UpdateEstoqueHistoricoDto } from './dto/update-estoque-historico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstoqueHistorico } from './entities/estoque-historico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstoqueHistoricoService {
  constructor(
    @InjectRepository(EstoqueHistorico)
    private readonly estoqueHistoricoRepository: Repository<EstoqueHistorico>,
  ) {}

  async create(createEstoqueHistoricoDto: CreateEstoqueHistoricoDto) {
    return 'This action adds a new estoqueHistorico';
  }

  async findAll() {
    try {
      const historico = await this.estoqueHistoricoRepository.find({
        relations: ['estoque.produto'],
      });
      return historico;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} estoqueHistorico`;
  }

  async update(
    id: number,
    updateEstoqueHistoricoDto: UpdateEstoqueHistoricoDto,
  ) {
    return `This action updates a #${id} estoqueHistorico`;
  }

  async remove(id: number) {
    return `This action removes a #${id} estoqueHistorico`;
  }
}
