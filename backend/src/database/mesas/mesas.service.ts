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
import { MesaRepository } from './mesa.repository';

@Injectable()
export class MesasService {
  constructor(
    @InjectRepository(Mesa)
    private readonly mesaDirectRepository: Repository<Mesa>,

    private mesaRepository: MesaRepository,
  ) {}

  async create(createMesaDto: CreateMesaDto): Promise<Mesa> {
    try {
      const existe = await this.mesaDirectRepository.findOne({
        where: { nome: createMesaDto.nome },
      });
      if (existe)
        throw new BadRequestException(
          `Mesa de nome ${existe.nome} já cadastrada no sistema.`,
        );

      const novaMesa = this.mesaDirectRepository.create(createMesaDto);

      return this.mesaDirectRepository.save(novaMesa);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Mesa[]> {
    try {
      return await this.mesaDirectRepository.find({
        withDeleted: true,
        relations: ['comanda.produtos.produto'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Mesa> {
    try {
      const mesa = await this.mesaDirectRepository.findOne({
        where: { id },
        relations: ['comanda.produtos.produto'],
      });
      if (!mesa) throw new NotFoundException();

      return mesa;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async abrirMesa(id: number) {
    return await this.mesaRepository.abrirMesa(id);
  }

  async fecharMesa(mesa_id: number) {
    return await this.mesaRepository.fecharMesa(mesa_id);
  }

  async update(id: number, updateMesaDto: UpdateMesaDto): Promise<Mesa> {
    try {
      const result = await this.mesaDirectRepository.update(
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
      const result = await this.mesaDirectRepository.softDelete({ id });

      if (result.affected === 0) throw new NotFoundException();

      return 'Mesa deletada com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
