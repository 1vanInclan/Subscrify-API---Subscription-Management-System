FROM node:24-alpine

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]