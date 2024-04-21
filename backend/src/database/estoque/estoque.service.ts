import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';
import { Estoque } from './entities/estoque.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EstoqueService {
  constructor(
    @InjectRepository(Estoque)
    private readonly estoqueRepository: Repository<Estoque>,
  ) {}
  create(createEstoqueDto: CreateEstoqueDto) {
    try {
      const novoEstoque = this.estoqueRepository.create(createEstoqueDto);

      return this.estoqueRepository.save(novoEstoque);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return `This action returns all estoque`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estoque`;
  }

  update(id: number, updateEstoqueDto: UpdateEstoqueDto) {
    return `This action updates a #${id} estoque`;
  }

  remove(id: number) {
    return `This action removes a #${id} estoque`;
  }
}
