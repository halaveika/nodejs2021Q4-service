FROM node:alpine

RUN apk --no-cache add ca-certificates

EXPOSE 4000

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .
CMD [ "npm","run","dev"]