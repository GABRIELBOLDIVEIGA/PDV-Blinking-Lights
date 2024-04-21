import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto) {
    try {
      const novo_produto = this.produtoRepository.create(createProdutoDto);

      return this.produtoRepository.save(novo_produto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.produtoRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const produto = await this.produtoRepository.findOne({
        where: { id },
      });
      if (!produto) throw new NotFoundException();

      return produto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    try {
      const result = await this.produtoRepository.update(
        { id },
        { ...updateProdutoDto },
      );

      if (result.affected === 0) throw new NotFoundException();

      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.produtoRepository.delete({ id });

      if (result.affected === 0) throw new NotFoundException();

      return 'Produto deletado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
