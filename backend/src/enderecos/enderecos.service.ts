import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Endereco } from './entities/endereco.entity';
import { Repository } from 'typeorm';
import { CreateEnderecoParams } from './types/CreateEnderecoParams';

@Injectable()
export class EnderecosService {
  constructor(
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
  ) {}

  async create(createEnderecoParams: CreateEnderecoParams): Promise<Endereco> {
    try {
      const novoEndereco = this.enderecoRepository.create(createEnderecoParams);

      return this.enderecoRepository.save(novoEndereco);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.enderecoRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} endereco`;
  }

  async update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    return `This action updates a #${id} endereco`;
  }

  async remove(id: number) {
    return `This action removes a #${id} endereco`;
  }
}
