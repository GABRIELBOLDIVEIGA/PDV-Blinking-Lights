import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { UsuariosModule } from './usuarios/usuarios.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
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

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('API Rest - KMB')
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

  // Usuarios
  const optUser = new DocumentBuilder()
    .setTitle('Usuario')
    .setDescription('User Model')
    .setVersion('1.0')
    .addTag('User')
    .build();

  const docUser = SwaggerModule.createDocument(app, optUser, {
    include: [UsuariosModule],
  });

  SwaggerModule.setup('api/user', app, docUser);

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Origin', 'Authorization'],
    origin: [
      '*',
      'http://localhost:5173',
      'https://<link do projeto>.vercel.app',
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3030);

  console.clear();

  console.log(`Base Url: http://localhost:${process.env.PORT}`);
  console.log(`Swagger: http://localhost:${process.env.PORT}/api/`);
}
bootstrap();
