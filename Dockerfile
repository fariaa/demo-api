FROM node:20-bullseye

WORKDIR /usr/src/app

COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["./wait-for-it.sh", "db:3306", "--", "npm", "run", "start:prod"]