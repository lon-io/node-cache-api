FROM node:8-slim

WORKDIR /nodecacheapi
ENV NODE_ENV development

COPY package.json /nodecacheapi/package.json

RUN npm install

COPY .env.example /nodecacheapi/.env.example
COPY . /nodecacheapi

CMD ["npm","start"]

EXPOSE 8080
