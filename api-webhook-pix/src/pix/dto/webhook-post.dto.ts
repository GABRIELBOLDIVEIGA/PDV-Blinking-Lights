import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class WebhookPostDTO {
  @ApiProperty({
    type: 'string',
    example: 'df412c1914194cd4be4cb8b20a5d1c8d',
    description: 'txid do pix.',
  })
  @IsString()
  txid: string;
}
