import { PartialType } from '@nestjs/swagger';
import { CreateStatusDaVendaDto } from './create-statusdavenda.dto';

export class UpdateStatusDaVendaDto extends PartialType(
  CreateStatusDaVendaDto,
) {}
