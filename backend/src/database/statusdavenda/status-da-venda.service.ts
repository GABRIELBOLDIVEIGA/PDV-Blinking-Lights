import { Injectable } from '@nestjs/common';
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

  async create(createStatusdavendaDto: CreateStatusDaVendaDto) {
    return 'This action adds a new statusdavenda';
  }

  async findAll() {
    return `This action returns all statusdavenda`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} statusdavenda`;
  }

  async update(id: number, updateStatusdavendaDto: UpdateStatusDaVendaDto) {
    return `This action updates a #${id} statusdavenda`;
  }

  async remove(id: number) {
    return `This action removes a #${id} statusdavenda`;
  }
}
