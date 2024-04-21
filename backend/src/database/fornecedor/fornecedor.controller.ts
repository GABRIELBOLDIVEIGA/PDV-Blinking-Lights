import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { ApiTags } from '@nestjs/swagger';
import { Fornecedor } from './entities/fornecedor.entity';

@ApiTags('Fornecedor')
@Controller('fornecedor')
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  @Post()
  async create(
    @Body() createFornecedorDto: CreateFornecedorDto,
  ): Promise<Fornecedor> {
    return this.fornecedorService.create(createFornecedorDto);
  }

  @Get()
  async findAll(): Promise<Fornecedor[]> {
    return this.fornecedorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Fornecedor> {
    return this.fornecedorService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFornecedorDto: UpdateFornecedorDto,
  ): Promise<Fornecedor> {
    return this.fornecedorService.update(id, updateFornecedorDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.fornecedorService.remove(id);
  }
}
