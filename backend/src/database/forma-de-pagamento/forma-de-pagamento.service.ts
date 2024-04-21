import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFormaDePagamentoDto } from './dto/create-forma-de-pagamento.dto';
import { UpdateFormaDePagamentoDto } from './dto/update-forma-de-pagamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FormaDePagamento } from './entities/forma-de-pagamento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormaDePagamentoService {
  constructor(
    @InjectRepository(FormaDePagamento)
    private readonly formaDePagamentoRepository: Repository<FormaDePagamento>,
  ) {}

  async create(
    createFormaDePagamentoDto: CreateFormaDePagamentoDto,
  ): Promise<FormaDePagamento> {
    try {
      const novaFormaDePagamento = this.formaDePagamentoRepository.create(
        createFormaDePagamentoDto,
      );

      return this.formaDePagamentoRepository.save(novaFormaDePagamento);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<FormaDePagamento[]> {
    try {
      return await this.formaDePagamentoRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<FormaDePagamento> {
    try {
      const formaDePagamento = await this.formaDePagamentoRepository.findOne({
        where: { id },
      });
      if (!formaDePagamento) throw new NotFoundException();

      return formaDePagamento;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateFormaDePagamentoDto: UpdateFormaDePagamentoDto,
  ): Promise<FormaDePagamento> {
    try {
      const result = await this.formaDePagamentoRepository.update(
        { id },
        { ...updateFormaDePagamentoDto },
      );

      if (result.affected === 0) throw new NotFoundException();

      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const result = await this.formaDePagamentoRepository.delete({ id });

      if (result.affected === 0) throw new NotFoundException();

      return 'Forma de pagamento deletado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
