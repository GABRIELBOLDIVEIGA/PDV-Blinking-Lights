import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { Fornecedor } from './entities/fornecedor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(Fornecedor)
    private readonly fornecedorRepository: Repository<Fornecedor>,
  ) {}

  async create(createFornecedorDto: CreateFornecedorDto): Promise<Fornecedor> {
    try {
      const novoEstoque = this.fornecedorRepository.create(createFornecedorDto);

      return await this.fornecedorRepository.save(novoEstoque);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.fornecedorRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const estoque = await this.fornecedorRepository.findOne({
        where: { id },
      });
      if (!estoque) throw new NotFoundException();

      return estoque;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateFornecedorDto: UpdateFornecedorDto) {
    try {
      const result = await this.fornecedorRepository.update(
        { id },
        { ...updateFornecedorDto },
      );

      if (result.affected === 0) throw new NotFoundException();

      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.fornecedorRepository.softDelete({ id });

      if (result.affected === 0) throw new NotFoundException();

      return 'Fornecedor deletado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
