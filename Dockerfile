FROM node:alpine

RUN apk add --no-cache bash

EXPOSE 4000

WORKDIR /app

COPY package.json package-lock.json  /app/

RUN npm install

COPY . .
CMD [ "npm","start" ]