import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { UsuariosModule } from './database/usuarios/usuarios.module';
import { EnderecosModule } from './database/enderecos/enderecos.module';
import { ClientesModule } from './database/clientes/clientes.module';
import { StatusDavendaModule } from './database/status-da-venda/status-da-venda.module';
import { FormaDePagamentoModule } from './database/forma-de-pagamento/forma-de-pagamento.module';
import { CategoriasModule } from './database/categorias/categorias.module';
import { VendasModule } from './database/vendas/vendas.module';

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

  // Usuários
  const optUser = new DocumentBuilder()
    .setTitle('Usuário')
    .setDescription('Usuário Model')
    .setVersion('1.0')
    .addTag('Usuário')
    .build();

  const docUser = SwaggerModule.createDocument(app, optUser, {
    include: [UsuariosModule],
  });

  SwaggerModule.setup('api/usuario', app, docUser);

  // Endereços
  const optEndereco = new DocumentBuilder()
    .setTitle('Endereço')
    .setDescription('Endereço Model')
    .setVersion('1.0')
    .addTag('Endereço')
    .build();

  const docEndereco = SwaggerModule.createDocument(app, optEndereco, {
    include: [EnderecosModule],
  });

  SwaggerModule.setup('api/endereco', app, docEndereco);

  // Clientes
  const optClientes = new DocumentBuilder()
    .setTitle('Clientes')
    .setDescription('Clientes Model')
    .setVersion('1.0')
    .addTag('Clientes')
    .build();

  const docClientes = SwaggerModule.createDocument(app, optClientes, {
    include: [ClientesModule],
  });

  SwaggerModule.setup('api/clientes', app, docClientes);

  // Status da Venda
  const optStatusDaVenda = new DocumentBuilder()
    .setTitle('Status Da Venda')
    .setDescription('Status Da Venda Model')
    .setVersion('1.0')
    .addTag('Status Da Venda')
    .build();

  const docStatusDaVenda = SwaggerModule.createDocument(app, optStatusDaVenda, {
    include: [StatusDavendaModule],
  });

  SwaggerModule.setup('api/statusDaVenda', app, docStatusDaVenda);

  // Forma de pagamento
  const optFormaDePagamento = new DocumentBuilder()
    .setTitle('Forma De Pagamento')
    .setDescription('Forma De Pagamento Model')
    .setVersion('1.0')
    .addTag('Forma De Pagamento')
    .build();

  const docFormaDePagamento = SwaggerModule.createDocument(
    app,
    optFormaDePagamento,
    {
      include: [FormaDePagamentoModule],
    },
  );

  SwaggerModule.setup('api/formaDePagamento', app, docFormaDePagamento);

  // Categorias
  const optCategorias = new DocumentBuilder()
    .setTitle('Categorias')
    .setDescription('Categorias Model')
    .setVersion('1.0')
    .addTag('Categorias')
    .build();

  const docCategorias = SwaggerModule.createDocument(app, optCategorias, {
    include: [CategoriasModule],
  });

  SwaggerModule.setup('api/categorias', app, docCategorias);

  // Vendas
  const optVendas = new DocumentBuilder()
    .setTitle('Vendas')
    .setDescription('Vendas Model')
    .setVersion('1.0')
    .addTag('Vendas')
    .build();

  const docVendas = SwaggerModule.createDocument(app, optVendas, {
    include: [VendasModule],
  });

  SwaggerModule.setup('api/vendas', app, docVendas);

  // Start app
  await app.listen(process.env.PORT || 3030);

  // console.clear();

  console.log(`Base Url: http://localhost:${process.env.PORT} 🌐`);
  console.log(`Swagger: http://localhost:${process.env.PORT}/api/ 📜`);
}
bootstrap();
