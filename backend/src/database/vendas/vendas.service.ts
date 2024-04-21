import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venda } from './entities/venda.entity';
import { Repository } from 'typeorm';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { FormaDePagamento } from '../forma-de-pagamento/entities/forma-de-pagamento.entity';
import { StatusDaVenda } from '../status-da-venda/entities/status-da-venda.entity';

@Injectable()
export class VendasService {
  constructor(
    @InjectRepository(Venda)
    private readonly vendaRepository: Repository<Venda>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(FormaDePagamento)
    private readonly formaDePagamentoRepository: Repository<FormaDePagamento>,
    @InjectRepository(StatusDaVenda)
    private readonly statusDaVendaRepository: Repository<StatusDaVenda>,
  ) {}
  async create(createVendaDto: CreateVendaDto) {
    try {
      const usuario = await this.usuarioRepository.findOneBy({
        id: createVendaDto.usuario_id,
      });
      if (!usuario) throw new NotFoundException('Usuário não encontrado.');

      let cliente: Cliente | null = null;
      if (createVendaDto.cliente_id) {
        cliente = await this.clienteRepository.findOneBy({
          id: createVendaDto.cliente_id,
        });
      }

      let formaDePagamento: FormaDePagamento | null = null;
      if (createVendaDto.forma_de_pagamento_id) {
        formaDePagamento = await this.formaDePagamentoRepository.findOneBy({
          id: createVendaDto.forma_de_pagamento_id,
        });
      }

      let status: StatusDaVenda | null = null;
      if (createVendaDto.status_da_venda_id) {
        status = await this.statusDaVendaRepository.findOneBy({
          id: createVendaDto.status_da_venda_id,
        });
      }

      const nova_venda = this.vendaRepository.create({
        ...createVendaDto,
        usuario,
        cliente,
        status,
        formaDePagamento,
      });

      return await this.vendaRepository.save(nova_venda);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const vendas = await this.vendaRepository.find({
        relations: ['formaDePagamento', 'status', 'cliente', 'usuario'],
      });

      return vendas;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} venda`;
  }

  async update(id: number, updateVendaDto: UpdateVendaDto) {
    return `This action updates a #${id} venda`;
  }

  async remove(id: number) {
    return `This action removes a #${id} venda`;
  }
}
