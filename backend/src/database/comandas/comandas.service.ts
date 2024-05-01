import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateComandaDto } from './dto/update-comanda.dto';
import { Comanda } from './entities/comanda.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComandaRepository } from './comanda.repository';
import { AdicionaProdutoDto } from './dto/adiciona-produto.dto';
import { Mesa } from '../mesas/entities/mesa.entity';

@Injectable()
export class ComandasService {
  constructor(
    @InjectRepository(Comanda)
    private readonly comandaDirectRepository: Repository<Comanda>,
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

  async findAll() {
    return await this.comandaRepository.getAllComandas();
  }

  async findOne(id: number) {
    return await this.comandaDirectRepository.findOne({
      where: { id },
      relations: ['produtos.produto', 'mesa'],
    });
  }

  update(id: number, updateComandaDto: UpdateComandaDto) {
    return `This action updates a #${id} comanda`;
  }

  remove(id: number) {
    return `This action removes a #${id} comanda`;
  }
}
