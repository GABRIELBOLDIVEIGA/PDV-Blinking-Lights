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

@ApiTags('Status da Venda')
@Controller('statusdavenda')
export class StatusdavendaController {
  constructor(private readonly statusdavendaService: StatusdavendaService) {}

  @Post()
  create(@Body() createStatusdavendaDto: CreateStatusDaVendaDto) {
    return this.statusdavendaService.create(createStatusdavendaDto);
  }

  @Get()
  findAll() {
    return this.statusdavendaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusdavendaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatusdavendaDto: UpdateStatusDaVendaDto,
  ) {
    return this.statusdavendaService.update(+id, updateStatusdavendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusdavendaService.remove(+id);
  }
}
