import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Categoria } from '../categorias/entities/categoria.entity';
import { ProdutoCategoria } from './entities/produto_categoria.entity';
import { UpdateProdutoParams } from './types/UpdateProdutoParams';
import { ProdutoFornecedor } from './entities/produto_fornecedor.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { Fornecedor } from '../fornecedor/entities/fornecedor.entity';

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

  async create(
    // createProdutoParams: CreateProdutoParams,
    // categorias: number[],
    createProdutoDto: CreateProdutoDto,
  ): Promise<Produto> {
    try {
      const transaction = await this.produtoRepository.manager.transaction(
        async (manager) => {
          const novo_produto = manager.create(Produto, {
            nome: createProdutoDto.nome,
            descricao: createProdutoDto.descricao,
            preco: createProdutoDto.preco,
          });
          const produto = await manager.save(Produto, novo_produto);

          // const produto = await manager.save(Produto, novo_produto);
          // const novo_produto = manager.create(ProdutoFornecedor, createProdutoParams);

          createProdutoDto.categorias.forEach(async (categoria_id) => {
            const categoria = await manager.findOneBy(Categoria, {
              id: categoria_id,
            });

            if (categoria) {
              const novo_produto_categoria = manager.create(ProdutoCategoria, {
                produto,
                categoria,
              });
              await manager.save(ProdutoCategoria, novo_produto_categoria);
            }
          });

          createProdutoDto.fornecedores.forEach(async (fornecedor_id) => {
            const fornecedor = await manager.findOne(Fornecedor, {
              where: { id: fornecedor_id },
            });
            if (fornecedor) {
              await manager.save(
                ProdutoFornecedor,
                manager.create(ProdutoFornecedor, { fornecedor, produto }),
              );
            }
          });

          return produto;
        },
      );

      return await this.findOne(transaction.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Produto[]> {
    try {
      return await this.produtoRepository.find({
        relations: [
          'categorias.categoria.subCategorias.subCategoria',
          'fornecedores.fornecedor',
          'subCategorias.subCategoria',
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Produto> {
    try {
      const produto = await this.produtoRepository.findOne({
        where: { id },
        relations: [
          'categorias.categoria',
          'subCategorias.subCategoria',
          'fornecedores.fornecedor',
        ],
      });
      if (!produto) throw new NotFoundException();

      return produto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateProdutoParams: UpdateProdutoParams,
  ): Promise<Produto> {
    try {
      const result = await this.produtoRepository.update(
        { id },
        { ...updateProdutoParams },
      );

      if (result.affected === 0) throw new NotFoundException();

      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const result = await this.produtoRepository.delete({ id });

      if (result.affected === 0) throw new NotFoundException();

      return 'Produto deletado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
