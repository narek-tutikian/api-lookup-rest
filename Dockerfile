FROM node:16.16-alpine3.16 as builder
WORKDIR /usr/src/app

COPY src ./src
COPY package.json tsconfig.json tsoa.json yarn.lock ./
RUN yarn install
RUN yarn build

## this is stage two, where the app actually runs

FROM node:16.16-alpine3.16

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY --from=builder /usr/src/app/build ./build

RUN yarn install --frozen-lockfile --production

CMD ["node", "build/src/server.js"]
