import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'exposeAll',
    }),
  );

  // session
  app.use(
    session({
      name: 'KMB_SESSION_ID',
      secret: 'KmbSecretPassport',
      saveUninitialized: true,
      resave: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 1000, // 1 semana
        secure: true,
      },
    }),
  );
  // app.use(passport.initialize());
  // app.use(passport.session());

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Origin', 'Authorization'],
    origin: [
      '*',
      'http://localhost:5173',
      'https://<link do projeto>.vercel.app',
    ],
    credentials: true,
  });

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('API Rest - PDV')
    .setDescription(
      'Backend desenvolvido em NestJS com Mongoose, TypeScript e MongoDB',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'Header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Origin', 'Authorization'],
    origin: ['*', 'http://localhost:5173'],
    credentials: true,
  });

  // Start app
  await app.listen(process.env.PORT || 3000);

  // console.clear();

  console.log(`Base Url: http://localhost:${process.env.PORT} 🌐`);
  console.log(`Swagger: http://localhost:${process.env.PORT}/api/ 📜`);
}
bootstrap();
