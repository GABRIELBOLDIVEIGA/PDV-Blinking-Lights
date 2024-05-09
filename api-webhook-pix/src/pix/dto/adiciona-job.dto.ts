import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AdicionaJobDTO {
  @ApiProperty({
    type: 'string',
    example: '41062142ba094b5b82971cafa73fcb4e',
    required: true,
  })
  @IsString()
  txid: string;
}
