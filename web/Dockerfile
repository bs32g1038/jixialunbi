FROM node:16-alpine3.16
WORKDIR /code
COPY ./package.json /code
RUN npm install
COPY . /code
RUN npm run build
FROM node:16-alpine3.16
WORKDIR /code
COPY --from=0 /code /code
EXPOSE 4000