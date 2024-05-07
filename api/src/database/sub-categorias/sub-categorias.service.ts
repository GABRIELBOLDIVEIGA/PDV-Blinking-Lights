import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubCategoriaDto } from './dto/create-sub-categoria.dto';
import { UpdateSubCategoriaDto } from './dto/update-sub-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategoria } from './entities/sub-categoria.entity';

@Injectable()
export class SubCategoriasService {
  constructor(
    @InjectRepository(SubCategoria)
    private readonly subCategoriaRepository: Repository<SubCategoria>,
  ) {}

  async create(
    createSubCategoriaDto: CreateSubCategoriaDto,
  ): Promise<SubCategoria> {
    try {
      const nova_categoria = this.subCategoriaRepository.create(
        createSubCategoriaDto,
      );

      return this.subCategoriaRepository.save(nova_categoria);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<SubCategoria[]> {
    try {
      return await this.subCategoriaRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<SubCategoria> {
    try {
      const categoria = await this.subCategoriaRepository.findOne({
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
    updateSubCategoriaDto: UpdateSubCategoriaDto,
  ): Promise<SubCategoria> {
    try {
      const result = await this.subCategoriaRepository.update(
        { id },
        { ...updateSubCategoriaDto },
      );

      if (result.affected === 0) throw new NotFoundException();

      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const result = await this.subCategoriaRepository.delete({ id });

      if (result.affected === 0) throw new NotFoundException();

      return 'Sub-categoria deletado com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
