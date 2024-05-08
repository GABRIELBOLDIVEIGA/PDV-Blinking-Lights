import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDateString, IsOptional, IsString } from 'class-validator';

export class CobrancasQueryDTO {
  @ApiPropertyOptional({
    example: '2024-01-01T00:00:01Z',
    description: '2024-01-01T00:00:01Z',
    required: true,
  })
  @IsString()
  @IsDateString()
  readonly inicio: Date;

  @ApiPropertyOptional({
    example: '2024-12-31T23:59:59Z',
    description: '2024-12-31T23:59:59Z',
    required: true,
  })
  @IsString()
  @IsDateString()
  readonly fim: Date;

  @ApiPropertyOptional({
    description: '2',
  })
  @IsOptional()
  readonly 'paginacao.paginaAtual'?: number;

  @ApiPropertyOptional({
    description: '100',
  })
  @IsOptional()
  readonly 'paginacao.itensPorPagina'?: number;

  @ApiPropertyOptional({
    name: 'status',
    type: 'enum',
  })
  @IsOptional()
  readonly status?: string;
}
