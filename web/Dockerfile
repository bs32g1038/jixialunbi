FROM node:16-alpine3.15
WORKDIR /code
COPY ./package.json /code
ENV PROXY_HOST=server
RUN yarn install
COPY . /code
RUN yarn run build
EXPOSE 4000