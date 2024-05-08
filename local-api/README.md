## Installation

```bash
$ npm install
```

## Running the docker

```bash
$ docker build .
$ docker-compose up -d
$ docker-compose up --build
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

## EC2

```bash
$ ssh -i ./certs/chave-aws-ec2.pem ubuntu@18.230.231.147

```