import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { DataBaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DataBaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
