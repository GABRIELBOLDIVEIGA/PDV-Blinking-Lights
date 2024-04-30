import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { Mesa } from './entities/mesa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comanda } from '../comandas/entities/comanda.entity';
import { ComandaRepository } from '../comandas/comanda.repository';
import { MesaRepository } from './mesa.repository';

@Injectable()
export class MesasService {
  constructor(
    @InjectRepository(Mesa)
    private readonly mesaRepository: Repository<Mesa>,
    @InjectRepository(Comanda)
    private comandaRepository: ComandaRepository,
    private mesaRepository_teste: MesaRepository,
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
      return await this.mesaRepository.find({
        relations: ['comanda.produtos.produto'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Mesa> {
    try {
      const mesa = await this.mesaRepository.findOne({
        where: { id },
        relations: ['comanda.produtos.produto'],
      });
      if (!mesa) throw new NotFoundException();

      return mesa;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // async adicionarProduto(
  //   adicionarProdutoDto: AdicionarProdutoDto,
  // ): Promise<string> {
  //   try {
  //     const mesa = await this.mesaRepository.findOne({
  //       where: {
  //         id: adicionarProdutoDto.mesa_id,
  //         // comanda: adicionarProdutoDto.comanda,
  //         disponivel: true,
  //       },
  //     });

  //     if (!mesa)
  //       throw new NotFoundException(
  //         'Mesa não encontrada. Verifique se a mesa está aberta.',
  //       );

  //     // await Promise.all(
  //     //   adicionarProdutoDto.prods.map(async (item) => {
  //     //     const produto = await this.produtoRepository.findOneBy({
  //     //       id: item.produto_id,
  //     //     });

  //     //     if (!produto) throw new NotFoundException('Produto não encontrado.');

  //     //     const mesaComanda = await this.mesaComandaRepository.findOne({
  //     //       where: {
  //     //         mesa: { id: adicionarProdutoDto.mesa_id },
  //     //         produto: { id: item.produto_id },
  //     //         comanda: adicionarProdutoDto.comanda,
  //     //       },
  //     //     });

  //     //     // se mesa e produto existirem na mesma row, a quantidade de produto será atualizada
  //     //     if (mesaComanda) {
  //     //       const result = await this.mesaComandaRepository.update(
  //     //         { id: mesaComanda.id },
  //     //         {
  //     //           quantidade: item.quantidade + mesaComanda.quantidade,
  //     //         },
  //     //       );

  //     //       if (result.affected === 0) throw new NotFoundException();

  //     //       return await this.mesaComandaRepository.findOneBy({
  //     //         id: mesaComanda.id,
  //     //       });
  //     //     }

  //     //     // se mesa e produto NÃO existirem na mesma row, uma nova row sera criada.
  //     //     if (!mesaComanda) {
  //     //       const create_mesa_produto = this.mesaComandaRepository.create({
  //     //         quantidade: item.quantidade,
  //     //         produto,
  //     //         mesa,
  //     //         comanda: mesa.comanda,
  //     //       });

  //     //       const novo_mesa_produto =
  //     //         await this.mesaComandaRepository.save(create_mesa_produto);

  //     //       return await this.mesaComandaRepository.findOne({
  //     //         where: {
  //     //           id: novo_mesa_produto.id,
  //     //         },
  //     //         relations: ['produto', 'mesa'],
  //     //       });
  //     //     }

  //     //     return Promise.resolve();
  //     //   }),
  //     // );

  //     return 'Pedido gerado com sucesso';
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  // async editarQuantidade(editarQuantidadeDto: EditarQuantidadeDto) {
  //   try {
  //     const mesa = await this.mesaRepository.findOne({
  //       where: {
  //         id: editarQuantidadeDto.mesa_id,
  //         disponivel: true,
  //       },
  //     });
  //     if (!mesa)
  //       throw new NotFoundException(
  //         'Mesa não encontrada. Verifique se a mesa está aberta.',
  //       );

  //     const produto = await this.produtoRepository.findOneBy({
  //       id: editarQuantidadeDto.produto_id,
  //     });

  //     if (!produto) throw new NotFoundException('Produto não encontrado.');

  //     // const mesaProduto = await this.mesaComandaRepository.findOne({
  //     //   where: {
  //     //     mesa: { id: editarQuantidadeDto.mesa_id },
  //     //     produto: { id: editarQuantidadeDto.produto_id },
  //     //   },
  //     // });

  //     // if (mesaProduto) {
  //     //   const result = await this.mesaComandaRepository.update(
  //     //     { id: mesaProduto.id },
  //     //     {
  //     //       quantidade: editarQuantidadeDto.quantidade,
  //     //     },
  //     //   );

  //     //   if (result.affected === 0) throw new NotFoundException();

  //     // return await this.mesaComandaRepository.findOne({
  //     //   relations: ['produto'],
  //     //   where: {
  //     //     id: mesaProduto.id,
  //     //   },
  //     // });
  //     // }
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  async abrirMesa(id: number) {
    try {
      const mesa = await this.mesaRepository.findOneBy({ id: id });
      if (!mesa) throw new NotFoundException('Mesa não encontrada.');
      if (!mesa.disponivel)
        throw new ForbiddenException('Mesa já se encontra disponível.');

      await this.mesaRepository.update(id, {
        // comanda: uuidv4(),
        disponivel: false,
      });

      return await this.mesaRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async fecharMesa(mesa_id: number) {
    try {
      const mesa = await this.mesaRepository.findOne({
        where: { id: mesa_id },
        relations: ['comanda.produtos.produto'],
      });
      if (!mesa) throw new NotFoundException('Mesa não encontrada.');

      if (!mesa.comanda) {
        const result = await this.mesaRepository.update(
          { id: mesa_id },
          { disponivel: true },
        );
        if (result.affected === 0)
          throw new NotImplementedException('Mudanças não foram aplicadas.');

        return 'Mesa disponível.';
      }

      await this.comandaRepository.fecharComanda(mesa.comanda.id);

      await this.mesaRepository_teste.fecharMesa(mesa.id);

      return 'Venda realizada com sucesso';
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
