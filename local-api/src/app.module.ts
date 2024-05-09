import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { PixModule } from './pix/pix.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    // MongooseModule.forRoot(process.env.DATA_BASE_MONGODB),
    AuthModule,
    DataBaseModule,
    PixModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
