FROM node:erbium-alpine3.15

RUN apk add --no-cache bash

EXPOSE 4000

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD [ "npm","run","dev"]