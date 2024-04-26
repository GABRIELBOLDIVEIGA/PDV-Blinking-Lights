import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { Mesa } from './entities/mesa.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdicionarProdutoDto } from './dto/adicionar-produto.dto';
import { MesaProduto } from './entities/mesa_produto.entity';
import { Produto } from 'src/database/produtos/entities/produto.entity';
import { EditarQuantidadeDto } from './dto/editar-quandidade.dto';
import { FecharMesaDto } from './dto/fechar-mesa.tdo';
import { Venda } from '../vendas/entities/venda.entity';
import { VendasService } from '../vendas/vendas.service';

@Injectable()
export class MesasService {
  constructor(
    @InjectRepository(Mesa)
    private readonly mesaRepository: Repository<Mesa>,
    @InjectRepository(MesaProduto)
    private readonly mesaProdutoRepository: Repository<MesaProduto>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,

    private readonly dataSource: DataSource,
    private readonly vendasService: VendasService,
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

  async fecharMesa(fecharMesaDto: FecharMesaDto) {
    try {
      const mesaProdutos = await this.mesaProdutoRepository.find({
        where: { mesa: { id: fecharMesaDto.mesa_id } },
        relations: ['produto'],
      });

      const mesa = await this.mesaRepository.findOneBy({
        id: fecharMesaDto.mesa_id,
      });
      if (!mesa || !mesa.aberta)
        throw new NotFoundException('Mesa não encontrada ou mesa fechada.');

      const venda = await this.vendasService.create({
        mesa_id: mesa.id,
        cliente_id: null,
        ...fecharMesaDto,
      });
      // .then((venda) => {
      //   mesaProdutos.forEach(async (mesaProduto) => {
      //     await this.vendasService.adiconarProduto({
      //       venda_id: 14,
      //       produto_id: 2,
      //       quantidade: 0,
      //     });
      //   });
      // });

      mesaProdutos.forEach(async (produto) => {
        await this.vendasService.adiconarProduto({
          venda_id: venda.id,
          produto_id: produto.produto.id,
          quantidade: produto.quantidade,
        });
      });

      // this.vendasService.adiconarProduto({
      //   venda_id: mesaProdutos[0].mesa.id,
      //   produto_id: mesaProdutos[0].produto.id,
      //   quantidade: 2,
      // });

      // if (!venda) throw new NotImplementedException('Erro ao criar venda.');
      // console.log('[Venda] => ', venda);

      // transaction criar row vendas, criar rows venda_produto, deletar rows mesa_produto where mesa_id

      // const transaction = await this.dataSource.manager.transaction(
      //   async (manager) => {
      //     const create_venda = manager.create(Venda, {
      //       ...createVendaDto,
      //       usuario,
      //       cliente,
      //       formaDePagamento,
      //       mesa,
      //     });
      //   },
      // );

      // console.log('[Transaction] => ', transaction);
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
