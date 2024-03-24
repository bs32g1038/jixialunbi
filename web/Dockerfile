FROM node:18-alpine3.18
WORKDIR /code
COPY ./package.json /code
RUN npm install
COPY . /code
RUN npm run build
FROM node:18-alpine3.18
WORKDIR /code
COPY --from=0 /code /code
EXPOSE 4000