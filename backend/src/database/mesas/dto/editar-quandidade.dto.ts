import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class EditarQuantidadeDto {
  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  @Min(0)
  produto_id: number;

  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  mesa_id: number;

  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  quantidade: number;
}
