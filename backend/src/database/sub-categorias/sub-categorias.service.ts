import { Injectable } from '@nestjs/common';
import { CreateSubCategoriaDto } from './dto/create-sub-categoria.dto';
import { UpdateSubCategoriaDto } from './dto/update-sub-categoria.dto';

@Injectable()
export class SubCategoriasService {
  create(createSubCategoriaDto: CreateSubCategoriaDto) {
    return 'This action adds a new subCategoria';
  }

  findAll() {
    return `This action returns all subCategorias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subCategoria`;
  }

  update(id: number, updateSubCategoriaDto: UpdateSubCategoriaDto) {
    return `This action updates a #${id} subCategoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} subCategoria`;
  }
}
