FROM node:23-alpine3

WORKDIR /react

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]