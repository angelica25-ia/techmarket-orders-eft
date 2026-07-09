FROM node:20-slim AS build

WORKDIR /app

COPY app/package*.json ./

RUN npm ci --omit=dev

COPY app/ ./

FROM node:20-slim

WORKDIR /app

ARG BUILD_COLOR="Blue"

ENV NODE_ENV=production
ENV APP_COLOR=$BUILD_COLOR

COPY --from=build /app .

EXPOSE 3000

CMD ["npm", "start"]
