import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MesaGateway } from './gateway/mesas.gateway';
import { MesasModule } from './database/mesas/mesas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATA_BASE_MONGODB),
    AuthModule,
    DataBaseModule,
    MesasModule,
  ],
  controllers: [AppController],
  providers: [AppService, MesaGateway],
})
export class AppModule {}
