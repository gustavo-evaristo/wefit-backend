FROM node:20.11.0-slim

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["node", "dist", ""]