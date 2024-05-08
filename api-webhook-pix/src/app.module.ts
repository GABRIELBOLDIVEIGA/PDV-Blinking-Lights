import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PixModule } from './pix/pix.module';
import envConfiguration from '../env/env-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./env/.env.development', './env/.env.production'],
      load: [envConfiguration],
    }),
    PixModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
