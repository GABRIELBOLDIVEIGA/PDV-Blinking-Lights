import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { Mesa } from './entities/mesa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MesasService {
  constructor(
    @InjectRepository(Mesa)
    private readonly mesaRepository: Repository<Mesa>,
  ) {}

  async create(createMesaDto: CreateMesaDto): Promise<Mesa> {
    try {
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
      const categoria = await this.mesaRepository.findOne({
        where: { id },
      });
      if (!categoria) throw new NotFoundException();

      return categoria;
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
