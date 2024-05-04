import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class OriginalDTO {
  @ApiProperty({
    type: 'string',
    example: '1.00',
  })
  // @Matches(`^\d+\.\d{2}$`)
  original: string;
}
