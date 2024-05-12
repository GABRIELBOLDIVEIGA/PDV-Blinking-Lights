## Installation 
```bash
$ npm install
```

## .ENV
* Na raiz do projeto crie uma arquivo .env com as seguntes variaveis

```bash
NODE_ENV=''
PORT=''
JWT_SECRET=''
DATA_BASE_MONGODB=''

# Válvulas do Banco MYSQL
MYSQL_HOST=''
MYSQL_PORT=''
MYSQL_USER_NAME=''
MYSQL_PASSWORD=''

# Caso queira trocar o nome do banco lembrese de criar um banco de mesmo nome antes de rodar a aplicação, ou mude o nome do banco no arquivo init.sql
MYSQL_DATA_BASE=nestjs_pdv 

# Utilizar true pode ocasionar perda de dados no banco.
MYSQL_SYNCHRONIZE=boolean


# Credenciais para consumir API PIX da https://sejaefi.com.br/
GN_CLIENT_ID=''
GN_CLIENT_SECRET=''
GN_ENDPOINT=''
GN_CERT=''
GN_CERT_WEBHOOK=''

# URL do Webhook que será consumido pelo Frontend para receber notificação de recebimento de pagamento via PIX.
API_AWS_WEBHOOK=''
```

## Running the docker
* Caso seu OS seja windows delete a pasta node_modules antes de rodar os comandos do Docker.
* Algumas libs precisão ser instaladas no OS onde o projeto ira rodar.
```bash
# gerar a build 
$ docker build .

# rodar o container
$ docker-compose up

# gerar build, rodar o container, liberar o terminal
$ docker-compose up --build -d 
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



