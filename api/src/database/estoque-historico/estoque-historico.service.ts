import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEstoqueHistoricoDto } from './dto/create-estoque-historico.dto';
import { UpdateEstoqueHistoricoDto } from './dto/update-estoque-historico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstoqueHistorico } from './entities/estoque-historico.entity';
import { Repository } from 'typeorm';
import { Estoque } from '../estoque/entities/estoque.entity';

@Injectable()
export class EstoqueHistoricoService {
  constructor(
    @InjectRepository(EstoqueHistorico)
    private readonly estoqueHistoricoRepository: Repository<EstoqueHistorico>,
    @InjectRepository(Estoque)
    private readonly estoqueRepository: Repository<Estoque>,
  ) {}

  async create(createEstoqueHistoricoDto: CreateEstoqueHistoricoDto) {
    try {
      const estoque = await this.estoqueRepository.findOneBy({
        id: createEstoqueHistoricoDto.estoque,
      });
      if (!estoque) throw new NotFoundException();

      const novoEstoqueHistorico = this.estoqueHistoricoRepository.create({
        ...createEstoqueHistoricoDto,
        estoque,
      });

      return await this.estoqueHistoricoRepository.save(novoEstoqueHistorico);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
