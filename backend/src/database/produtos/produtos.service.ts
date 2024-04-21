import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProdutoParams } from './types/CreateProdutoParams';
import { UpdateProdutoParams } from './types/UpdateProdutoParams';
import { ProdutoCategoria } from './entities/produto-categoria.entity';
import { Categoria } from '../categorias/entities/categoria.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(ProdutoCategoria)
    private readonly produtoCategoriaRepository: Repository<ProdutoCategoria>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createProdutoParams: CreateProdutoParams, categorias: number[]) {
    try {
      const transaction = await this.produtoRepository.manager.transaction(
        async () => {
          const novo_produto =
            this.produtoRepository.create(createProdutoParams);
          const produto = await this.produtoRepository.save(novo_produto);

          categorias.forEach(async (categoria_id) => {
            const categoria = await this.categoriaRepository.findOneBy({
              id: categoria_id,
            });

            const novo_produto_categoria =
              this.produtoCategoriaRepository.create({
                produto,
                categoria,
              });
            await this.produtoCategoriaRepository.save(novo_produto_categoria);
          });

          return produto;
        },
      );

      return await this.findOne(transaction.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.produtoRepository.find({
        relations: ['categorias.categoria'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const produto = await this.produtoRepository.findOne({
        where: { id },
        relations: ['categorias.categoria'],
      });
      if (!produto) throw new NotFoundException();

      return produto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // async update(id: number, updateProdutoParams: UpdateProdutoParams) {
  //   try {
  //     const result = await this.produtoRepository.update(
  //       { id },
  //       { ...updateProdutoParams },
  //     );

  //     if (result.affected === 0) throw new NotFoundException();

  //     return await this.findOne(id);
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

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
