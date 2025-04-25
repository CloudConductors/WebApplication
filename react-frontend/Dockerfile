FROM node:lts-alpine3.21

WORKDIR /react

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]