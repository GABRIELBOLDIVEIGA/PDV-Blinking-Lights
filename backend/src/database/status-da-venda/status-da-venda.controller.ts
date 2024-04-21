import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatusdavendaService } from './status-da-venda.service';
import { CreateStatusDaVendaDto } from './dto/create-statusdavenda.dto';
import { UpdateStatusDaVendaDto } from './dto/update-statusdavenda.dto';
import { ApiTags } from '@nestjs/swagger';
import { StatusDaVenda } from './entities/status-da-venda.entity';

@ApiTags('Status da Venda')
@Controller('statusdavenda')
export class StatusdavendaController {
  constructor(private readonly statusdavendaService: StatusdavendaService) {}

  @Post()
  async create(
    @Body() createStatusdavendaDto: CreateStatusDaVendaDto,
  ): Promise<StatusDaVenda> {
    return this.statusdavendaService.create(createStatusdavendaDto);
  }

  @Get()
  async findAll(): Promise<StatusDaVenda[]> {
    return this.statusdavendaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StatusDaVenda> {
    return this.statusdavendaService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStatusdavendaDto: UpdateStatusDaVendaDto,
  ): Promise<StatusDaVenda> {
    return this.statusdavendaService.update(+id, updateStatusdavendaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    return this.statusdavendaService.remove(+id);
  }
}
