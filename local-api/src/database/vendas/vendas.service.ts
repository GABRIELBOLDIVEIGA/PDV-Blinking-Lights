import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity';
import { DataSource, Repository } from 'typeorm';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { FormaDePagamento } from '../forma-de-pagamento/entities/forma-de-pagamento.entity';
import { Mesa } from '../mesas/entities/mesa.entity';
import { VendaProduto } from './entities/venda_produto.entity';
import { AdicionaProdutoDto } from './dto/adiciona-produto.dto';
import { Produto } from '../produtos/entities/produto.entity';
import { CreateVendaParams } from './types/create-venda.params';
import { UpdateVendaParams } from './types/update-venda.params';

@Injectable()
export class VendasService {
  constructor(
    @InjectRepository(Venda)
    private readonly vendaRepository: Repository<Venda>,
    @InjectRepository(VendaProduto)
    private readonly vendaProdutoRepository: Repository<VendaProduto>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Mesa)
    private readonly mesaRepository: Repository<Mesa>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(FormaDePagamento)
    private readonly formaDePagamentoRepository: Repository<FormaDePagamento>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    private dataSource: DataSource,
  ) {}

  async create(createVendaDto: CreateVendaDto) {
    const createVendaParams: CreateVendaParams = createVendaDto;

    try {
      const usuario = await this.usuarioRepository.findOneBy({
        id: createVendaParams.usuario_id,
      });
      if (!usuario) throw new NotFoundException('Usuário não encontrado.');

      let cliente: Cliente | null = null;
      if (createVendaParams.cliente_id) {
        cliente = await this.clienteRepository.findOneBy({
          id: createVendaParams.cliente_id,
        });
      }

      let mesa: Mesa | null = null;
      if (createVendaParams.mesa_id) {
        mesa = await this.mesaRepository.findOneBy({
          id: createVendaParams.mesa_id,
        });
      }

      let formaDePagamento: FormaDePagamento | null = null;
      if (createVendaParams.forma_de_pagamento_id) {
        formaDePagamento = await this.formaDePagamentoRepository.findOneBy({
          id: createVendaParams.forma_de_pagamento_id,
        });
      }

      const nova_venda = this.vendaRepository.create({
        ...createVendaParams,
        usuario,
        cliente,
        formaDePagamento,
        mesa,
      });

      const venda_salva = await this.vendaRepository.save(nova_venda);

      await Promise.all(
        await this.dataSource.manager.transaction(async (manager) => {
          const venda_produto = createVendaDto.prods.map(async (item) => {
            const produto = await manager.findOneBy(Produto, {
              id: item.id,
            });
            if (!produto || !venda_salva) return;

            const venda_produto = this.vendaProdutoRepository.create({
              quantidade: item.quantidade,
              venda: venda_salva,
              produto,
              produto_nome: produto.nome,
              produto_descricao: produto.descricao,
              produto_preco: produto.preco_venda,
            });
            await this.vendaProdutoRepository.save(venda_produto);

            return venda_produto;
          });

          return Promise.resolve(venda_produto);
        }),
      );

      return await this.findOne(venda_salva.id);
    } catch (error) {
      console.warn(error);
      throw new InternalServerErrorException(error);
    }
  }

  async adiconarProduto(adicionaProdutoDto: AdicionaProdutoDto) {
    try {
      const existe = await this.vendaProdutoRepository.findOne({
        where: {
          venda: { id: adicionaProdutoDto.venda_id },
          produto: { id: adicionaProdutoDto.produto_id },
        },
      });

      if (existe) {
        const result = await this.vendaProdutoRepository.update(existe.id, {
          quantidade: adicionaProdutoDto.quantidade + existe.quantidade,
        });

        if (result.affected === 0) throw new NotFoundException();

        return await this.vendaProdutoRepository.findOneBy({ id: existe.id });
      } else {
        const venda = await this.vendaRepository.findOneBy({
          id: adicionaProdutoDto.venda_id,
        });

        if (!venda) throw new NotFoundException('Venda não encontrada.');

        const produto = await this.produtoRepository.findOneBy({
          id: adicionaProdutoDto.produto_id,
        });

        if (!produto) throw new NotFoundException('Produto não encontrado.');

        const venda_produto = this.vendaProdutoRepository.create({
          quantidade: adicionaProdutoDto.quantidade,
          produto,
          produto_nome: produto.nome,
          produto_descricao: produto.descricao,
          produto_preco: produto.preco_venda,
          venda,
        });

        return await this.vendaProdutoRepository.save(venda_produto);
      }
    } catch (error) {
      console.log('[Error] => ', error);
      throw new InternalServerErrorException(error);
    }
  }

  async removeProduto(venda_id: number, produto_id: number) {
    const venda_produto = await this.vendaProdutoRepository.findOne({
      where: { venda: { id: venda_id }, produto: { id: produto_id } },
    });

    if (!venda_produto) throw new NotFoundException('Não encontrado.');

    const result = await this.vendaProdutoRepository.delete({
      id: venda_produto.id,
    });
  }

  async totalDeItensVendidos() {
    return await this.vendaProdutoRepository.count();
  }

  async findAll() {
    try {
      const vendas = await this.vendaRepository.find({
        relations: [
          'formaDePagamento',
          'cliente',
          'usuario',
          'produtos.produto',
        ],
      });

      return vendas;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const produto = await this.vendaRepository.findOne({
        where: { id },
        relations: [
          'formaDePagamento',
          'cliente',
          'usuario',
          'produtos.produto',
          'mesa',
        ],
      });
      if (!produto) throw new NotFoundException();

      return produto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateVendaParams: UpdateVendaParams) {
    try {
      const result = await this.vendaRepository.update(
        { id },
        { ...updateVendaParams },
      );

      if (result.affected === 0) throw new NotFoundException();

      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.vendaRepository.softDelete({ id });

      if (result.affected === 0) throw new NotFoundException();

      return 'Venda deletada com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
