# Frontend Compiler
FROM node:lts-alpine as builder

RUN npm install -g @quasar/cli

COPY package.json /leantec-web-vue/package.json

WORKDIR /leantec-web-vue

RUN npm install

COPY . /leantec-web-vue/

RUN quasar build

# Copy files in spa to nginx and build image
FROM nginx:latest
MAINTAINER George

WORKDIR /leantec-web-vue

COPY --from=builder /leantec-web-vue/dist/spa .

COPY ./docker/default.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80