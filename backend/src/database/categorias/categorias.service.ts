import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    try {
      const novaCategoria = this.categoriaRepository.create(createCategoriaDto);

      return this.categoriaRepository.save(novaCategoria);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Categoria[]> {
    try {
      return await this.categoriaRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Categoria> {
    try {
      const categoria = await this.categoriaRepository.findOne({
        where: { id },
      });
      if (!categoria) throw new NotFoundException();

      return categoria;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    try {
      const result = await this.categoriaRepository.update(
        { id },
        { ...updateCategoriaDto },
      );

      if (result.affected === 0) throw new NotFoundException();

      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.categoriaRepository.delete({ id });

      if (result.affected === 0) throw new NotFoundException();

      return 'Categoria deletado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
