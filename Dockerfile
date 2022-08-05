FROM node:lts-alpine as builder
MAINTAINER George

RUN npm install -g @quasar/cli

COPY package.json /leantec-web-vue/package.json

WORKDIR /leantec-web-vue

RUN npm install

COPY . /leantec-web-vue/

RUN quasar build

FROM nginx:latest

WORKDIR /leantec-web-vue

COPY --from=builder /leantec-web-vue/dist/spa .

COPY ./docker/default.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80