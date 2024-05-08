import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

const dataSource = new DataSource({
  type: 'mysql',
  host: configService.getOrThrow('MYSQL_HOST'),
  port: configService.getOrThrow('MYSQL_PORT'),
  database: configService.getOrThrow('MYSQL_DATA_BASE'),
  username: configService.getOrThrow('MYSQL_USER_NAME'),
  password: configService.getOrThrow('MYSQL_PASSWORD'),
  synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['migrations/**'],
});

console.log(dataSource);

dataSource
  .initialize()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

export default dataSource;
