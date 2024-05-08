import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { CreateClienteParams } from './types/CreateClienteParams';
import { UpdateClienteParams } from './types/UpdateClienteParams';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteParams: CreateClienteParams): Promise<Cliente> {
    try {
      const novoCliente = this.clienteRepository.create(createClienteParams);

      return this.clienteRepository.save(novoCliente);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Cliente[]> {
    try {
      const clientes = await this.clienteRepository.find({
        relations: ['enderecos.endereco'],
      });

      return clientes;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getById(id: number): Promise<Cliente> {
    try {
      const cliente = await this.clienteRepository.findOne({
        where: { id },
        relations: ['endereco'],
      });
      if (!cliente) throw new NotFoundException();

      return cliente;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateClienteParams: UpdateClienteParams,
  ): Promise<Cliente> {
    try {
      const result = await this.clienteRepository.update(
        { id },
        { ...updateClienteParams },
      );

      if (result.affected === 0) throw new NotFoundException();

      return await this.getById(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async softDeleteById(id: number): Promise<string> {
    try {
      const result = await this.clienteRepository.softDelete({ id });

      if (result.affected === 0) throw new NotFoundException();

      return 'Cliente deletado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
