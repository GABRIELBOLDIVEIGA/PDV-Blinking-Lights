FROM node:20-alpine

WORKDIR /home/node/app

COPY package*.json ./ 

# COPY ./init-db/init.sql ./docker-entrypoint-initdb.d/
COPY ./init-db/init.sql ./docker-entrypoint-initdb.d/init.sql

RUN npm install

# para evitar o erro bcrypt_lib.node: invalid ELF header
# essa lib precisa ser instalada no OS onde o projeto for rodar
RUN npm uninstall bcrypt

RUN npm i bcrypt

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]