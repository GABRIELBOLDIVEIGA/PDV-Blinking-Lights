FROM node:20-alpine

WORKDIR /home/node/app

COPY package*.json ./ 

# RUN npm install bcrypt

RUN npm install

# COPY tsconfig.json ./ 

# COPY typeOrm.config.ts ./ 

COPY . .

EXPOSE 3000

# RUN npm run build

# USER node

CMD ["npm", "run", "start"]