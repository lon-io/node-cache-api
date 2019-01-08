FROM node:8-slim

WORKDIR /nodecacheapi
ENV NODE_ENV development

COPY package.json /nodecacheapi/package.json

RUN npm install

COPY .env.dev /nodecacheapi/.env.dev
COPY . /nodecacheapi

CMD ["npm","start"]

EXPOSE 8080
