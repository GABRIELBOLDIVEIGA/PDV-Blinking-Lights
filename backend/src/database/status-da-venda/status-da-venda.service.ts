import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStatusDaVendaDto } from './dto/create-statusdavenda.dto';
import { UpdateStatusDaVendaDto } from './dto/update-statusdavenda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusDaVenda } from './entities/status-da-venda.entity';

@Injectable()
export class StatusdavendaService {
  constructor(
    @InjectRepository(StatusDaVenda)
    private readonly statusDaVendaRepository: Repository<StatusDaVenda>,
  ) {}

  async create(
    createStatusdavendaDto: CreateStatusDaVendaDto,
  ): Promise<StatusDaVenda> {
    try {
      const novoStatusDaVenda = this.statusDaVendaRepository.create(
        createStatusdavendaDto,
      );

      return this.statusDaVendaRepository.save(novoStatusDaVenda);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<StatusDaVenda[]> {
    try {
      return await this.statusDaVendaRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<StatusDaVenda> {
    try {
      const categoria = await this.statusDaVendaRepository.findOne({
        where: { id },
      });
      if (!categoria) throw new NotFoundException();

      return categoria;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateStatusdavendaDto: UpdateStatusDaVendaDto,
  ): Promise<StatusDaVenda> {
    try {
      const result = await this.statusDaVendaRepository.update(
        { id },
        { ...updateStatusdavendaDto },
      );

      if (result.affected === 0) throw new NotFoundException();

      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const result = await this.statusDaVendaRepository.delete({ id });

      if (result.affected === 0) throw new NotFoundException();

      return 'Status da Venda deletado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
