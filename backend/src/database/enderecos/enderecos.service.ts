import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Endereco } from './entities/endereco.entity';
import { Repository } from 'typeorm';
import { CreateEnderecoParams } from './types/CreateEnderecoParams';
import { UpdateEnderecoParams } from './types/UpdateEnderecoParams';

import { Cliente } from 'src/database/clientes/entities/cliente.entity';
import { ClienteEndereco } from '../common/entities/cliente_endereco.entity';

@Injectable()
export class EnderecosService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
    @InjectRepository(ClienteEndereco)
    private clienteEnderecoRepository: Repository<ClienteEndereco>,
  ) {}

  async create(createEnderecoParams: CreateEnderecoParams): Promise<Endereco> {
    try {
      const novoEndereco = this.enderecoRepository.create(createEnderecoParams);

      return await this.enderecoRepository.save(novoEndereco);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createEnderecoCliente(
    cliente_id: number,
    createEnderecoParams: CreateEnderecoParams,
  ) {
    try {
      const cliente = await this.clienteRepository.findOne({
        where: { id: cliente_id },
      });

      if (!cliente) throw new BadRequestException('Cliente não encontrado.');

      const enderece_cadastrado = await this.create(createEnderecoParams);
      const novoEndereco = this.clienteEnderecoRepository.create({
        endereco: enderece_cadastrado,
        cliente,
      });

      return await this.clienteEnderecoRepository.save(novoEndereco);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getEnderecosByClienteId(id: number): Promise<ClienteEndereco[]> {
    try {
      const enderecos = await this.clienteEnderecoRepository.find({
        where: { cliente: { id: id } },
        relations: ['endereco'],
      });

      return enderecos;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Endereco[]> {
    try {
      return await this.enderecoRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getById(id: number): Promise<Endereco> {
    try {
      const endereco = await this.enderecoRepository.findOne({
        where: { id },
      });
      if (!endereco) throw new NotFoundException();

      return endereco;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateEnderecoParams: UpdateEnderecoParams,
  ): Promise<Endereco> {
    try {
      const result = await this.enderecoRepository.update(
        { id },
        { ...updateEnderecoParams },
      );

      if (result.affected === 0) throw new NotFoundException();

      return await this.getById(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async softDeleteById(id: number): Promise<string> {
    try {
      const result = await this.enderecoRepository.softDelete({ id });

      if (result.affected === 0) throw new NotFoundException();

      return 'Endereço deletado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
