import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotImplementedException,
} from '@nestjs/common';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { Comanda } from './entities/comanda.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { ComandaRepository } from './comanda.repository';
import { AdicionaProdutoDto } from './dto/adiciona-produto.dto';
import { Mesa } from '../mesas/entities/mesa.entity';
import { ComandaProduto } from './entities/comanda_produto.entity';

@Injectable()
export class ComandasService {
  constructor(
    @InjectRepository(Comanda)
    private readonly comandaDirectRepository: Repository<Comanda>,
    @InjectRepository(ComandaProduto)
    private readonly comandaProdutoDirectRepository: Repository<ComandaProduto>,
    @InjectRepository(Mesa)
    private readonly MesaDirectRepository: Repository<Mesa>,

    private comandaRepository: ComandaRepository,
  ) {}

  async adicionarProduto(
    adicionaProdutoDto: AdicionaProdutoDto,
  ): Promise<string> {
    const mesa = await this.MesaDirectRepository.findOne({
      where: {
        id: adicionaProdutoDto.mesa_id,
        comanda: { id: adicionaProdutoDto.comanda_id },
      },
    });
    if (!mesa) throw new BadRequestException(`Mesa e Comanda incompatíveis.`);

    return await this.comandaRepository.adicionarProdutos(adicionaProdutoDto);
  }

  async removerProduto(id: number) {
    const isNotDeleted = await this.comandaProdutoDirectRepository.findOneBy({
      id,
    });
    if (!isNotDeleted)
      throw new BadRequestException('Produto já foi removido.');

    const result = await this.comandaProdutoDirectRepository.softDelete({
      id,
    });
    if (!result.affected)
      throw new BadRequestException('Não foi possivel remover o produto.');

    return 'Produto removido com sucesso.';
  }

  async restaurarProduto(id: number) {
    const isDeleted = await this.comandaProdutoDirectRepository.findOne({
      where: { id, deleted_at: Not(IsNull()) },
      withDeleted: true,
    });

    if (!isDeleted)
      throw new BadRequestException(
        'Produto deve ter sido removido antes de ser restaurado.',
      );

    const result = await this.comandaProdutoDirectRepository.restore({ id });
    if (!result.affected)
      throw new BadRequestException('Não foi possivel restaurar o produto.');

    return 'Produto restaurado com sucesso.';
  }

  async findAll() {
    return await this.comandaRepository.getAllComandas();
  }

  async findOne(id: number) {
    return await this.comandaDirectRepository.findOne({
      where: { id },
      relations: ['produtos.produto', 'mesa'],
    });
  }

  async findOneByCode(code: string) {
    return await this.comandaDirectRepository.findOne({
      where: { codigo: code },
      relations: ['produtos.produto', 'mesa'],
    });
  }

  async update(id: number, updateComandaDto: UpdateComandaDto) {
    const response = await this.comandaDirectRepository.update(id, {
      ...updateComandaDto,
    });

    if (response.affected === 0)
      throw new BadRequestException('Atualização não concluida.');

    return await this.comandaDirectRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} comanda`;
  }
}
