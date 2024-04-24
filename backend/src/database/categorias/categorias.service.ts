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
import { CategoriaSubCategoria } from '../common/entities/categoria_sub-categoria.entity';
import { SubCategoria } from '../sub-categorias/entities/sub-categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(SubCategoria)
    private readonly subCategoriaRepository: Repository<SubCategoria>,
    @InjectRepository(CategoriaSubCategoria)
    private readonly categoriaSubCategoriaRepository: Repository<CategoriaSubCategoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    try {
      const transaction = await this.categoriaRepository.manager.transaction(
        async (manager) => {
          const nova_categoria = manager.create(Categoria, {
            nome: createCategoriaDto.nome,
            descricao: createCategoriaDto.descricao,
          });
          const nova_categoria_criada = await manager.save(
            Categoria,
            nova_categoria,
          );

          createCategoriaDto.subCategorias.forEach(async (subCategoria_id) => {
            const subCategoria = await manager.findOneBy(SubCategoria, {
              id: subCategoria_id,
            });

            if (subCategoria) {
              const nova_categoria_subCategoria = manager.create(
                CategoriaSubCategoria,
                {
                  categoria: nova_categoria_criada,
                  subCategoria,
                },
              );
              await manager.save(
                CategoriaSubCategoria,
                nova_categoria_subCategoria,
              );
            }
          });

          return nova_categoria_criada;
        },
      );

      return await this.findOne(transaction.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Categoria[]> {
    try {
      return await this.categoriaRepository.find({
        relations: ['subCategorias.subCategoria'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<Categoria> {
    try {
      const categoria = await this.categoriaRepository.findOne({
        where: { id },
        relations: ['subCategorias.subCategoria'],
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
        {
          nome: updateCategoriaDto.nome,
          descricao: updateCategoriaDto.descricao,
        },
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
