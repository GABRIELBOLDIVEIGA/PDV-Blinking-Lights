import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

export default {
  GN_CLIENT_ID: configService.getOrThrow('GN_CLIENT_ID'),
  GN_CLIENT_SECRET: configService.getOrThrow('GN_CLIENT_SECRET'),
  GN_ENDPOINT: configService.getOrThrow('GN_ENDPOINT'),
  GN_CERT: configService.getOrThrow('GN_CERT'),
};
