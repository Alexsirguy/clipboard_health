FROM node:16.13.2-buster
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --quiet
COPY . .

