import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { Mesa } from './entities/mesa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdicionarProdutoDto } from './dto/adicionar-produto.dto';
import { MesaProduto } from './entities/mesa_produto.entity';
import { Produto } from 'src/database/produtos/entities/produto.entity';
import { EditarQuantidadeDto } from './dto/editar-quandidade.dto';

@Injectable()
export class MesasService {
  constructor(
    @InjectRepository(Mesa)
    private readonly mesaRepository: Repository<Mesa>,
    @InjectRepository(MesaProduto)
    private readonly mesaProdutoRepository: Repository<MesaProduto>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  async create(createMesaDto: CreateMesaDto): Promise<Mesa> {
    try {
      const existe = await this.mesaRepository.findOne({
        where: { nome: createMesaDto.nome },
      });
      if (existe)
        throw new BadRequestException(
          `Mesa de nome ${existe.nome} já cadastrada no sistema.`,
        );

      const novaMesa = this.mesaRepository.create(createMesaDto);

      return this.mesaRepository.save(novaMesa);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Mesa[]> {
    try {
      return await this.mesaRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Mesa> {
    try {
      const mesa = await this.mesaRepository.findOne({
        where: { id },
        relations: ['produtos.produto'],
      });
      if (!mesa) throw new NotFoundException();

      return mesa;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async adicionarProduto(adicionarProdutoDto: AdicionarProdutoDto) {
    try {
      const mesa = await this.mesaRepository.findOne({
        where: {
          id: adicionarProdutoDto.mesa_id,
          aberta: true,
        },
      });

      if (!mesa)
        throw new NotFoundException(
          'Mesa não encontrada. Verifique se a mesa está aberta.',
        );

      const produto = await this.produtoRepository.findOneBy({
        id: adicionarProdutoDto.produto_id,
      });

      if (!produto) throw new NotFoundException('Produto não encontrado.');

      const mesaProduto = await this.mesaProdutoRepository.findOne({
        where: {
          mesa: { id: adicionarProdutoDto.mesa_id },
          produto: { id: adicionarProdutoDto.produto_id },
        },
      });

      // se mesa e produto existirem na mesma row, a quantidade de produto será atualizada
      if (mesaProduto) {
        const result = await this.mesaProdutoRepository.update(
          { id: mesaProduto.id },
          {
            quantidade: adicionarProdutoDto.quantidade + mesaProduto.quantidade,
          },
        );

        if (result.affected === 0) throw new NotFoundException();

        return await this.mesaProdutoRepository.findOneBy({
          id: mesaProduto.id,
        });
      }

      // se mesa e produto NÃO existirem na mesma row, uma nova row sera criada.
      if (!mesaProduto) {
        const create_mesa_produto = this.mesaProdutoRepository.create({
          quantidade: adicionarProdutoDto.quantidade,
          produto,
          mesa,
        });

        const novo_mesa_produto =
          await this.mesaProdutoRepository.save(create_mesa_produto);

        return await this.mesaProdutoRepository.findOne({
          where: {
            id: novo_mesa_produto.id,
          },
          relations: ['produto', 'mesa'],
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async editarQuantidade(editarQuantidadeDto: EditarQuantidadeDto) {
    try {
      const mesa = await this.mesaRepository.findOne({
        where: {
          id: editarQuantidadeDto.mesa_id,
          aberta: true,
        },
      });
      if (!mesa)
        throw new NotFoundException(
          'Mesa não encontrada. Verifique se a mesa está aberta.',
        );

      const produto = await this.produtoRepository.findOneBy({
        id: editarQuantidadeDto.produto_id,
      });

      if (!produto) throw new NotFoundException('Produto não encontrado.');

      const mesaProduto = await this.mesaProdutoRepository.findOne({
        where: {
          mesa: { id: editarQuantidadeDto.mesa_id },
          produto: { id: editarQuantidadeDto.produto_id },
        },
      });

      if (mesaProduto) {
        const result = await this.mesaProdutoRepository.update(
          { id: mesaProduto.id },
          {
            quantidade: editarQuantidadeDto.quantidade,
          },
        );

        if (result.affected === 0) throw new NotFoundException();

        return await this.mesaProdutoRepository.findOne({
          relations: ['produto'],
          where: {
            id: mesaProduto.id,
          },
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateMesaDto: UpdateMesaDto): Promise<Mesa> {
    try {
      const result = await this.mesaRepository.update(
        { id },
        { ...updateMesaDto },
      );

      if (result.affected === 0) throw new NotFoundException();

      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const result = await this.mesaRepository.softDelete({ id });

      if (result.affected === 0) throw new NotFoundException();

      return 'Mesa deletada com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
