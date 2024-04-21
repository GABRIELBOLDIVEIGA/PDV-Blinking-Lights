import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';
import { Estoque } from './entities/estoque.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../produtos/entities/produto.entity';

@Injectable()
export class EstoqueService {
  constructor(
    @InjectRepository(Estoque)
    private readonly estoqueRepository: Repository<Estoque>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  async create(createEstoqueDto: CreateEstoqueDto): Promise<Estoque> {
    try {
      const produto = await this.produtoRepository.findOneBy({
        id: createEstoqueDto.produto_id,
      });
      if (!produto) throw new NotFoundException();

      const novoEstoque = this.estoqueRepository.create({
        ...createEstoqueDto,
        produto,
      });

      return await this.estoqueRepository.save(novoEstoque);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Estoque[]> {
    try {
      return await this.estoqueRepository.find({ relations: ['produto'] });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Estoque> {
    try {
      const estoque = await this.estoqueRepository.findOne({
        where: { id },
      });
      if (!estoque) throw new NotFoundException();

      return estoque;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateEstoqueDto: UpdateEstoqueDto,
  ): Promise<Estoque> {
    try {
      const result = await this.estoqueRepository.update(
        { id },
        { ...updateEstoqueDto },
      );

      if (result.affected === 0) throw new NotFoundException();

      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const result = await this.estoqueRepository.delete({ id });

      if (result.affected === 0) throw new NotFoundException();

      return 'Registro deletado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
