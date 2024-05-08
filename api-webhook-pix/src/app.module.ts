import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

// import { MongooseModule } from '@nestjs/mongoose';
import { PixModule } from './pix/pix.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    // MongooseModule.forRoot(process.env.DATA_BASE_MONGODB),

    PixModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
